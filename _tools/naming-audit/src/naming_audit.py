"""Audit repository naming conventions against the workspace naming policy."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

KEBAB_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
UNDERSCORE_KEBAB_RE = re.compile(r"^_[a-z0-9]+(-[a-z0-9]+)*$")
DOT_KEBAB_RE = re.compile(r"^\.[a-z0-9]+(-[a-z0-9]+)*$")
SNAKE_RE = re.compile(r"^[a-z][a-z0-9_]*$")
DATE_SLUG_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*$")
DOC_NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*(\.(ko|en))?\.md$")
CONFIG_NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*\.json$")


def audit_naming(repo_root: Path, policy_path: Path | None = None) -> JsonMap:
    repo_root = repo_root.resolve()
    policy_path = policy_path or repo_root / "_ops" / "naming" / "naming-policy.json"
    policy = _read_json(policy_path)
    project_registry = _read_json(repo_root / "_ops" / "projects" / "registry.json")
    root_policy = _read_json(repo_root / "_ops" / "projects" / "root-structure-policy.json")

    gaps: list[str] = []
    warnings: list[str] = []
    checked = {
        "root_projects": 0,
        "reserved_operational_dirs": 0,
        "runtime_adapter_dirs": 0,
        "tools": 0,
        "skills": 0,
        "docs": 0,
        "specs": 0,
        "python_source": 0,
        "config_files": 0,
        "config_ids": 0,
    }

    _check_project_names(project_registry, gaps, checked)
    _check_named_items(root_policy.get("reserved_operational_dirs", []), "reserved operational directory", UNDERSCORE_KEBAB_RE, gaps, checked, "reserved_operational_dirs")
    _check_named_items(root_policy.get("runtime_adapter_dirs", []), "runtime adapter directory", DOT_KEBAB_RE, gaps, checked, "runtime_adapter_dirs")
    _check_child_dirs(repo_root / "_tools", "tool folder", KEBAB_RE, gaps, checked, "tools")
    _check_child_dirs(repo_root / "_skills", "skill folder", KEBAB_RE, gaps, checked, "skills")
    _check_docs(repo_root / "_docs", gaps, checked, policy)
    _check_specs(repo_root, project_registry, gaps, checked)
    _check_python_source(repo_root, gaps, checked, policy)
    _check_configs(repo_root, gaps, checked, policy)

    status = "clean" if not gaps else "naming_rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "repo_root": str(repo_root),
        "policy_path": str(policy_path),
        "checked": checked,
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve naming gap: {gap}" for gap in gaps],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit workspace naming conventions.")
    parser.add_argument("--repo-root", default=".", help="Repository root. Defaults to current directory.")
    parser.add_argument("--policy", default="", help="Optional naming policy JSON path.")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 when naming gaps are found.")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    policy = Path(args.policy) if args.policy else None
    report = audit_naming(repo_root, policy)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if args.check and report["requires_rework"] else 0


def _check_project_names(registry: JsonMap, gaps: list[str], checked: JsonMap) -> None:
    for project in registry.get("projects", []):
        name = str(project.get("name", "")).strip()
        root = _root_name(str(project.get("path", name)))
        checked["root_projects"] += 1
        if not KEBAB_RE.fullmatch(name):
            gaps.append(f"Project name must be kebab-case: {name}")
        if not KEBAB_RE.fullmatch(root):
            gaps.append(f"Project root path must be kebab-case: {project.get('path')}")
        if name and root and name != root:
            gaps.append(f"Project name and root folder should match: name={name}, root={root}")


def _check_named_items(
    items: list[JsonMap],
    label: str,
    pattern: re.Pattern[str],
    gaps: list[str],
    checked: JsonMap,
    counter: str,
) -> None:
    for item in items:
        name = str(item.get("name", "")).strip()
        checked[counter] += 1
        if not pattern.fullmatch(name):
            gaps.append(f"{label} has invalid name: {name}")


def _check_child_dirs(
    parent: Path,
    label: str,
    pattern: re.Pattern[str],
    gaps: list[str],
    checked: JsonMap,
    counter: str,
) -> None:
    if not parent.exists():
        return
    for path in sorted(parent.iterdir()):
        if not path.is_dir() or path.name.startswith("."):
            continue
        checked[counter] += 1
        if not pattern.fullmatch(path.name):
            gaps.append(f"{label} must be kebab-case: {path.relative_to(parent.parent).as_posix()}")


def _check_docs(docs_root: Path, gaps: list[str], checked: JsonMap, policy: JsonMap) -> None:
    allowed = {item["name"] for item in policy.get("exceptions", [])}
    if not docs_root.exists():
        return
    for path in sorted(docs_root.rglob("*.md")):
        checked["docs"] += 1
        if path.name in allowed:
            continue
        if not DOC_NAME_RE.fullmatch(path.name):
            gaps.append(f"Docs Markdown filename must be lower-kebab with optional language suffix: {path.relative_to(docs_root.parent).as_posix()}")


def _check_specs(repo_root: Path, registry: JsonMap, gaps: list[str], checked: JsonMap) -> None:
    spec_roots = [repo_root / "_specs" / "workspace-platform"]
    for project in registry.get("projects", []):
        spec_roots.append(repo_root / str(project.get("path", "")).strip("/") / "specs")

    for spec_root in spec_roots:
        if not spec_root.exists():
            continue
        for path in sorted(spec_root.iterdir()):
            if not path.is_dir():
                continue
            checked["specs"] += 1
            if not DATE_SLUG_RE.fullmatch(path.name):
                gaps.append(f"Spec directory must use YYYY-MM-DD-lower-kebab: {path.relative_to(repo_root).as_posix()}")


def _check_python_source(repo_root: Path, gaps: list[str], checked: JsonMap, policy: JsonMap) -> None:
    allowed = {item["name"] for item in policy.get("exceptions", [])}
    src_roots = [path for path in repo_root.rglob("src") if path.is_dir() and _is_source_root(path)]

    for src_root in sorted(src_roots):
        for path in sorted(src_root.rglob("*.py")):
            if any(part == "__pycache__" for part in path.parts):
                continue
            checked["python_source"] += 1
            if path.name in allowed:
                continue
            if not SNAKE_RE.fullmatch(path.stem):
                gaps.append(f"Python module filename must be snake_case: {path.relative_to(repo_root).as_posix()}")
        for path in sorted(src_root.rglob("*")):
            if not path.is_dir() or path.name == "__pycache__":
                continue
            checked["python_source"] += 1
            if not SNAKE_RE.fullmatch(path.name):
                gaps.append(f"Python package directory must be snake_case: {path.relative_to(repo_root).as_posix()}")


def _check_configs(repo_root: Path, gaps: list[str], checked: JsonMap, policy: JsonMap) -> None:
    allowed = {item["name"] for item in policy.get("exceptions", [])}
    config_roots = [
        repo_root / "agent-platform" / "configs",
        repo_root / "_ops" / "projects",
        repo_root / "_ops" / "naming",
        repo_root / "_ops" / "assistant-runtimes",
        repo_root / "_ops" / "installations",
    ]
    for config_root in config_roots:
        if not config_root.exists():
            continue
        for path in sorted(config_root.rglob("*.json")):
            checked["config_files"] += 1
            if path.name not in allowed and not CONFIG_NAME_RE.fullmatch(path.name):
                gaps.append(f"Config filename must be lower-kebab: {path.relative_to(repo_root).as_posix()}")
            data = _read_json(path)
            _check_config_identifier(path, "name", data.get("name"), repo_root, gaps, checked)
            _check_config_identifier(path, "id", data.get("id"), repo_root, gaps, checked)


def _check_config_identifier(path: Path, field: str, value: Any, repo_root: Path, gaps: list[str], checked: JsonMap) -> None:
    if value is None:
        return
    checked["config_ids"] += 1
    if not isinstance(value, str) or not KEBAB_RE.fullmatch(value):
        gaps.append(f"Config top-level {field} must be lower-kebab: {path.relative_to(repo_root).as_posix()}")


def _is_source_root(path: Path) -> bool:
    return any(part in {"_tools", "agent-platform", "presentation-agent"} for part in path.parts)


def _root_name(value: str) -> str:
    return value.strip().strip("/").split("/", 1)[0]


def _read_json(path: Path) -> JsonMap:
    return json.loads(path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    raise SystemExit(main())
