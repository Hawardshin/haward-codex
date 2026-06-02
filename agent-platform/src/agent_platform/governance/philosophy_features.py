"""Validate philosophy-to-feature extraction registries."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

REQUIRED_STAGE_IDS = {
    "philosophy_intake",
    "principle_clustering",
    "human_process_model",
    "feature_candidate_generation",
    "idea_evaluation",
    "asset_selection",
    "implementation_trace",
    "validation_and_rework",
    "data_accumulation",
}

ALLOWED_ASSET_TYPES = {"prompt", "workflow", "template", "tool", "skill", "agent", "project_feature"}
ALLOWED_CANDIDATE_STATUSES = {"implemented", "active", "planned", "queued", "deferred", "rejected"}
ALLOWED_RISK_TIERS = {"low", "medium", "high"}

REQUIRED_CANDIDATE_FIELDS = {
    "source_principle_ids",
    "human_process_step",
    "feature_hypothesis",
    "smallest_asset_type",
    "evidence_inputs",
    "risk_tier",
    "validation_targets",
    "rollback_plan",
}


def load_philosophy_feature_registry(path: Path) -> JsonMap:
    """Load a philosophy feature extraction registry."""

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def check_philosophy_feature_registry(config: JsonMap, repo_root: Path) -> JsonMap:
    """Check that philosophy principles can produce auditable feature candidates."""

    gaps: list[str] = []
    warnings: list[str] = []

    required_ids = _string_set(config.get("required_principle_ids"), "required_principle_ids", gaps)
    stage_ids = _check_stages(config.get("feature_intake_stages"), gaps)
    flow_principle_ids = _check_flows(config.get("principle_feature_flows"), required_ids, repo_root, gaps)
    candidate_principle_ids = _check_candidates(config.get("seed_feature_candidates"), required_ids, repo_root, gaps, warnings)
    contract_fields = _check_candidate_contract(config.get("feature_candidate_contract"), gaps)
    _check_quality_gates(config.get("quality_gates"), gaps)

    missing_from_flows = sorted(required_ids - flow_principle_ids)
    if missing_from_flows:
        gaps.append(
            "required_principle_ids missing from principle_feature_flows: "
            + ", ".join(missing_from_flows)
            + "."
        )

    missing_contract_fields = sorted(REQUIRED_CANDIDATE_FIELDS - contract_fields)
    if missing_contract_fields:
        gaps.append(
            "feature_candidate_contract.required_fields missing required fields: "
            + ", ".join(missing_contract_fields)
            + "."
        )

    if not candidate_principle_ids:
        gaps.append("seed_feature_candidates must cover at least one source principle.")

    missing_stages = sorted(REQUIRED_STAGE_IDS - stage_ids)
    if missing_stages:
        gaps.append("feature_intake_stages missing required stages: " + ", ".join(missing_stages) + ".")

    status = "ready" if not gaps else "rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": (
            "Philosophy should feed the product pipeline: each principle needs a path "
            "from source text to feature candidate, smallest asset choice, validation, "
            "rollback, and durable data accumulation."
        ),
        "checks": {
            "required_principles_count": len(required_ids),
            "covered_by_flows_count": len(flow_principle_ids & required_ids),
            "candidate_principles_count": len(candidate_principle_ids & required_ids),
            "stage_count": len(stage_ids),
            "required_stage_count": len(REQUIRED_STAGE_IDS),
            "contract_field_count": len(contract_fields),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve philosophy feature extraction gap: {gap}" for gap in gaps],
    }


def _check_stages(value: Any, gaps: list[str]) -> set[str]:
    if not isinstance(value, list) or not value:
        gaps.append("feature_intake_stages must be a non-empty list.")
        return set()

    stage_ids: set[str] = set()
    for index, stage in enumerate(value, start=1):
        label = f"feature_intake_stages[{index}]"
        if not isinstance(stage, dict):
            gaps.append(f"{label} must be an object.")
            continue
        stage_id = _required_string(stage, "id", label, gaps)
        if stage_id:
            if stage_id in stage_ids:
                gaps.append(f"{label}.id is duplicated: {stage_id}.")
            stage_ids.add(stage_id)
        _required_string(stage, "label", label, gaps)
        _required_string(stage, "input", label, gaps)
        _required_string(stage, "output", label, gaps)
        _non_empty_string_list(stage.get("checks"), f"{label}.checks", gaps)
    return stage_ids


def _check_flows(value: Any, required_ids: set[str], repo_root: Path, gaps: list[str]) -> set[str]:
    if not isinstance(value, list) or not value:
        gaps.append("principle_feature_flows must be a non-empty list.")
        return set()

    covered: set[str] = set()
    flow_ids: set[str] = set()
    for index, flow in enumerate(value, start=1):
        label = f"principle_feature_flows[{index}]"
        if not isinstance(flow, dict):
            gaps.append(f"{label} must be an object.")
            continue
        flow_id = _required_string(flow, "id", label, gaps)
        if flow_id:
            if flow_id in flow_ids:
                gaps.append(f"{label}.id is duplicated: {flow_id}.")
            flow_ids.add(flow_id)
        _required_string(flow, "label", label, gaps)
        _required_string(flow, "feature_question", label, gaps)
        ids = _string_set(flow.get("principle_ids"), f"{label}.principle_ids", gaps)
        _check_known_principles(ids, required_ids, f"{label}.principle_ids", gaps)
        covered.update(ids)
        _non_empty_string_list(flow.get("candidate_rules"), f"{label}.candidate_rules", gaps)
        _check_target_paths(flow.get("output_targets"), f"{label}.output_targets", repo_root, require_existing=True, gaps=gaps)
    return covered


def _check_candidates(
    value: Any,
    required_ids: set[str],
    repo_root: Path,
    gaps: list[str],
    warnings: list[str],
) -> set[str]:
    if not isinstance(value, list) or not value:
        gaps.append("seed_feature_candidates must be a non-empty list.")
        return set()

    covered: set[str] = set()
    seen_ids: set[str] = set()
    for index, candidate in enumerate(value, start=1):
        label = f"seed_feature_candidates[{index}]"
        if not isinstance(candidate, dict):
            gaps.append(f"{label} must be an object.")
            continue
        candidate_id = _required_string(candidate, "id", label, gaps)
        if candidate_id:
            if candidate_id in seen_ids:
                gaps.append(f"{label}.id is duplicated: {candidate_id}.")
            seen_ids.add(candidate_id)
        _required_string(candidate, "label", label, gaps)
        _required_string(candidate, "human_process_step", label, gaps)
        _required_string(candidate, "feature_hypothesis", label, gaps)
        _required_string(candidate, "rollback_plan", label, gaps)

        source_ids = _string_set(candidate.get("source_principle_ids"), f"{label}.source_principle_ids", gaps)
        _check_known_principles(source_ids, required_ids, f"{label}.source_principle_ids", gaps)
        covered.update(source_ids)

        asset_type = _required_string(candidate, "smallest_asset_type", label, gaps)
        if asset_type and asset_type not in ALLOWED_ASSET_TYPES:
            gaps.append(f"{label}.smallest_asset_type must be one of {', '.join(sorted(ALLOWED_ASSET_TYPES))}: {asset_type}.")

        status = _required_string(candidate, "status", label, gaps)
        if status and status not in ALLOWED_CANDIDATE_STATUSES:
            gaps.append(f"{label}.status must be one of {', '.join(sorted(ALLOWED_CANDIDATE_STATUSES))}: {status}.")

        risk_tier = _required_string(candidate, "risk_tier", label, gaps)
        if risk_tier and risk_tier not in ALLOWED_RISK_TIERS:
            gaps.append(f"{label}.risk_tier must be one of {', '.join(sorted(ALLOWED_RISK_TIERS))}: {risk_tier}.")

        _non_empty_string_list(candidate.get("evidence_inputs"), f"{label}.evidence_inputs", gaps)
        _check_validation_targets(candidate.get("validation_targets"), f"{label}.validation_targets", gaps)

        require_existing_targets = status in {"implemented", "active"}
        _check_target_paths(
            candidate.get("target_paths"),
            f"{label}.target_paths",
            repo_root,
            require_existing=require_existing_targets,
            gaps=gaps,
        )
        if not require_existing_targets and _safe_len(candidate.get("target_paths")) == 0:
            warnings.append(f"{label}.target_paths is empty for queued candidate {candidate_id or index}.")

    return covered


def _check_candidate_contract(value: Any, gaps: list[str]) -> set[str]:
    if not isinstance(value, dict):
        gaps.append("feature_candidate_contract must be an object.")
        return set()
    required_fields = _string_set(value.get("required_fields"), "feature_candidate_contract.required_fields", gaps)
    asset_types = _string_set(value.get("allowed_asset_types"), "feature_candidate_contract.allowed_asset_types", gaps)
    unknown_assets = sorted(asset_types - ALLOWED_ASSET_TYPES)
    if unknown_assets:
        gaps.append("feature_candidate_contract.allowed_asset_types includes unknown values: " + ", ".join(unknown_assets) + ".")
    return required_fields


def _check_quality_gates(value: Any, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append("quality_gates must be a non-empty list.")
        return
    for index, gate in enumerate(value, start=1):
        label = f"quality_gates[{index}]"
        if not isinstance(gate, dict):
            gaps.append(f"{label} must be an object.")
            continue
        _required_string(gate, "id", label, gaps)
        _required_string(gate, "rule", label, gaps)
        _required_string(gate, "failure_action", label, gaps)


def _check_target_paths(value: Any, label: str, repo_root: Path, require_existing: bool, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return
    for index, path_value in enumerate(value, start=1):
        item_label = f"{label}[{index}]"
        if not isinstance(path_value, str) or not path_value.strip():
            gaps.append(f"{item_label} must be a non-empty string.")
            continue
        if require_existing and not (repo_root / path_value.strip()).exists():
            gaps.append(f"{item_label} path does not exist: {path_value.strip()}.")


def _check_validation_targets(value: Any, label: str, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return
    for index, item in enumerate(value, start=1):
        item_label = f"{label}[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        if not _command_value(item.get("command")):
            gaps.append(f"{item_label}.command must be a non-empty string or list of non-empty strings.")
        _required_string(item, "validates", item_label, gaps)


def _check_known_principles(value: set[str], required_ids: set[str], label: str, gaps: list[str]) -> None:
    unknown = sorted(value - required_ids)
    if unknown:
        gaps.append(f"{label} includes unknown philosophy principles: {', '.join(unknown)}.")


def _string_set(value: Any, label: str, gaps: list[str]) -> set[str]:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return set()
    result = set()
    for index, item in enumerate(value, start=1):
        if not isinstance(item, str) or not item.strip():
            gaps.append(f"{label}[{index}] must be a non-empty string.")
            continue
        result.add(item.strip())
    return result


def _non_empty_string_list(value: Any, label: str, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return
    for index, item in enumerate(value, start=1):
        if not isinstance(item, str) or not item.strip():
            gaps.append(f"{label}[{index}] must be a non-empty string.")


def _required_string(source: JsonMap, field_name: str, label: str, gaps: list[str]) -> str:
    value = source.get(field_name)
    if not isinstance(value, str) or not value.strip():
        gaps.append(f"{label}.{field_name} must be a non-empty string.")
        return ""
    return value.strip()


def _command_value(value: Any) -> bool:
    if isinstance(value, str):
        return bool(value.strip())
    return isinstance(value, list) and bool(value) and all(isinstance(item, str) and item.strip() for item in value)


def _safe_len(value: Any) -> int:
    return len(value) if isinstance(value, list) else 0
