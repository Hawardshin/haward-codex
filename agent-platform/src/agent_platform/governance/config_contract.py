"""Validate that shared JSON config files are self-documenting."""

from __future__ import annotations

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
}

REQUIRED_READER_GUIDE_FIELDS = {"summary", "how_to_read", "owner", "last_reviewed", "update_triggers"}
REQUIRED_REFERENCE_FIELDS = {"id", "title", "source_type", "used_for", "last_checked"}
REQUIRED_STRUCTURE_RULE_FIELDS = {"id", "rule", "reason", "applies_to"}
REQUIRED_FIELD_GUIDE_FIELDS = {"field", "meaning", "required"}


def check_config_contract(config: JsonMap, path: str = "") -> JsonMap:
    """Return whether a settings file explains its references and structure in-place."""

    gaps: list[str] = []
    warnings: list[str] = []
    label = path or _optional_string(config.get("name", "config"), "name")

    missing_top_fields = sorted(REQUIRED_TOP_LEVEL_FIELDS - set(config))
    if missing_top_fields:
        gaps.append(f"{label}: missing top-level self-documenting fields: {', '.join(missing_top_fields)}.")

    _check_reader_guide(config.get("reader_guide"), label, gaps)
    _check_reference_links(config.get("reference_links"), label, gaps, warnings)
    _check_structure_rules(config.get("structure_rules"), label, gaps)
    _check_field_guide(config.get("field_guide"), label, gaps)

    status = "self_documenting" if not gaps else "documentation_contract_required"

    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "A shared config file must explain its purpose, references, structure rules, and important fields inside the file itself.",
        "checks": {
            "top_level_fields_count": len(config),
            "reference_links_count": _safe_len(config.get("reference_links")),
            "structure_rules_count": _safe_len(config.get("structure_rules")),
            "field_guide_count": _safe_len(config.get("field_guide")),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve config contract gap: {gap}" for gap in gaps],
    }


def _check_reader_guide(value: Any, label: str, gaps: list[str]) -> None:
    if not isinstance(value, dict):
        gaps.append(f"{label}: reader_guide must be an object.")
        return
    missing = sorted(REQUIRED_READER_GUIDE_FIELDS - set(value))
    if missing:
        gaps.append(f"{label}: reader_guide missing fields: {', '.join(missing)}.")
    if not _non_empty_string(value.get("summary")):
        gaps.append(f"{label}: reader_guide.summary must explain the config in plain language.")
    if not _list_of_non_empty_strings(value.get("how_to_read")):
        gaps.append(f"{label}: reader_guide.how_to_read must list how a human or agent should read this file.")
    if not _list_of_non_empty_strings(value.get("update_triggers")):
        gaps.append(f"{label}: reader_guide.update_triggers must list when to update this file.")


def _check_reference_links(value: Any, label: str, gaps: list[str], warnings: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label}: reference_links must be a non-empty list.")
        return

    for index, item in enumerate(value, start=1):
        item_label = f"{label}: reference_links[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        missing = sorted(REQUIRED_REFERENCE_FIELDS - set(item))
        if missing:
            gaps.append(f"{item_label} missing fields: {', '.join(missing)}.")
        if not (_non_empty_string(item.get("url")) or _non_empty_string(item.get("path"))):
            gaps.append(f"{item_label} must include url or path.")
        if not _list_of_non_empty_strings(item.get("used_for")):
            gaps.append(f"{item_label}.used_for must be a non-empty list.")
        if _non_empty_string(item.get("url")) and not _non_empty_string(item.get("last_checked")):
            gaps.append(f"{item_label} external URL needs last_checked.")
        if item.get("source_type") == "social":
            warnings.append(f"{item_label} is a social source; use it as discovery or adoption signal, not proof.")


def _check_structure_rules(value: Any, label: str, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label}: structure_rules must be a non-empty list.")
        return

    for index, item in enumerate(value, start=1):
        item_label = f"{label}: structure_rules[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        missing = sorted(REQUIRED_STRUCTURE_RULE_FIELDS - set(item))
        if missing:
            gaps.append(f"{item_label} missing fields: {', '.join(missing)}.")
        if not _non_empty_string(item.get("rule")):
            gaps.append(f"{item_label}.rule must be non-empty.")


def _check_field_guide(value: Any, label: str, gaps: list[str]) -> None:
    if not isinstance(value, list) or not value:
        gaps.append(f"{label}: field_guide must be a non-empty list.")
        return

    fields_seen = set()
    for index, item in enumerate(value, start=1):
        item_label = f"{label}: field_guide[{index}]"
        if not isinstance(item, dict):
            gaps.append(f"{item_label} must be an object.")
            continue
        missing = sorted(REQUIRED_FIELD_GUIDE_FIELDS - set(item))
        if missing:
            gaps.append(f"{item_label} missing fields: {', '.join(missing)}.")
        field_name = item.get("field")
        if not _non_empty_string(field_name):
            gaps.append(f"{item_label}.field must be non-empty.")
        elif field_name in fields_seen:
            gaps.append(f"{item_label}.field is duplicated: {field_name}.")
        else:
            fields_seen.add(field_name)
        if not _non_empty_string(item.get("meaning")):
            gaps.append(f"{item_label}.meaning must be non-empty.")
        if not isinstance(item.get("required"), bool):
            gaps.append(f"{item_label}.required must be a bool.")


def _non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _list_of_non_empty_strings(value: Any) -> bool:
    return isinstance(value, list) and bool(value) and all(_non_empty_string(item) for item in value)


def _safe_len(value: Any) -> int:
    return len(value) if isinstance(value, list) else 0


def _optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value
