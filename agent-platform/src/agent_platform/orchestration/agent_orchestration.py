"""Validate agent creation and orchestration registry contracts."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "name",
    "purpose",
    "reader_guide",
    "reference_links",
    "structure_rules",
    "field_guide",
    "platform_principle",
    "agent_spec_contract",
    "agent_blueprints",
    "creation_pipeline",
    "orchestration_patterns",
    "orchestration_controls",
    "lifecycle_gates",
    "validation_commands",
}

REQUIRED_AGENT_SPEC_FIELDS = {"name", "description", "runtime", "skills", "tools", "metadata"}
REQUIRED_BLUEPRINT_FIELDS = {"blueprint_id", "purpose", "default_runtime", "spec_template_path", "creation_gates", "validation_commands"}
REQUIRED_PATTERN_FIELDS = {
    "pattern_id",
    "use_when",
    "coordination_model",
    "state_contract",
    "handoff_contract",
    "observability_contract",
    "failure_policy",
    "required_gates",
}
REQUIRED_PATTERN_IDS = {"single_agent", "supervisor_router", "sequential_pipeline", "parallel_fanout_merge", "handoff_network"}
REQUIRED_CONTROL_IDS = {"state", "handoff", "tool_access", "human_checkpoint", "observability", "resource", "evaluation"}
REQUIRED_GATE_IDS = {"intake", "research", "spec", "creation", "orchestration", "validation", "evaluation"}


def load_agent_orchestration_registry(path: Path) -> JsonMap:
    """Load an agent orchestration registry JSON file."""

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise ValueError("Agent orchestration registry must be a JSON object.")
    return data


def check_agent_orchestration_registry(registry: JsonMap) -> JsonMap:
    """Return deterministic readiness for the agent creation/orchestration registry."""

    gaps: list[str] = []
    warnings: list[str] = []

    missing_top_level = sorted(REQUIRED_TOP_LEVEL_FIELDS - set(registry))
    if missing_top_level:
        gaps.append(f"Missing top-level fields: {', '.join(missing_top_level)}.")

    _check_reader_contract(registry, gaps)
    _check_agent_spec_contract(registry.get("agent_spec_contract", {}), gaps, warnings)
    _check_blueprints(registry.get("agent_blueprints", []), gaps, warnings)
    _check_creation_pipeline(registry.get("creation_pipeline", []), gaps)
    _check_patterns(registry.get("orchestration_patterns", []), gaps, warnings)
    _check_controls(registry.get("orchestration_controls", []), gaps)
    _check_lifecycle_gates(registry.get("lifecycle_gates", []), gaps)
    _check_validation_commands(registry.get("validation_commands", []), gaps)

    requires_rework = bool(gaps)
    return {
        "status": "rework_required" if requires_rework else "ready",
        "requires_rework": requires_rework,
        "checks": {
            "blueprint_count": len(registry.get("agent_blueprints", [])) if isinstance(registry.get("agent_blueprints"), list) else 0,
            "creation_pipeline_steps": len(registry.get("creation_pipeline", [])) if isinstance(registry.get("creation_pipeline"), list) else 0,
            "orchestration_pattern_count": len(registry.get("orchestration_patterns", []))
            if isinstance(registry.get("orchestration_patterns"), list)
            else 0,
            "control_count": len(registry.get("orchestration_controls", []))
            if isinstance(registry.get("orchestration_controls"), list)
            else 0,
            "lifecycle_gate_count": len(registry.get("lifecycle_gates", [])) if isinstance(registry.get("lifecycle_gates"), list) else 0,
            "validation_command_count": len(registry.get("validation_commands", []))
            if isinstance(registry.get("validation_commands"), list)
            else 0,
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve agent orchestration gap: {gap}" for gap in gaps],
    }


def _check_reader_contract(registry: JsonMap, gaps: list[str]) -> None:
    if not _non_empty_string(registry.get("schema_version")):
        gaps.append("schema_version is missing.")
    if not _non_empty_string(registry.get("name")):
        gaps.append("name is missing.")
    if not _non_empty_string(registry.get("purpose")):
        gaps.append("purpose is missing.")
    if not isinstance(registry.get("reader_guide"), dict):
        gaps.append("reader_guide must be an object.")
    if not _non_empty_list(registry.get("reference_links")):
        gaps.append("reference_links must be a non-empty list.")
    if not _non_empty_list(registry.get("structure_rules")):
        gaps.append("structure_rules must be a non-empty list.")
    if not _non_empty_list(registry.get("field_guide")):
        gaps.append("field_guide must be a non-empty list.")
    if not _non_empty_string(registry.get("platform_principle")):
        gaps.append("platform_principle is missing.")


def _check_agent_spec_contract(contract: Any, gaps: list[str], warnings: list[str]) -> None:
    if not isinstance(contract, dict):
        gaps.append("agent_spec_contract must be an object.")
        return
    required_fields = set(_string_list(contract.get("required_fields")))
    missing = sorted(REQUIRED_AGENT_SPEC_FIELDS - required_fields)
    if missing:
        gaps.append(f"agent_spec_contract.required_fields is missing: {', '.join(missing)}.")
    metadata = contract.get("required_metadata")
    if not isinstance(metadata, list) or not metadata:
        gaps.append("agent_spec_contract.required_metadata must be a non-empty list.")
    if "input_contract" not in contract or "output_contract" not in contract:
        warnings.append("agent_spec_contract should document input_contract and output_contract for generated agents.")


def _check_blueprints(blueprints: Any, gaps: list[str], warnings: list[str]) -> None:
    if not isinstance(blueprints, list) or not blueprints:
        gaps.append("agent_blueprints must be a non-empty list.")
        return

    blueprint_ids: list[str] = []
    for blueprint in blueprints:
        if not isinstance(blueprint, dict):
            gaps.append("agent_blueprints entries must be objects.")
            continue
        blueprint_id = str(blueprint.get("blueprint_id", ""))
        label = blueprint_id or "<unnamed-blueprint>"
        blueprint_ids.append(blueprint_id)
        missing = sorted(field for field in REQUIRED_BLUEPRINT_FIELDS if not blueprint.get(field))
        if missing:
            gaps.append(f"Blueprint {label} is missing fields: {', '.join(missing)}.")
        if not _non_empty_list(blueprint.get("creation_gates")):
            gaps.append(f"Blueprint {label} needs creation_gates.")
        if not _non_empty_list(blueprint.get("validation_commands")):
            gaps.append(f"Blueprint {label} needs validation_commands.")
        if not _non_empty_list(blueprint.get("docs_targets")):
            warnings.append(f"Blueprint {label} has no docs_targets.")

    duplicated = sorted({blueprint_id for blueprint_id in blueprint_ids if blueprint_ids.count(blueprint_id) > 1 and blueprint_id})
    for blueprint_id in duplicated:
        gaps.append(f"Duplicate blueprint_id '{blueprint_id}'.")


def _check_creation_pipeline(pipeline: Any, gaps: list[str]) -> None:
    if not isinstance(pipeline, list) or len(pipeline) < 5:
        gaps.append("creation_pipeline must have at least five ordered steps.")
        return
    step_ids = [step.get("step_id") for step in pipeline if isinstance(step, dict)]
    for required in ("intake", "blueprint_select", "spec_write", "validation", "registry_update"):
        if required not in step_ids:
            gaps.append(f"creation_pipeline is missing step_id '{required}'.")


def _check_patterns(patterns: Any, gaps: list[str], warnings: list[str]) -> None:
    if not isinstance(patterns, list) or not patterns:
        gaps.append("orchestration_patterns must be a non-empty list.")
        return

    pattern_ids: list[str] = []
    for pattern in patterns:
        if not isinstance(pattern, dict):
            gaps.append("orchestration_patterns entries must be objects.")
            continue
        pattern_id = str(pattern.get("pattern_id", ""))
        label = pattern_id or "<unnamed-pattern>"
        pattern_ids.append(pattern_id)
        missing = sorted(field for field in REQUIRED_PATTERN_FIELDS if not pattern.get(field))
        if missing:
            gaps.append(f"Pattern {label} is missing fields: {', '.join(missing)}.")
        for contract_field in ("state_contract", "handoff_contract", "observability_contract", "failure_policy"):
            if contract_field in pattern and not isinstance(pattern[contract_field], dict):
                gaps.append(f"Pattern {label}.{contract_field} must be an object.")
        if not _non_empty_list(pattern.get("required_gates")):
            warnings.append(f"Pattern {label} has no required_gates.")

    missing_patterns = sorted(REQUIRED_PATTERN_IDS - set(pattern_ids))
    if missing_patterns:
        gaps.append(f"orchestration_patterns is missing required patterns: {', '.join(missing_patterns)}.")
    duplicated = sorted({pattern_id for pattern_id in pattern_ids if pattern_ids.count(pattern_id) > 1 and pattern_id})
    for pattern_id in duplicated:
        gaps.append(f"Duplicate pattern_id '{pattern_id}'.")


def _check_controls(controls: Any, gaps: list[str]) -> None:
    if not isinstance(controls, list) or not controls:
        gaps.append("orchestration_controls must be a non-empty list.")
        return
    control_ids = {control.get("control_id") for control in controls if isinstance(control, dict)}
    missing = sorted(REQUIRED_CONTROL_IDS - control_ids)
    if missing:
        gaps.append(f"orchestration_controls is missing required controls: {', '.join(missing)}.")
    for control in controls:
        if not isinstance(control, dict):
            gaps.append("orchestration_controls entries must be objects.")
            continue
        label = control.get("control_id") or "<unnamed-control>"
        if not _non_empty_string(control.get("rule")):
            gaps.append(f"Control {label} is missing rule.")
        if not _non_empty_list(control.get("verification")):
            gaps.append(f"Control {label} is missing verification.")


def _check_lifecycle_gates(gates: Any, gaps: list[str]) -> None:
    if not isinstance(gates, list) or not gates:
        gaps.append("lifecycle_gates must be a non-empty list.")
        return
    gate_ids = {gate.get("gate_id") for gate in gates if isinstance(gate, dict)}
    missing = sorted(REQUIRED_GATE_IDS - gate_ids)
    if missing:
        gaps.append(f"lifecycle_gates is missing required gates: {', '.join(missing)}.")


def _check_validation_commands(commands: Any, gaps: list[str]) -> None:
    if not _non_empty_list(commands):
        gaps.append("validation_commands must be a non-empty list.")
        return
    command_text = "\n".join(str(command) for command in commands)
    for required in ("check-agent-orchestration", "list-agents", "inspect-agent"):
        if required not in command_text:
            gaps.append(f"validation_commands must include {required}.")


def _string_list(value: Any) -> list[str]:
    if not isinstance(value, list | tuple):
        return []
    return [item for item in value if isinstance(item, str)]


def _non_empty_list(value: Any) -> bool:
    return isinstance(value, list) and bool(value)


def _non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())
