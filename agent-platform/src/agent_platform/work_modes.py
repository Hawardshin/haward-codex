"""Work mode registry helpers and enforcement checks."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from agent_platform.evaluation.work_evaluator import MODE_REQUIRED_TARGETS, TARGET_GAP_MESSAGES


REQUIRED_MODE_IDS = {"quick", "standard", "ship_first", "research", "governance"}

REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "name",
    "purpose",
    "reader_guide",
    "reference_links",
    "structure_rules",
    "field_guide",
    "mode_enforcement",
    "default_mode",
    "modes",
    "selection_rules",
    "evaluator_policy",
    "deferred_improvement_rules",
}

REQUIRED_MODE_FIELDS = {
    "id",
    "label",
    "intent",
    "use_when",
    "avoid_when",
    "required_before_close",
    "deferred_or_optional",
    "enforcement_level",
    "selection_record_required",
    "closeout_gate",
}

REQUIRED_ENFORCEMENT_LAYERS = {
    "registry_config",
    "cli_registry_check",
    "mode_selection_record",
    "omission_coverage_record",
    "resource_leak_record",
    "work_evaluator_gate",
    "evaluation_report",
}

ALLOWED_CLOSEOUT_REFERENCES = set(TARGET_GAP_MESSAGES) | {
    "initial_instruction",
    "result_summary",
    "changed_files_or_no_file_explanation",
    "verification",
    "verification_or_manual_check",
    "deferred_improvement_targets_when_improvement_ideas_exist",
    "resource_check_targets_when_resource_risk_occurred",
}


def load_work_mode_registry(path: Path) -> dict[str, Any]:
    """Load a work mode registry JSON file."""

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise ValueError("Work mode registry must be a JSON object.")
    return data


def list_work_modes(registry: dict[str, Any]) -> list[dict[str, Any]]:
    """Return compact work mode records."""

    return [
        {
            "id": mode["id"],
            "label": mode["label"],
            "intent": mode["intent"],
            "enforcement_level": mode.get("enforcement_level", "unknown"),
        }
        for mode in _mode_records(registry)
    ]


def show_work_mode(registry: dict[str, Any], mode_id: str) -> dict[str, Any]:
    """Return one work mode by id."""

    for mode in _mode_records(registry):
        if mode.get("id") == mode_id:
            return mode
    raise ValueError(f"Unknown work mode '{mode_id}'.")


def check_work_mode_registry(registry: dict[str, Any]) -> dict[str, Any]:
    """Validate that work modes are enforceable and aligned with evaluator policy."""

    gaps: list[str] = []
    warnings: list[str] = []

    missing = sorted(REQUIRED_TOP_LEVEL_FIELDS - set(registry))
    if missing:
        gaps.append(f"Missing top-level fields: {', '.join(missing)}.")

    modes = registry.get("modes")
    if not isinstance(modes, list) or not modes:
        gaps.append("modes must be a non-empty list.")
        modes = []

    mode_ids: list[str] = []
    for index, mode in enumerate(modes, start=1):
        if not isinstance(mode, dict):
            gaps.append(f"modes[{index}] must be an object.")
            continue

        mode_id = str(mode.get("id", "")).strip()
        if mode_id:
            mode_ids.append(mode_id)
        missing_mode_fields = sorted(REQUIRED_MODE_FIELDS - set(mode))
        if missing_mode_fields:
            gaps.append(f"mode {mode_id or index}: missing fields: {', '.join(missing_mode_fields)}.")

        _check_mode_lists(mode, mode_id or str(index), gaps)
        _check_mode_enforcement(mode, mode_id or str(index), gaps, warnings)

    if set(mode_ids) != REQUIRED_MODE_IDS:
        gaps.append(
            "Work mode ids must be exactly: "
            f"{', '.join(sorted(REQUIRED_MODE_IDS))}. Found: {', '.join(sorted(mode_ids))}."
        )
    if len(mode_ids) != len(set(mode_ids)):
        gaps.append("Work mode ids must be unique.")

    default_mode = registry.get("default_mode")
    if default_mode not in mode_ids:
        gaps.append("default_mode must match one modes[].id.")

    _check_mode_enforcement_block(registry, gaps)
    _check_evaluator_policy(registry, set(mode_ids), gaps, warnings)

    return {
        "status": "ready" if not gaps else "rework_required",
        "requires_rework": bool(gaps),
        "checks": {
            "mode_count": len(mode_ids),
            "mode_ids": mode_ids,
            "default_mode": default_mode,
            "required_enforcement_layers": sorted(REQUIRED_ENFORCEMENT_LAYERS),
            "evaluator_policy_modes": sorted((registry.get("evaluator_policy") or {}).keys())
            if isinstance(registry.get("evaluator_policy"), dict)
            else [],
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _check_mode_lists(mode: dict[str, Any], mode_id: str, gaps: list[str]) -> None:
    for field in ("use_when", "avoid_when", "required_before_close", "deferred_or_optional"):
        values = mode.get(field)
        if not isinstance(values, list):
            gaps.append(f"mode {mode_id}: {field} must be a list.")
            continue
        if not all(isinstance(item, str) for item in values):
            gaps.append(f"mode {mode_id}: {field} must contain only strings.")

    closeout_refs = mode.get("required_before_close", [])
    if isinstance(closeout_refs, list):
        unknown = sorted({item for item in closeout_refs if isinstance(item, str)} - ALLOWED_CLOSEOUT_REFERENCES)
        if unknown:
            gaps.append(f"mode {mode_id}: required_before_close contains unknown close-out references: {', '.join(unknown)}.")


def _check_mode_enforcement(
    mode: dict[str, Any],
    mode_id: str,
    gaps: list[str],
    warnings: list[str],
) -> None:
    enforcement_level = mode.get("enforcement_level")
    if enforcement_level not in {"advisory", "blocking"}:
        gaps.append(f"mode {mode_id}: enforcement_level must be advisory or blocking.")

    if not isinstance(mode.get("selection_record_required"), bool):
        gaps.append(f"mode {mode_id}: selection_record_required must be a boolean.")

    closeout_gate = mode.get("closeout_gate")
    if not isinstance(closeout_gate, str) or not closeout_gate.strip():
        gaps.append(f"mode {mode_id}: closeout_gate must be a non-empty string.")

    if mode_id != "quick" and mode.get("selection_record_required") is not True:
        gaps.append(f"mode {mode_id}: selection_record_required must be true for enforceable modes.")
    if mode_id != "quick" and enforcement_level != "blocking":
        gaps.append(f"mode {mode_id}: enforcement_level must be blocking for non-quick modes.")
    if mode_id == "quick" and enforcement_level != "advisory":
        warnings.append("mode quick should normally stay advisory to preserve low-friction tiny fixes.")


def _check_mode_enforcement_block(registry: dict[str, Any], gaps: list[str]) -> None:
    enforcement = registry.get("mode_enforcement")
    if not isinstance(enforcement, dict):
        gaps.append("mode_enforcement must be an object.")
        return

    layers = enforcement.get("layers")
    if not isinstance(layers, list) or not layers:
        gaps.append("mode_enforcement.layers must be a non-empty list.")
        return

    layer_ids = {
        str(layer.get("id", "")).strip()
        for layer in layers
        if isinstance(layer, dict) and str(layer.get("id", "")).strip()
    }
    missing_layers = sorted(REQUIRED_ENFORCEMENT_LAYERS - layer_ids)
    if missing_layers:
        gaps.append(f"mode_enforcement.layers is missing required layers: {', '.join(missing_layers)}.")

    for index, layer in enumerate(layers, start=1):
        if not isinstance(layer, dict):
            gaps.append(f"mode_enforcement.layers[{index}] must be an object.")
            continue
        for field in ("id", "purpose", "enforced_by"):
            if not isinstance(layer.get(field), str) or not layer[field].strip():
                gaps.append(f"mode_enforcement layer {layer.get('id', index)}: {field} must be a non-empty string.")


def _check_evaluator_policy(
    registry: dict[str, Any],
    mode_ids: set[str],
    gaps: list[str],
    warnings: list[str],
) -> None:
    policy = registry.get("evaluator_policy")
    if not isinstance(policy, dict):
        gaps.append("evaluator_policy must be an object.")
        return

    policy_ids = set(policy)
    if policy_ids != mode_ids:
        gaps.append(
            "evaluator_policy keys must match modes[].id. "
            f"mode ids={', '.join(sorted(mode_ids))}; policy ids={', '.join(sorted(policy_ids))}."
        )

    for mode_id, mode_policy in policy.items():
        if not isinstance(mode_policy, dict):
            gaps.append(f"evaluator_policy.{mode_id} must be an object.")
            continue
        blocking = _string_set(mode_policy.get("blocking_target_fields"), f"evaluator_policy.{mode_id}.blocking_target_fields", gaps)
        non_blocking = _string_set(
            mode_policy.get("non_blocking_target_fields"),
            f"evaluator_policy.{mode_id}.non_blocking_target_fields",
            gaps,
        )
        unknown_fields = sorted((blocking | non_blocking) - set(TARGET_GAP_MESSAGES))
        if unknown_fields:
            gaps.append(f"evaluator_policy.{mode_id} contains unknown target fields: {', '.join(unknown_fields)}.")
        overlap = sorted(blocking & non_blocking)
        if overlap:
            gaps.append(f"evaluator_policy.{mode_id} has fields in both blocking and non-blocking lists: {', '.join(overlap)}.")
        expected = MODE_REQUIRED_TARGETS.get(mode_id)
        if expected is not None and blocking != expected:
            gaps.append(
                f"evaluator_policy.{mode_id}.blocking_target_fields does not match work_evaluator.MODE_REQUIRED_TARGETS."
            )
        if mode_id != "quick" and "mode_selection_record_targets" not in blocking:
            gaps.append(f"evaluator_policy.{mode_id} must block on mode_selection_record_targets.")
        if mode_id != "quick" and "omission_check_targets" not in blocking:
            gaps.append(f"evaluator_policy.{mode_id} must block on omission_check_targets.")

    for mode_id in REQUIRED_MODE_IDS - policy_ids:
        warnings.append(f"evaluator_policy for {mode_id} could not be checked because it is missing.")


def _string_set(value: Any, field_name: str, gaps: list[str]) -> set[str]:
    if not isinstance(value, list):
        gaps.append(f"{field_name} must be a list.")
        return set()
    if not all(isinstance(item, str) for item in value):
        gaps.append(f"{field_name} must contain only strings.")
        return set()
    return set(value)


def _mode_records(registry: dict[str, Any]) -> list[dict[str, Any]]:
    modes = registry.get("modes", [])
    if not isinstance(modes, list):
        raise ValueError("modes must be a list.")
    return [mode for mode in modes if isinstance(mode, dict)]
