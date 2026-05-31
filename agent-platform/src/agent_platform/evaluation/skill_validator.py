"""Validate repository-managed Codex skill source folders."""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

MAX_SKILL_NAME_LENGTH = 64
MAX_SKILL_MD_LINES = 500
DISALLOWED_SKILL_DOCS = {
    "README.md",
    "INSTALLATION_GUIDE.md",
    "QUICK_REFERENCE.md",
    "CHANGELOG.md",
}


@dataclass(frozen=True)
class SkillValidationInput:
    """Input for validating a custom skill before close-out or installation."""

    skill_path: str
    intended_use: str
    trigger_examples: tuple[str, ...] = ()
    validation_steps: tuple[str, ...] = ()
    forward_test_scenarios: tuple[str, ...] = ()
    improvement_ideas: tuple[str, ...] = ()
    known_gaps: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "SkillValidationInput":
        return cls(
            skill_path=_required_string(data, "skill_path"),
            intended_use=_required_string(data, "intended_use"),
            trigger_examples=_tuple_of_strings(data.get("trigger_examples", []), "trigger_examples"),
            validation_steps=_tuple_of_strings(data.get("validation_steps", []), "validation_steps"),
            forward_test_scenarios=_tuple_of_strings(data.get("forward_test_scenarios", []), "forward_test_scenarios"),
            improvement_ideas=_tuple_of_strings(data.get("improvement_ideas", []), "improvement_ideas"),
            known_gaps=_tuple_of_strings(data.get("known_gaps", []), "known_gaps"),
        )


def validate_skill_definition(validation_input: SkillValidationInput, repo_root: Path | None = None) -> JsonMap:
    """Return a deterministic validation report for a skill source folder."""

    root = repo_root if repo_root is not None else Path.cwd()
    skill_path = Path(validation_input.skill_path)
    if not skill_path.is_absolute():
        skill_path = root / skill_path
    skill_path = skill_path.resolve()

    gaps = list(validation_input.known_gaps)
    warnings: list[str] = []

    if not validation_input.skill_path.strip():
        gaps.append("Skill path is missing.")
    if not validation_input.intended_use.strip():
        gaps.append("Intended use is missing.")
    if len(validation_input.trigger_examples) < 2:
        gaps.append("At least two trigger examples are required.")
    if not validation_input.validation_steps:
        gaps.append("Validation steps are missing.")
    if not validation_input.forward_test_scenarios:
        gaps.append("Forward-test scenarios are missing.")
    if not validation_input.improvement_ideas:
        warnings.append("Improvement ideas are missing; record at least one next improvement or explain that none were found.")

    if not skill_path.exists() or not skill_path.is_dir():
        gaps.append(f"Skill folder does not exist: {validation_input.skill_path}.")
        return _report(validation_input, gaps, warnings, skill_path, {}, 0)

    try:
        relative_path = skill_path.relative_to(root.resolve())
    except ValueError:
        relative_path = skill_path

    relative_path_text = str(relative_path)
    if not (relative_path_text.startswith("_skills/") or "/skills/" in relative_path_text):
        gaps.append("Skill source should live under _skills/<skill-name>/ or the owning project's skills/ folder.")

    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        gaps.append("SKILL.md is missing.")
        return _report(validation_input, gaps, warnings, skill_path, {}, 0)

    content = skill_md.read_text(encoding="utf-8")
    frontmatter, body, parse_gap = _parse_frontmatter(content)
    if parse_gap:
        gaps.append(parse_gap)
    else:
        gaps.extend(_validate_frontmatter(frontmatter, skill_path.name))
        gaps.extend(_validate_body(body))
        warnings.extend(_body_warnings(body))

    disallowed = sorted(path.name for path in skill_path.iterdir() if path.name in DISALLOWED_SKILL_DOCS)
    if disallowed:
        gaps.append(f"Skill folder contains non-skill documentation files: {', '.join(disallowed)}.")

    line_count = len(content.splitlines())
    if line_count > MAX_SKILL_MD_LINES:
        gaps.append(f"SKILL.md is too long ({line_count} lines). Keep it under {MAX_SKILL_MD_LINES} lines and move detail to references/.")

    if not (skill_path / "agents" / "openai.yaml").exists():
        warnings.append("agents/openai.yaml is missing; add UI metadata unless the skill is intentionally source-only.")

    return _report(validation_input, gaps, warnings, skill_path, frontmatter, line_count)


