"""Validate structural guardrail composition records."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

RISK_CATEGORIES = {
    "security",
    "privacy",
    "cost",
    "publication",
    "deployment",
    "destructive_change",
    "external_tool_call",
    "file_access",
    "permission",
    "high_stakes_claim",
    "other",
}

IMPACT_LEVELS = {"low", "medium", "high"}
REVERSIBILITY_LEVELS = {"reversible", "partially_reversible", "irreversible"}

GUARDRAIL_TYPES = {
    "input_filter_or_redaction",
    "output_schema_or_format_contract",
    "allowlist_or_denylist",
    "tool_permission_or_capability_scope",
    "sandbox_or_dry_run",
    "rate_limit_or_cost_cap",
    "human_checkpoint_or_arbitration",
    "evaluator_or_grounding_check",
    "test_or_smoke_check",
    "privacy_or_security_audit",
    "rollback_or_recovery_gate",
}

HARD_GUARDRAIL_TYPES = {
    "allowlist_or_denylist",
    "tool_permission_or_capability_scope",
    "sandbox_or_dry_run",
    "rate_limit_or_cost_cap",
    "human_checkpoint_or_arbitration",
    "evaluator_or_grounding_check",
    "test_or_smoke_check",
    "privacy_or_security_audit",
    "rollback_or_recovery_gate",
}

SECURITY_PRIVACY_TYPES = {
    "allowlist_or_denylist",
    "tool_permission_or_capability_scope",
    "sandbox_or_dry_run",
    "human_checkpoint_or_arbitration",
    "privacy_or_security_audit",
    "rollback_or_recovery_gate",
}

ACTION_SIDE_EFFECT_TYPES = {
    "allowlist_or_denylist",
    "tool_permission_or_capability_scope",
    "sandbox_or_dry_run",
    "human_checkpoint_or_arbitration",
    "rollback_or_recovery_gate",
}

PUBLICATION_GROUNDING_TYPES = {
    "output_schema_or_format_contract",
    "human_checkpoint_or_arbitration",
    "evaluator_or_grounding_check",
    "test_or_smoke_check",
}


@dataclass(frozen=True)
class RiskSurface:
    """A task risk surface that needs an explicit execution boundary."""

    surface_id: str
    category: str
    description: str
    impact: str = "medium"
    reversibility: str = "partially_reversible"
    evidence: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "RiskSurface":
        return cls(
            surface_id=_required_string(data, "surface_id"),
            category=_required_string(data, "category"),
            description=_required_string(data, "description"),
            impact=_optional_string(data.get("impact", "medium"), "impact"),
            reversibility=_optional_string(data.get("reversibility", "partially_reversible"), "reversibility"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
        )


@dataclass(frozen=True)
class Guardrail:
    """A structural boundary attached to one or more risk surfaces."""

    guardrail_id: str
    risk_surface_ids: tuple[str, ...]
    guardrail_type: str
    allowed_actions: tuple[str, ...] = ()
    blocked_actions: tuple[str, ...] = ()
    fallback_or_escalation: str = ""
    verification_evidence: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "Guardrail":
        return cls(
            guardrail_id=_required_string(data, "guardrail_id"),
            risk_surface_ids=_tuple_of_strings(data.get("risk_surface_ids", []), "risk_surface_ids"),
            guardrail_type=_required_string(data, "guardrail_type"),
            allowed_actions=_tuple_of_strings(data.get("allowed_actions", []), "allowed_actions"),
            blocked_actions=_tuple_of_strings(data.get("blocked_actions", []), "blocked_actions"),
            fallback_or_escalation=_optional_string(data.get("fallback_or_escalation", ""), "fallback_or_escalation"),
            verification_evidence=_tuple_of_strings(data.get("verification_evidence", []), "verification_evidence"),
        )


@dataclass(frozen=True)
class ExecutionControls:
    """Composition-wide controls that may satisfy category-specific gates."""

    requires_human_checkpoint: bool = False
    requires_dry_run: bool = False
    requires_rollback: bool = False
    requires_privacy_audit: bool = False
    requires_grounding: bool = False
    requires_cost_cap: bool = False

    @classmethod
    def from_dict(cls, data: JsonMap | None) -> "ExecutionControls":
        value = data or {}
        if not isinstance(value, dict):
            raise TypeError("execution_controls must be an object.")
        return cls(
            requires_human_checkpoint=_optional_bool(value.get("requires_human_checkpoint", False), "requires_human_checkpoint"),
            requires_dry_run=_optional_bool(value.get("requires_dry_run", False), "requires_dry_run"),
            requires_rollback=_optional_bool(value.get("requires_rollback", False), "requires_rollback"),
            requires_privacy_audit=_optional_bool(value.get("requires_privacy_audit", False), "requires_privacy_audit"),
            requires_grounding=_optional_bool(value.get("requires_grounding", False), "requires_grounding"),
            requires_cost_cap=_optional_bool(value.get("requires_cost_cap", False), "requires_cost_cap"),
        )


@dataclass(frozen=True)
class GuardrailCompositionInput:
    """Structured input for checking material-risk guardrail composition."""

    task: str
    work_mode: str = "standard"
    risk_surfaces: tuple[RiskSurface, ...] = ()
    guardrails: tuple[Guardrail, ...] = ()
    execution_controls: ExecutionControls = ExecutionControls()
    source_provenance: tuple[str, ...] = ()
    plan_evidence: tuple[str, ...] = ()
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "GuardrailCompositionInput":
        return cls(
            task=_required_string(data, "task"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            risk_surfaces=_tuple_from_objects(data.get("risk_surfaces", []), "risk_surfaces", RiskSurface.from_dict),
            guardrails=_tuple_from_objects(data.get("guardrails", []), "guardrails", Guardrail.from_dict),
            execution_controls=ExecutionControls.from_dict(data.get("execution_controls", {})),
            source_provenance=_tuple_of_strings(data.get("source_provenance", []), "source_provenance"),
            plan_evidence=_tuple_of_strings(data.get("plan_evidence", []), "plan_evidence"),
            notes=_tuple_of_strings(data.get("notes", []), "notes"),
        )


def check_guardrail_composition(composition: GuardrailCompositionInput) -> JsonMap:
    """Return a deterministic readiness report for a structural guardrail record."""

    gaps: list[str] = []
    warnings: list[str] = []

    _check_header(composition, gaps)
    surface_ids = _check_risk_surfaces(composition, gaps, warnings)
    guardrail_ids = _check_guardrails(composition, surface_ids, gaps)
    coverage = _check_coverage(composition, gaps, warnings)
    _check_category_specific_gates(composition, coverage, gaps)
    _check_evidence(composition, gaps)

    requires_rework = bool(gaps)
    return {
        "status": "guardrails_ready" if not requires_rework else "rework_required",
        "requires_rework": requires_rework,
        "work_mode": composition.work_mode,
        "checks": {
            "task": composition.task,
            "risk_surface_count": len(composition.risk_surfaces),
            "guardrail_count": len(composition.guardrails),
            "covered_surface_count": len(coverage),
            "guardrail_id_count": len(guardrail_ids),
            "high_impact_surface_count": len([surface for surface in composition.risk_surfaces if surface.impact == "high"]),
            "irreversible_surface_count": len(
                [surface for surface in composition.risk_surfaces if surface.reversibility == "irreversible"]
            ),
            "hard_guardrail_count": len(
                [guardrail for guardrail in composition.guardrails if guardrail.guardrail_type in HARD_GUARDRAIL_TYPES]
            ),
            "source_provenance_count": len(composition.source_provenance),
            "plan_evidence_count": len(composition.plan_evidence),
        },
        "coverage_summary": [
            {
                "risk_surface_id": surface_id,
                "guardrail_ids": sorted(ids),
            }
            for surface_id, ids in sorted(coverage.items())
        ],
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve guardrail composition gap: {gap}" for gap in gaps],
    }


def _check_header(composition: GuardrailCompositionInput, gaps: list[str]) -> None:
    if not composition.task.strip():
        gaps.append("task is missing.")
    if not composition.work_mode.strip():
        gaps.append("work_mode is missing.")


def _check_risk_surfaces(
    composition: GuardrailCompositionInput,
    gaps: list[str],
    warnings: list[str],
) -> set[str]:
    if not composition.risk_surfaces:
        gaps.append("risk_surfaces is empty. Structural guardrails need at least one explicit risk surface.")
        return set()

    surface_ids: list[str] = []
    for surface in composition.risk_surfaces:
        label = f"Risk surface {surface.surface_id or '<missing>'}"
        if not surface.surface_id.strip():
            gaps.append("risk_surface.surface_id is missing.")
        surface_ids.append(surface.surface_id)

        if surface.category not in RISK_CATEGORIES:
            gaps.append(f"{label} category must be one of: {', '.join(sorted(RISK_CATEGORIES))}.")
        if surface.category == "other":
            warnings.append(f"{label} uses category 'other'; add a specific category when this becomes a repeated pattern.")
        if not surface.description.strip():
            gaps.append(f"{label} description is missing.")
        if surface.impact not in IMPACT_LEVELS:
            gaps.append(f"{label} impact must be one of: {', '.join(sorted(IMPACT_LEVELS))}.")
        if surface.reversibility not in REVERSIBILITY_LEVELS:
            gaps.append(f"{label} reversibility must be one of: {', '.join(sorted(REVERSIBILITY_LEVELS))}.")
        if (surface.impact == "high" or surface.reversibility == "irreversible") and not surface.evidence:
            gaps.append(f"{label} is high-impact or irreversible and needs evidence explaining why the risk exists.")

    duplicates = _duplicates(surface_ids)
    for duplicate in duplicates:
        gaps.append(f"Duplicate risk_surface_id '{duplicate}'.")
    return set(surface_ids)


def _check_guardrails(
    composition: GuardrailCompositionInput,
    known_surface_ids: set[str],
    gaps: list[str],
) -> set[str]:
    if not composition.guardrails:
        gaps.append("guardrails is empty. Add at least one structural guardrail.")
        return set()

    guardrail_ids: list[str] = []
    for guardrail in composition.guardrails:
        label = f"Guardrail {guardrail.guardrail_id or '<missing>'}"
        if not guardrail.guardrail_id.strip():
            gaps.append("guardrail.guardrail_id is missing.")
        guardrail_ids.append(guardrail.guardrail_id)

        if guardrail.guardrail_type not in GUARDRAIL_TYPES:
            gaps.append(f"{label} guardrail_type must be one of: {', '.join(sorted(GUARDRAIL_TYPES))}.")
        if not guardrail.risk_surface_ids:
            gaps.append(f"{label} risk_surface_ids is empty.")
        for surface_id in guardrail.risk_surface_ids:
            if surface_id not in known_surface_ids:
                gaps.append(f"{label} references unknown risk_surface_id '{surface_id}'.")
        if not guardrail.allowed_actions:
            gaps.append(f"{label} allowed_actions is empty.")
        if not guardrail.blocked_actions:
            gaps.append(f"{label} blocked_actions is empty.")
        if not guardrail.fallback_or_escalation.strip():
            gaps.append(f"{label} fallback_or_escalation is missing.")
        if not guardrail.verification_evidence:
            gaps.append(f"{label} verification_evidence is empty.")

    duplicates = _duplicates(guardrail_ids)
    for duplicate in duplicates:
        gaps.append(f"Duplicate guardrail_id '{duplicate}'.")
    return set(guardrail_ids)


def _check_coverage(
    composition: GuardrailCompositionInput,
    gaps: list[str],
    warnings: list[str],
) -> dict[str, set[str]]:
    coverage: dict[str, set[str]] = {}
    for guardrail in composition.guardrails:
        for surface_id in guardrail.risk_surface_ids:
            coverage.setdefault(surface_id, set()).add(guardrail.guardrail_id)

    for surface in composition.risk_surfaces:
        if surface.surface_id not in coverage:
            gaps.append(f"Risk surface {surface.surface_id} has no guardrail coverage.")
            continue
        guardrails = [
            guardrail
            for guardrail in composition.guardrails
            if surface.surface_id in guardrail.risk_surface_ids
        ]
        if (surface.impact == "high" or surface.reversibility == "irreversible") and not any(
            guardrail.guardrail_type in HARD_GUARDRAIL_TYPES for guardrail in guardrails
        ):
            gaps.append(f"Risk surface {surface.surface_id} is high-impact or irreversible and needs at least one hard guardrail.")
        if surface.impact == "low" and surface.reversibility == "reversible":
            warnings.append(f"Risk surface {surface.surface_id} is low/reversible; keep the guardrail lightweight.")

    return coverage


def _check_category_specific_gates(
    composition: GuardrailCompositionInput,
    coverage: dict[str, set[str]],
    gaps: list[str],
) -> None:
    guardrail_by_id = {guardrail.guardrail_id: guardrail for guardrail in composition.guardrails}
    controls = composition.execution_controls

    for surface in composition.risk_surfaces:
        guardrails = [guardrail_by_id[guardrail_id] for guardrail_id in coverage.get(surface.surface_id, set()) if guardrail_id in guardrail_by_id]
        types = {guardrail.guardrail_type for guardrail in guardrails}

        if surface.category in {"security", "privacy"}:
            if surface.impact == "high" or surface.reversibility == "irreversible":
                if not (types & SECURITY_PRIVACY_TYPES or controls.requires_human_checkpoint or controls.requires_privacy_audit):
                    gaps.append(
                        f"Risk surface {surface.surface_id} is high security/privacy risk and needs a permission, sandbox, audit, rollback, or human checkpoint guardrail."
                    )

        if surface.category in {"deployment", "destructive_change"}:
            if not (
                types & {"sandbox_or_dry_run", "rollback_or_recovery_gate", "human_checkpoint_or_arbitration"}
                or controls.requires_dry_run
                or controls.requires_rollback
                or controls.requires_human_checkpoint
            ):
                gaps.append(
                    f"Risk surface {surface.surface_id} affects deployment or destructive change and needs dry-run, rollback, or human checkpoint control."
                )

        if surface.category in {"external_tool_call", "file_access", "permission"}:
            if not (types & ACTION_SIDE_EFFECT_TYPES or controls.requires_human_checkpoint):
                gaps.append(
                    f"Risk surface {surface.surface_id} uses tools, files, or permissions and needs allowlist, permission scope, sandbox, rollback, or human checkpoint control."
                )

        if surface.category == "cost":
            if not (types & {"rate_limit_or_cost_cap", "human_checkpoint_or_arbitration"} or controls.requires_cost_cap):
                gaps.append(f"Risk surface {surface.surface_id} affects cost and needs a cost cap, rate limit, or human checkpoint.")

        if surface.category in {"publication", "high_stakes_claim"}:
            if not (types & PUBLICATION_GROUNDING_TYPES or controls.requires_grounding or controls.requires_human_checkpoint):
                gaps.append(
                    f"Risk surface {surface.surface_id} affects publication or high-stakes claims and needs grounding, evaluator, schema, test, or human checkpoint control."
                )


def _check_evidence(composition: GuardrailCompositionInput, gaps: list[str]) -> None:
    if composition.work_mode != "quick" and not composition.source_provenance:
        gaps.append("source_provenance is empty. Non-quick guardrail composition needs source handles.")
    if composition.work_mode != "quick" and not composition.plan_evidence:
        gaps.append("plan_evidence is empty. Non-quick guardrail composition needs planning evidence.")


def _tuple_from_objects(value: Any, field_name: str, factory: Any) -> tuple[Any, ...]:
    if value is None:
        return ()
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list.")
    return tuple(factory(item) for item in value)


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if value is None:
        return ()
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list of strings.")
    result = []
    for index, item in enumerate(value, start=1):
        if not isinstance(item, str):
            raise TypeError(f"{field_name}[{index}] must be a string.")
        stripped = item.strip()
        if stripped:
            result.append(stripped)
    return tuple(result)


def _required_string(source: JsonMap, field_name: str) -> str:
    value = source.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value.strip()


def _optional_string(value: Any, field_name: str) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value.strip()


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
    return value


def _duplicates(values: list[str]) -> list[str]:
    seen: set[str] = set()
    duplicates: set[str] = set()
    for value in values:
        if value in seen:
            duplicates.add(value)
        seen.add(value)
    return sorted(duplicates)
