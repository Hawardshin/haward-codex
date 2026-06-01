"""Installation mode registry helpers."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


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
    "dependency_policy",
    "allowed_actions",
    "must_not",
    "commands",
    "verification",
}

REQUIRED_COMMAND_FIELDS = {"id", "project", "purpose", "command"}


def load_install_mode_registry(path: Path) -> dict[str, Any]:
    """Load an installation mode registry JSON file."""

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise ValueError("Install mode registry must be a JSON object.")
    return data


def list_install_modes(registry: dict[str, Any]) -> list[dict[str, str]]:
    """Return a compact list of install modes."""

    return [
        {
            "id": mode["id"],
            "label": mode["label"],
            "intent": mode["intent"],
        }
        for mode in _mode_records(registry)
    ]


def show_install_mode(registry: dict[str, Any], mode_id: str) -> dict[str, Any]:
    """Return one install mode by id."""

    for mode in _mode_records(registry):
        if mode.get("id") == mode_id:
            return mode
    raise ValueError(f"Unknown install mode '{mode_id}'.")


def check_install_mode_registry(registry: dict[str, Any]) -> dict[str, Any]:
    """Validate the registry shape and user/developer install split."""

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

        commands = mode.get("commands")
        if not isinstance(commands, list) or not commands:
            gaps.append(f"mode {mode_id or index}: commands must be a non-empty list.")
            commands = []
        for command_index, command in enumerate(commands, start=1):
            if not isinstance(command, dict):
                gaps.append(f"mode {mode_id or index} command {command_index}: must be an object.")
                continue
            missing_command_fields = sorted(REQUIRED_COMMAND_FIELDS - set(command))
            if missing_command_fields:
                gaps.append(
                    f"mode {mode_id or index} command {command.get('id', command_index)}: "
                    f"missing fields: {', '.join(missing_command_fields)}."
                )

    if "user" not in mode_ids:
        gaps.append("A user install mode is required.")
    if "developer" not in mode_ids:
        gaps.append("A developer install mode is required.")
    if len(mode_ids) != len(set(mode_ids)):
        gaps.append("Install mode ids must be unique.")

    default_mode = registry.get("default_mode")
    if default_mode not in mode_ids:
        gaps.append("default_mode must match one modes[].id.")

    if registry.get("mode_boundary") and "work_mode" not in registry.get("mode_boundary", {}):
        warnings.append("mode_boundary should explain work_mode so install mode and work mode stay distinct.")

    return {
        "status": "ready" if not gaps else "rework_required",
        "requires_rework": bool(gaps),
        "checks": {
            "mode_count": len(mode_ids),
            "mode_ids": mode_ids,
            "default_mode": default_mode,
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _mode_records(registry: dict[str, Any]) -> list[dict[str, Any]]:
    modes = registry.get("modes", [])
    if not isinstance(modes, list):
        raise ValueError("modes must be a list.")
    return [mode for mode in modes if isinstance(mode, dict)]
