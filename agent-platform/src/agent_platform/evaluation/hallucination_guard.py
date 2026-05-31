"""Check whether factual claims are grounded before publication."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

FACTUAL_CLAIM_TYPES = {
    "repository_state",
    "external_fact",
    "code_behavior",
    "calculation",
    "research_summary",
    "recommendation",
}

EVIDENCE_TYPES = {
    "user_instruction",
    "repository_file",
    "command_output",
    "test_result",
    "official_docs",
    "paper",
    "web_source",
    "dataset",
    "tool_result",
    "inference",
}

SUPPORTED_LEVELS = {"supported", "partially_supported", "unsupported", "uncertain", "not_checked"}
RISK_LEVELS = {"low", "medium", "high"}


@dataclass(frozen=True)
class EvidenceItem:
    """Evidence used to support a claim."""

    evidence_id: str
    source: str
    source_type: str
    checked_on: str = ""
    reliability: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "EvidenceItem":
        return cls(
            evidence_id=_required_string(data, "evidence_id"),
            source=_required_string(data, "source"),
            source_type=_required_string(data, "source_type"),
            checked_on=_optional_string(data.get("checked_on", ""), "checked_on"),
            reliability=_optional_string(data.get("reliability", ""), "reliability"),
        )


@dataclass(frozen=True)
class ClaimCheck:
    """One claim extracted from an answer or artifact."""

    statement: str
    claim_type: str
    support_level: str
    evidence_ids: tuple[str, ...] = ()
    verification_steps: tuple[str, ...] = ()
    presented_as_fact: bool = True
    freshness_sensitive: bool = False

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ClaimCheck":
        return cls(
            statement=_required_string(data, "statement"),
            claim_type=_required_string(data, "claim_type"),
            support_level=_required_string(data, "support_level"),
            evidence_ids=_tuple_of_strings(data.get("evidence_ids", []), "evidence_ids"),
            verification_steps=_tuple_of_strings(data.get("verification_steps", []), "verification_steps"),
            presented_as_fact=_optional_bool(data.get("presented_as_fact", True), "presented_as_fact"),
            freshness_sensitive=_optional_bool(data.get("freshness_sensitive", False), "freshness_sensitive"),
        )


@dataclass(frozen=True)
class HallucinationGuardInput:
    """Input for grounding an answer or artifact before it is treated as final."""

    task: str
    output_summary: str
    risk_level: str = "medium"
    evidence: tuple[EvidenceItem, ...] = ()
    claims: tuple[ClaimCheck, ...] = ()
    uncertainty_notes: tuple[str, ...] = ()
    limitation_notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "HallucinationGuardInput":
        return cls(
            task=_required_string(data, "task"),
            output_summary=_required_string(data, "output_summary"),
            risk_level=_optional_string(data.get("risk_level", "medium"), "risk_level"),
            evidence=tuple(EvidenceItem.from_dict(item) for item in _list_of_maps(data.get("evidence", []), "evidence")),
            claims=tuple(ClaimCheck.from_dict(item) for item in _list_of_maps(data.get("claims", []), "claims")),
            uncertainty_notes=_tuple_of_strings(data.get("uncertainty_notes", []), "uncertainty_notes"),
            limitation_notes=_tuple_of_strings(data.get("limitation_notes", []), "limitation_notes"),
        )


def check_hallucination_risk(guard_input: HallucinationGuardInput) -> JsonMap:
    """Return a deterministic grounding report for factual claims."""

    gaps = _missing_required_fields(guard_input)
    warnings = []

    if guard_input.risk_level not in RISK_LEVELS:
        gaps.append(f"Unknown risk_level: {guard_input.risk_level}.")

    evidence_by_id = {item.evidence_id: item for item in guard_input.evidence}
    if len(evidence_by_id) != len(guard_input.evidence):
        gaps.append("Evidence IDs must be unique.")

    if not guard_input.evidence:
        gaps.append("Evidence is missing; factual claims need source, tool, or command grounding.")

    for evidence in guard_input.evidence:
        gaps.extend(_validate_evidence_item(evidence))

    for index, claim in enumerate(guard_input.claims, start=1):
        gaps.extend(_validate_claim(index, claim, evidence_by_id, guard_input.risk_level))
        warnings.extend(_claim_warnings(index, claim, guard_input.uncertainty_notes))

    if guard_input.risk_level == "high":
        independent_sources = {
            evidence.source
            for evidence in guard_input.evidence
            if evidence.source_type not in {"inference", "user_instruction"}
        }
        if len(independent_sources) < 2:
            gaps.append("High-risk factual output requires at least two independent non-inference evidence sources.")

    status = "grounding_required" if gaps else "ready_to_publish"

    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "Publish only claims that are grounded, verified, or explicitly caveated.",
        "checks": {
            "risk_level": guard_input.risk_level,
            "claims_count": len(guard_input.claims),
            "evidence_count": len(guard_input.evidence),
            "uncertainty_notes_count": len(guard_input.uncertainty_notes),
            "limitation_notes_count": len(guard_input.limitation_notes),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve grounding gap: {gap}" for gap in gaps],
    }


def _validate_evidence_item(evidence: EvidenceItem) -> list[str]:
    gaps = []
    if not evidence.evidence_id.strip():
        gaps.append("Evidence item has an empty evidence_id.")
    if not evidence.source.strip():
        gaps.append(f"Evidence {evidence.evidence_id} is missing source.")
    if evidence.source_type not in EVIDENCE_TYPES:
        gaps.append(f"Evidence {evidence.evidence_id} has unknown source_type: {evidence.source_type}.")
    if evidence.source_type in {"official_docs", "paper", "web_source", "dataset"} and not evidence.checked_on.strip():
        gaps.append(f"Evidence {evidence.evidence_id} needs checked_on for external or time-sensitive sources.")
    return gaps


def _validate_claim(
    index: int,
    claim: ClaimCheck,
    evidence_by_id: dict[str, EvidenceItem],
    risk_level: str,
) -> list[str]:
    gaps = []
    label = f"Claim {index}"

    if not claim.statement.strip():
        gaps.append(f"{label} statement is missing.")
    if claim.claim_type not in FACTUAL_CLAIM_TYPES and claim.claim_type not in {"user_instruction", "inference", "preference"}:
        gaps.append(f"{label} has unknown claim_type: {claim.claim_type}.")
    if claim.support_level not in SUPPORTED_LEVELS:
        gaps.append(f"{label} has unknown support_level: {claim.support_level}.")

    unknown_ids = [evidence_id for evidence_id in claim.evidence_ids if evidence_id not in evidence_by_id]
    if unknown_ids:
        gaps.append(f"{label} references unknown evidence IDs: {', '.join(unknown_ids)}.")

    if _needs_grounding(claim):
        if not claim.evidence_ids:
            gaps.append(f"{label} is factual and presented as fact, but has no evidence IDs.")
        if not claim.verification_steps:
            gaps.append(f"{label} is factual and presented as fact, but has no verification steps.")
        if claim.support_level in {"unsupported", "not_checked"}:
            gaps.append(f"{label} is presented as fact but support_level is {claim.support_level}.")
        if claim.support_level == "uncertain":
            gaps.append(f"{label} is presented as fact but remains uncertain.")
        if risk_level in {"medium", "high"} and claim.support_level == "partially_supported":
            gaps.append(f"{label} is only partially supported for a {risk_level}-risk output.")

    if claim.claim_type == "external_fact":
        evidence_types = {evidence_by_id[evidence_id].source_type for evidence_id in claim.evidence_ids if evidence_id in evidence_by_id}
        if not evidence_types.intersection({"official_docs", "paper", "web_source", "dataset"}):
            gaps.append(f"{label} is an external fact but lacks external evidence.")

    if claim.claim_type in {"repository_state", "code_behavior"}:
        evidence_types = {evidence_by_id[evidence_id].source_type for evidence_id in claim.evidence_ids if evidence_id in evidence_by_id}
        if not evidence_types.intersection({"repository_file", "command_output", "test_result", "tool_result"}):
            gaps.append(f"{label} concerns repository/code state but lacks repository, command, test, or tool evidence.")

    if claim.freshness_sensitive:
        dated_evidence = [
            evidence_by_id[evidence_id]
            for evidence_id in claim.evidence_ids
            if evidence_id in evidence_by_id and evidence_by_id[evidence_id].checked_on.strip()
        ]
        if not dated_evidence:
            gaps.append(f"{label} is freshness-sensitive but has no dated evidence.")

    return gaps


def _claim_warnings(index: int, claim: ClaimCheck, uncertainty_notes: tuple[str, ...]) -> list[str]:
    warnings = []
    if claim.support_level in {"uncertain", "partially_supported"} and not uncertainty_notes:
        warnings.append(f"Claim {index} has limited support; add uncertainty notes or remove the claim.")
    if not claim.presented_as_fact and claim.support_level in {"unsupported", "not_checked"}:
        warnings.append(f"Claim {index} should remain explicitly caveated in the final output.")
    return warnings


def _needs_grounding(claim: ClaimCheck) -> bool:
    return claim.presented_as_fact and claim.claim_type in FACTUAL_CLAIM_TYPES


def _missing_required_fields(guard_input: HallucinationGuardInput) -> list[str]:
    missing = []
    if not guard_input.task.strip():
        missing.append("Task is missing.")
    if not guard_input.output_summary.strip():
        missing.append("Output summary is missing.")
    if not guard_input.claims:
        missing.append("Claims are missing; extract factual claims before publishing.")
    return missing


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a boolean.")
    return value


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


def _list_of_maps(value: Any, field_name: str) -> list[JsonMap]:
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list of objects.")
    if not all(isinstance(item, dict) for item in value):
        raise TypeError(f"{field_name} must contain only objects.")
    return value
