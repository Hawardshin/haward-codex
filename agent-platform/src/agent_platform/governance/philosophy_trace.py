"""Validate that operating philosophy is connected to executable structure."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_TARGET_TYPES = {
    "agent",
    "config",
    "dashboard",
    "docs",
    "evaluation",
    "history",
    "philosophy",
    "policy",
    "prompt",
    "project",
    "requirement",
    "spec",
    "tool",
    "workflow",
}


def load_philosophy_traceability(path: Path) -> JsonMap:
    """Load the philosophy traceability registry."""

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def check_philosophy_traceability(config: JsonMap, repo_root: Path) -> JsonMap:
    """Check principle-to-structure traceability.

    The checker does not execute every validation command. It proves the
    traceability registry is complete enough for workspace-health and close-out
    evaluation to know which executable structures carry each principle.
    """

    gaps: list[str] = []
    warnings: list[str] = []

    required_ids = _string_set(config.get("required_principle_ids"), "required_principle_ids", gaps)
    principles = config.get("principles")
    if not isinstance(principles, list) or not principles:
        gaps.append("principles must be a non-empty list.")
        principles = []

    seen_ids: set[str] = set()
    for index, principle in enumerate(principles, start=1):
        label = f"principles[{index}]"
        if not isinstance(principle, dict):
            gaps.append(f"{label} must be an object.")
            continue

        principle_id = _required_string(principle, "id", label, gaps)
        if principle_id:
            if principle_id in seen_ids:
                gaps.append(f"{label}.id is duplicated: {principle_id}.")
            seen_ids.add(principle_id)

        _required_string(principle, "title", label, gaps)
        _check_path_items(principle.get("philosophy_sources"), f"{label}.philosophy_sources", repo_root, gaps)
        _check_execution_targets(principle.get("execution_targets"), f"{label}.execution_targets", repo_root, gaps)
        _check_validation_targets(principle.get("validation_targets"), f"{label}.validation_targets", gaps)

    missing_required = sorted(required_ids - seen_ids)
    if missing_required:
        gaps.append(f"Missing required philosophy principle mappings: {', '.join(missing_required)}.")

    extra_ids = sorted(seen_ids - required_ids)
    if extra_ids:
        warnings.append(f"Mapped principle ids are not listed in required_principle_ids: {', '.join(extra_ids)}.")

    status = "ready" if not gaps else "rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "Philosophy must not remain a standalone essay; each principle needs source text, execution targets, and validation handles.",
        "checks": {
            "required_principles_count": len(required_ids),
            "mapped_principles_count": len(seen_ids),
            "allowed_target_types_count": len(ALLOWED_TARGET_TYPES),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve philosophy traceability gap: {gap}" for gap in gaps],
    }


def _check_path_items(value: Any, label: str, repo_root: Path, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return

    for index, item in enumerate(value, start=1):
        item_label = f"{label}[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        path = _required_string(item, "path", item_label, gaps)
        if path and not (repo_root / path).exists():
            gaps.append(f"{item_label}.path does not exist: {path}.")


def _check_execution_targets(value: Any, label: str, repo_root: Path, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label} must be a non-empty list.")
        return

    for index, item in enumerate(value, start=1):
        item_label = f"{label}[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        path = _required_string(item, "path", item_label, gaps)
        target_type = _required_string(item, "target_type", item_label, gaps)
        _required_string(item, "role", item_label, gaps)
        if path and not (repo_root / path).exists():
            gaps.append(f"{item_label}.path does not exist: {path}.")
        if target_type and target_type not in ALLOWED_TARGET_TYPES:
            gaps.append(f"{item_label}.target_type must be one of {', '.join(sorted(ALLOWED_TARGET_TYPES))}: {target_type}.")


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
