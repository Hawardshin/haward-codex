"""Check whether repository skills are installed and trigger-ready."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]


def load_skill_activation_registry(path: Path) -> JsonMap:
    """Load a skill activation registry."""

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def check_skill_activation(config: JsonMap, repo_root: Path) -> JsonMap:
    """Check source, install, trigger, and drift status for custom skills."""

    gaps: list[str] = []
    warnings: list[str] = []
    skills = config.get("skills")
    if not isinstance(skills, list) or not skills:
        gaps.append("skills must be a non-empty list.")
        skills = []

    installed_ready = 0
    source_ready = 0
    trigger_ready = 0
    drift_free = 0

    for index, skill in enumerate(skills, start=1):
        label = f"skills[{index}]"
        if not isinstance(skill, dict):
            gaps.append(f"{label} must be an object.")
            continue

        name = _required_string(skill, "name", label, gaps)
        source_path_text = _required_string(skill, "source_path", label, gaps)
        installed_path_text = _required_string(skill, "installed_path", label, gaps)
        auto_expected = skill.get("auto_activation_expected")
        if not isinstance(auto_expected, bool):
            gaps.append(f"{label}.auto_activation_expected must be a bool.")
            auto_expected = False

        trigger_examples = _string_list(skill.get("trigger_examples"), f"{label}.trigger_examples", gaps)
        if len(trigger_examples) >= 2:
            trigger_ready += 1
        else:
            gaps.append(f"{label}.trigger_examples must include at least two realistic trigger prompts.")

        _string_list(skill.get("negative_examples"), f"{label}.negative_examples", warnings, required=False)
        sync_files = _string_list(skill.get("sync_files"), f"{label}.sync_files", gaps)

        source_path = _resolve_path(source_path_text, repo_root)
        installed_path = _resolve_path(installed_path_text, repo_root)
        source_skill_md = source_path / "SKILL.md"
        installed_skill_md = installed_path / "SKILL.md"

        if not source_path.exists():
            gaps.append(f"{label}.source_path does not exist: {source_path_text}.")
            continue
        if not source_skill_md.exists():
            gaps.append(f"{label}.source_path is missing SKILL.md: {source_path_text}.")
            continue

        source_ready += 1
        frontmatter, parse_gap = _parse_frontmatter(source_skill_md.read_text(encoding="utf-8"))
        if parse_gap:
            gaps.append(f"{label}.SKILL.md {parse_gap}")
        else:
            _check_frontmatter(name, frontmatter, label, gaps)

        if auto_expected:
            if not installed_path.exists():
                gaps.append(f"{label}.installed_path missing for auto activation: {installed_path_text}.")
                continue
            if not installed_skill_md.exists():
                gaps.append(f"{label}.installed_path is missing SKILL.md: {installed_path_text}.")
                continue
            installed_ready += 1
            if _paths_match(source_path, installed_path, sync_files, warnings, label):
                drift_free += 1
            else:
                gaps.append(f"{label} installed copy is not in sync with source for one or more sync_files.")
        else:
            warnings.append(f"{label} is source-only; it will not auto-trigger unless explicitly installed or named.")

    status = "activation_ready" if not gaps else "activation_rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": (
            "A repository skill is not automatically useful until its source is valid, "
            "its trigger examples are clear, its installed Codex copy exists when auto activation is expected, "
            "and the installed copy has not drifted from source."
        ),
        "checks": {
            "skills_count": len(skills),
            "source_ready_count": source_ready,
            "installed_ready_count": installed_ready,
            "trigger_ready_count": trigger_ready,
            "drift_free_count": drift_free,
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve skill activation gap: {gap}" for gap in gaps]
        + [f"Consider skill activation warning: {warning}" for warning in warnings],
    }


def _resolve_path(path_text: str, repo_root: Path) -> Path:
    path = Path(path_text).expanduser()
    return path if path.is_absolute() else repo_root / path


def _parse_frontmatter(content: str) -> tuple[dict[str, str], str]:
    if not content.startswith("---"):
        return {}, "frontmatter is missing."
    match = re.match(r"^---\n(.*?)\n---\n?", content, re.DOTALL)
    if not match:
        return {}, "frontmatter format is invalid."
    frontmatter: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if not line.strip():
            continue
        if ":" not in line:
            return {}, f"frontmatter line is invalid: {line}."
        key, value = line.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip('"').strip("'")
    return frontmatter, ""


def _check_frontmatter(expected_name: str, frontmatter: dict[str, str], label: str, gaps: list[str]) -> None:
    name = frontmatter.get("name", "").strip()
    description = frontmatter.get("description", "").strip()
    if name != expected_name:
        gaps.append(f"{label}.SKILL.md frontmatter name must match registry name: {expected_name}.")
    if len(description) < 80:
        gaps.append(f"{label}.SKILL.md description is too short for reliable automatic triggering.")
    lowered = description.lower()
    if "use when" not in lowered and "use for" not in lowered:
        gaps.append(f"{label}.SKILL.md description must include 'Use when' or 'Use for'.")


def _paths_match(source_path: Path, installed_path: Path, sync_files: list[str], warnings: list[str], label: str) -> bool:
    matched = True
    for relative in sync_files:
        source_file = source_path / relative
        installed_file = installed_path / relative
        if not source_file.exists():
            warnings.append(f"{label}.sync_files item missing from source: {relative}.")
            matched = False
            continue
        if not installed_file.exists():
            warnings.append(f"{label}.sync_files item missing from installed copy: {relative}.")
            matched = False
            continue
        if _sha256(source_file) != _sha256(installed_file):
            warnings.append(f"{label}.sync_files item differs between source and installed copy: {relative}.")
            matched = False
    return matched


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _required_string(source: JsonMap, field_name: str, label: str, gaps: list[str]) -> str:
    value = source.get(field_name)
    if not isinstance(value, str) or not value.strip():
        gaps.append(f"{label}.{field_name} must be a non-empty string.")
        return ""
    return value.strip()


def _string_list(value: Any, label: str, gaps: list[str], required: bool = True) -> list[str]:
    if value is None and not required:
        return []
    if not isinstance(value, list) or (required and not value):
        gaps.append(f"{label} must be a non-empty list.")
        return []
    result: list[str] = []
    for index, item in enumerate(value, start=1):
        if not isinstance(item, str) or not item.strip():
            gaps.append(f"{label}[{index}] must be a non-empty string.")
            continue
        result.append(item.strip())
    return result
