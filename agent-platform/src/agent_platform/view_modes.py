"""View mode registry helpers."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


REQUIRED_MODE_IDS = {"user", "developer", "superadmin_developer"}

REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "name",
    "purpose",
    "reader_guide",
    "reference_links",
    "structure_rules",
    "field_guide",
    "mode_boundary",
    "default_mode",
    "modes",
    "selection_rules",
}

REQUIRED_MODE_FIELDS = {
    "id",
    "label",
    "intent",
    "audience",
    "visibility_rules",
    "allowed_sections",
    "must_not",
    "security_notes",
}

REQUIRED_VISIBILITY_FIELDS = {"foreground", "collapse", "hide_by_default", "guard"}
REQUIRED_MODE_BOUNDARY_FIELDS = {"view_mode", "install_mode", "work_mode", "rule"}
REQUIRED_SECTIONS = {"overview", "projects", "history", "documents"}
SUPERADMIN_REQUIRED_SECTIONS = {
    "overview",
    "projects",
    "history",
    "structure",
    "documents",
    "requirements",
    "agents",
}


def load_view_mode_registry(path: Path) -> dict[str, Any]:
    """Load a view mode registry JSON file."""

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise ValueError("View mode registry must be a JSON object.")
    return data


def list_view_modes(registry: dict[str, Any]) -> list[dict[str, str]]:
    """Return compact view mode records."""

    return [
        {
            "id": mode["id"],
            "label": mode["label"],
            "intent": mode["intent"],
        }
        for mode in _mode_records(registry)
    ]


def show_view_mode(registry: dict[str, Any], mode_id: str) -> dict[str, Any]:
    """Return one view mode by id."""

    for mode in _mode_records(registry):
        if mode.get("id") == mode_id:
            return mode
    raise ValueError(f"Unknown view mode '{mode_id}'.")


def check_view_mode_registry(registry: dict[str, Any]) -> dict[str, Any]:
    """Validate the registry shape and user/developer/superadmin split."""

    gaps: list[str] = []
    warnings: list[str] = []

    missing = sorted(REQUIRED_TOP_LEVEL_FIELDS - set(registry))
    if missing:
        gaps.append(f"Missing top-level fields: {', '.join(missing)}.")

    _check_mode_boundary(registry, gaps)

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

        _check_visibility_rules(mode, mode_id or str(index), gaps)
        _check_allowed_sections(mode, mode_id or str(index), gaps, warnings)
        _check_string_lists(mode, mode_id or str(index), gaps)

    if set(mode_ids) != REQUIRED_MODE_IDS:
        gaps.append(
            "View mode ids must be exactly: "
            f"{', '.join(sorted(REQUIRED_MODE_IDS))}. Found: {', '.join(sorted(mode_ids))}."
        )
    if len(mode_ids) != len(set(mode_ids)):
        gaps.append("View mode ids must be unique.")

    default_mode = registry.get("default_mode")
    if default_mode not in mode_ids:
        gaps.append("default_mode must match one modes[].id.")
    if default_mode != "superadmin_developer":
        warnings.append("Current default_mode should stay superadmin_developer until the owner changes the operating default.")

    selection_rules = registry.get("selection_rules")
    if not isinstance(selection_rules, list) or not selection_rules:
        gaps.append("selection_rules must be a non-empty list.")
    elif not any("install_mode" in str(rule) and "work_mode" in str(rule) for rule in selection_rules):
        warnings.append("selection_rules should explicitly keep view_mode separate from install_mode and work_mode.")

    return {
        "status": "ready" if not gaps else "rework_required",
        "requires_rework": bool(gaps),
        "checks": {
            "mode_count": len(mode_ids),
            "mode_ids": mode_ids,
            "default_mode": default_mode,
            "required_mode_ids": sorted(REQUIRED_MODE_IDS),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _check_mode_boundary(registry: dict[str, Any], gaps: list[str]) -> None:
    boundary = registry.get("mode_boundary")
    if not isinstance(boundary, dict):
        gaps.append("mode_boundary must be an object.")
        return
    missing = sorted(REQUIRED_MODE_BOUNDARY_FIELDS - set(boundary))
    if missing:
        gaps.append(f"mode_boundary is missing fields: {', '.join(missing)}.")


def _check_visibility_rules(mode: dict[str, Any], mode_id: str, gaps: list[str]) -> None:
    rules = mode.get("visibility_rules")
    if not isinstance(rules, dict):
        gaps.append(f"mode {mode_id}: visibility_rules must be an object.")
        return

    missing = sorted(REQUIRED_VISIBILITY_FIELDS - set(rules))
    if missing:
        gaps.append(f"mode {mode_id}: visibility_rules missing fields: {', '.join(missing)}.")

    for field in REQUIRED_VISIBILITY_FIELDS:
        values = rules.get(field)
        if not isinstance(values, list):
            gaps.append(f"mode {mode_id}: visibility_rules.{field} must be a list.")
            continue
        if not all(isinstance(item, str) for item in values):
            gaps.append(f"mode {mode_id}: visibility_rules.{field} must contain only strings.")


def _check_allowed_sections(
    mode: dict[str, Any],
    mode_id: str,
    gaps: list[str],
    warnings: list[str],
) -> None:
    sections = mode.get("allowed_sections")
    if not isinstance(sections, list) or not sections:
        gaps.append(f"mode {mode_id}: allowed_sections must be a non-empty list.")
        return
    if not all(isinstance(section, str) for section in sections):
        gaps.append(f"mode {mode_id}: allowed_sections must contain only strings.")
        return

    missing_required = sorted(REQUIRED_SECTIONS - set(sections))
    if mode_id == "user" and missing_required:
        gaps.append(f"mode {mode_id}: user view must include sections: {', '.join(missing_required)}.")

    if mode_id == "superadmin_developer":
        missing_superadmin = sorted(SUPERADMIN_REQUIRED_SECTIONS - set(sections))
        if missing_superadmin:
            gaps.append(
                f"mode {mode_id}: superadmin developer view must include sections: "
                f"{', '.join(missing_superadmin)}."
            )
    if mode_id == "developer" and "requirements" not in sections:
        warnings.append("mode developer should include requirements for traceability work.")


def _check_string_lists(mode: dict[str, Any], mode_id: str, gaps: list[str]) -> None:
    for field in ("audience", "must_not", "security_notes"):
        values = mode.get(field)
        if not isinstance(values, list) or not values:
            gaps.append(f"mode {mode_id}: {field} must be a non-empty list.")
            continue
        if not all(isinstance(item, str) for item in values):
            gaps.append(f"mode {mode_id}: {field} must contain only strings.")


def _mode_records(registry: dict[str, Any]) -> list[dict[str, Any]]:
    modes = registry.get("modes", [])
    if not isinstance(modes, list):
        raise ValueError("modes must be a list.")
    return [mode for mode in modes if isinstance(mode, dict)]