def _report(
    validation_input: SkillValidationInput,
    gaps: list[str],
    warnings: list[str],
    skill_path: Path,
    frontmatter: dict[str, str],
    line_count: int,
) -> JsonMap:
    status = "rework_required" if gaps else "skill_ready"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "Skills are reusable capabilities and must include trigger clarity, validation, forward-testing, and an improvement loop.",
        "checks": {
            "skill_path": str(skill_path),
            "frontmatter_name": frontmatter.get("name", ""),
            "description_present": bool(frontmatter.get("description", "").strip()),
            "skill_md_line_count": line_count,
            "trigger_examples_count": len(validation_input.trigger_examples),
            "validation_steps_count": len(validation_input.validation_steps),
            "forward_test_scenarios_count": len(validation_input.forward_test_scenarios),
            "improvement_ideas_count": len(validation_input.improvement_ideas),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve skill gap: {gap}" for gap in gaps]
        + [f"Consider skill improvement: {warning}" for warning in warnings],
    }


def _parse_frontmatter(content: str) -> tuple[dict[str, str], str, str]:
    if not content.startswith("---"):
        return {}, "", "SKILL.md frontmatter is missing."
    match = re.match(r"^---\n(.*?)\n---\n?(.*)$", content, re.DOTALL)
    if not match:
        return {}, "", "SKILL.md frontmatter format is invalid."
    frontmatter: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if not line.strip():
            continue
        if ":" not in line:
            return {}, "", f"Invalid frontmatter line: {line}."
        key, value = line.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip('"').strip("'")
    return frontmatter, match.group(2), ""


def _validate_frontmatter(frontmatter: dict[str, str], folder_name: str) -> list[str]:
    gaps = []
    unexpected = set(frontmatter) - {"name", "description"}
    if unexpected:
        gaps.append(f"Unexpected SKILL.md frontmatter keys: {', '.join(sorted(unexpected))}.")
    name = frontmatter.get("name", "").strip()
    description = frontmatter.get("description", "").strip()
    if not name:
        gaps.append("Frontmatter name is missing.")
    elif not re.match(r"^[a-z0-9-]+$", name):
        gaps.append("Frontmatter name must use lowercase hyphen-case.")
    elif name.startswith("-") or name.endswith("-") or "--" in name:
        gaps.append("Frontmatter name cannot start/end with hyphen or contain consecutive hyphens.")
    elif len(name) > MAX_SKILL_NAME_LENGTH:
        gaps.append(f"Frontmatter name is too long; maximum is {MAX_SKILL_NAME_LENGTH} characters.")
    elif name != folder_name:
        gaps.append("Frontmatter name must match the skill folder name.")

    if not description:
        gaps.append("Frontmatter description is missing.")
    elif "[TODO" in description or "TODO" in description:
        gaps.append("Frontmatter description still contains TODO text.")
    else:
        if len(description) < 80:
            gaps.append("Frontmatter description is too short to reliably trigger the skill.")
        if "when" not in description.lower() and "use for" not in description.lower():
            gaps.append("Frontmatter description must include when to use the skill.")
    return gaps


def _validate_body(body: str) -> list[str]:
    gaps = []
    stripped = body.strip()
    if not stripped:
        gaps.append("SKILL.md body is missing.")
    if "TODO" in body:
        gaps.append("SKILL.md body still contains TODO text.")
    return gaps


def _body_warnings(body: str) -> list[str]:
    warnings = []
    if "validation" not in body.lower() and "validate" not in body.lower():
        warnings.append("SKILL.md should mention how the skill is validated.")
    if "forward" not in body.lower() and "test" not in body.lower():
        warnings.append("SKILL.md should mention forward-testing or realistic usage tests.")
    return warnings


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)
