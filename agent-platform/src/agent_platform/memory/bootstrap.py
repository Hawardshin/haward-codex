"""Validate the repository memory bootstrap manifest."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_TIERS = {"hot", "warm", "cold"}
DEFAULT_HOT_LIMIT = 12


@dataclass(frozen=True)
class MemoryAnchor:
    """One durable memory file the agent can load or retrieve."""

    anchor_id: str
    path: str
    tier: str
    purpose: str
    required: bool = True
    load_order: int = 0

    @classmethod
    def from_dict(cls, data: JsonMap) -> "MemoryAnchor":
        return cls(
            anchor_id=_required_string(data, "id"),
            path=_required_string(data, "path"),
            tier=_required_string(data, "tier"),
            purpose=_required_string(data, "purpose"),
            required=_optional_bool(data.get("required", True), "required"),
            load_order=_optional_int(data.get("load_order", 0), "load_order"),
        )


@dataclass(frozen=True)
class MemoryBootstrapManifest:
    """Input manifest that defines what an agent should load at startup."""

    name: str
    schema_version: str
    purpose: str
    anchors: tuple[MemoryAnchor, ...]
    startup_sequence: tuple[str, ...] = ()
    required_anchor_ids: tuple[str, ...] = ()
    hot_context_limit: int = DEFAULT_HOT_LIMIT

    @classmethod
    def from_dict(cls, data: JsonMap) -> "MemoryBootstrapManifest":
        return cls(
            name=_required_string(data, "name"),
            schema_version=_required_string(data, "schema_version"),
            purpose=_required_string(data, "purpose"),
            anchors=tuple(MemoryAnchor.from_dict(item) for item in _list_of_maps(data.get("anchors", []), "anchors")),
            startup_sequence=_tuple_of_strings(data.get("startup_sequence", []), "startup_sequence"),
            required_anchor_ids=_tuple_of_strings(data.get("required_anchor_ids", []), "required_anchor_ids"),
            hot_context_limit=_optional_int(data.get("hot_context_limit", DEFAULT_HOT_LIMIT), "hot_context_limit"),
        )


def check_memory_bootstrap(manifest: MemoryBootstrapManifest, repo_root: Path) -> JsonMap:
    """Return whether memory bootstrap files are ready for a new agent session."""

    gaps = []
    warnings = []
    repo_root = repo_root.resolve()

    if not manifest.name.strip():
        gaps.append("Manifest name is missing.")
    if not manifest.schema_version.strip():
        gaps.append("Manifest schema_version is missing.")
    if not manifest.purpose.strip():
        gaps.append("Manifest purpose is missing.")
    if not manifest.anchors:
        gaps.append("Memory anchors are missing.")

    anchors_by_id = {anchor.anchor_id: anchor for anchor in manifest.anchors}
    if len(anchors_by_id) != len(manifest.anchors):
        gaps.append("Memory anchor IDs must be unique.")

    for anchor in manifest.anchors:
        gaps.extend(_validate_anchor(anchor, repo_root))

    for required_anchor_id in manifest.required_anchor_ids:
        if required_anchor_id not in anchors_by_id:
            gaps.append(f"Required anchor is missing from anchors: {required_anchor_id}.")

    for sequence_id in manifest.startup_sequence:
        if sequence_id not in anchors_by_id:
            gaps.append(f"Startup sequence references unknown anchor: {sequence_id}.")

    hot_anchors = [anchor for anchor in manifest.anchors if anchor.tier == "hot"]
    if not hot_anchors:
        gaps.append("At least one hot memory anchor is required.")
    if len(hot_anchors) > manifest.hot_context_limit:
        warnings.append(f"Hot memory anchor count exceeds limit {manifest.hot_context_limit}; move lower-priority anchors to warm or cold.")

    startup_order = _startup_order(manifest, anchors_by_id)
    status = "memory_bootstrap_required" if gaps else "ready_to_bootstrap"

    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "Do not rely on chat memory; load durable repository memory anchors before work.",
        "checks": {
            "anchors_count": len(manifest.anchors),
            "hot_count": len(hot_anchors),
            "warm_count": sum(1 for anchor in manifest.anchors if anchor.tier == "warm"),
            "cold_count": sum(1 for anchor in manifest.anchors if anchor.tier == "cold"),
            "required_anchor_count": len(manifest.required_anchor_ids),
            "startup_sequence_count": len(manifest.startup_sequence),
        },
        "startup_order": [
            {
                "id": anchor.anchor_id,
                "path": anchor.path,
                "tier": anchor.tier,
                "purpose": anchor.purpose,
            }
            for anchor in startup_order
        ],
        "hot_context_paths": [anchor.path for anchor in startup_order if anchor.tier == "hot"],
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve memory bootstrap gap: {gap}" for gap in gaps],
    }


def _validate_anchor(anchor: MemoryAnchor, repo_root: Path) -> list[str]:
    gaps = []

    if not anchor.anchor_id.strip():
        gaps.append("Memory anchor has an empty id.")
    if not anchor.path.strip():
        gaps.append(f"Memory anchor {anchor.anchor_id} has an empty path.")
    if anchor.tier not in ALLOWED_TIERS:
        gaps.append(f"Memory anchor {anchor.anchor_id} has unknown tier: {anchor.tier}.")
    if not anchor.purpose.strip():
        gaps.append(f"Memory anchor {anchor.anchor_id} purpose is missing.")
    if anchor.required and not (repo_root / anchor.path).exists():
        gaps.append(f"Required memory anchor path does not exist: {anchor.path}.")
    return gaps


def _startup_order(manifest: MemoryBootstrapManifest, anchors_by_id: dict[str, MemoryAnchor]) -> tuple[MemoryAnchor, ...]:
    ordered = [anchors_by_id[anchor_id] for anchor_id in manifest.startup_sequence if anchor_id in anchors_by_id]
    ordered_ids = {anchor.anchor_id for anchor in ordered}
    remaining = sorted(
        (anchor for anchor in manifest.anchors if anchor.anchor_id not in ordered_ids),
        key=lambda anchor: (anchor.tier != "hot", anchor.load_order, anchor.anchor_id),
    )
    return tuple(ordered + remaining)


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
    return value


def _optional_int(value: Any, field_name: str) -> int:
    if not isinstance(value, int):
        raise TypeError(f"{field_name} must be an integer.")
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
