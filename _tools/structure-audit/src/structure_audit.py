"""Audit workspace structure against the project boundary policy."""

from __future__ import annotations

import argparse
import fnmatch
import json
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]


def audit_structure(repo_root: Path, policy_path: Path | None = None) -> JsonMap:
    """Return a deterministic root-structure audit report."""

    repo_root = repo_root.resolve()
    policy_path = policy_path or repo_root / "_ops" / "projects" / "root-structure-policy.json"
    policy = _read_json(policy_path)
    registry = _read_json(repo_root / policy["project_registry_path"])
    gitignore_text = _read_text(repo_root / ".gitignore")

    registered_projects = {
        _normalize_root_name(project.get("path", project.get("name", "")))
        for project in registry.get("projects", [])
    }
    registered_projects.discard("")
    reserved_dirs = {item["name"] for item in policy.get("reserved_operational_dirs", [])}
    local_only_dirs = {item["name"] for item in policy.get("local_only_dirs", [])}
    runtime_adapter_dirs = {item["name"] for item in policy.get("runtime_adapter_dirs", [])}
    generated_output_patterns = [item["pattern"] for item in policy.get("generated_output_dirs", [])]

    root_dirs = sorted(
        path.name
        for path in repo_root.iterdir()
        if path.is_dir() and path.name != ".git"
    )

    gaps: list[str] = []
    warnings: list[str] = []
    classifications = []
    project_inventories = []

    for name in root_dirs:
        classification = _classify_root_dir(
            name,
            registered_projects,
            reserved_dirs,
            local_only_dirs,
            runtime_adapter_dirs,
            generated_output_patterns,
        )
        classifications.append({"name": name, "class": classification})
        if classification == "unknown_root":
            gaps.append(
                f"Root directory '{name}' is neither a registered project, reserved operational folder, local-only folder, runtime adapter folder, nor generated output folder."
            )
        if classification == "local_only" and not _gitignore_mentions(gitignore_text, name):
            gaps.append(f"Local-only root directory '{name}' must be ignored in .gitignore.")

    for project in registry.get("projects", []):
        project_path = repo_root / project.get("path", "")
        if not project_path.exists():
            gaps.append(f"Registered project path does not exist: {project.get('path')}")
            continue
        if not (project_path / "README.md").exists():
            gaps.append(f"Registered project is missing README.md: {project.get('path')}")

    for item in policy.get("local_only_dirs", []):
        name = item["name"]
        if not _gitignore_mentions(gitignore_text, name):
            warnings.append(f"Local-only directory '{name}' is declared but not ignored in .gitignore.")

    for pattern in generated_output_patterns:
        if not _gitignore_mentions_pattern(gitignore_text, pattern):
            gaps.append(f"Generated output pattern '{pattern}' must be ignored in .gitignore.")

    for project in registry.get("projects", []):
        project_path_value = project.get("path", "")
        project_path = repo_root / project_path_value
        if not project_path.exists() or not project_path.is_dir():
            continue

        declared_dirs = _declared_project_top_dirs(project)
        top_dirs = sorted(path.name for path in project_path.iterdir() if path.is_dir())
        generated_dirs = []
        undocumented_dirs = []

        for name in top_dirs:
            if _is_generated_output_name(name, generated_output_patterns):
                generated_dirs.append(name)
                continue
            if name not in declared_dirs:
                undocumented_dirs.append(name)

        for name in undocumented_dirs:
            warnings.append(
                f"Project '{project.get('name', project_path_value)}' has undocumented top-level directory '{name}'. "
                "Add it to project_specific_home or mark it as generated output."
            )

        project_inventories.append(
            {
                "project": project.get("name", _normalize_root_name(project_path_value)),
                "path": project_path_value,
                "declared_top_level_dirs": declared_dirs,
                "actual_top_level_dirs": top_dirs,
                "generated_top_level_dirs": generated_dirs,
                "undocumented_top_level_dirs": undocumented_dirs,
            }
        )

    status = "clean" if not gaps else "structure_rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "repo_root": str(repo_root),
        "policy_path": str(policy_path),
        "checks": {
            "root_dirs_count": len(root_dirs),
            "registered_projects_count": len(registered_projects),
            "reserved_dirs_count": len(reserved_dirs),
            "local_only_dirs_count": len(local_only_dirs),
            "runtime_adapter_dirs_count": len(runtime_adapter_dirs),
            "generated_output_patterns_count": len(generated_output_patterns),
            "project_inventories_count": len(project_inventories),
        },
        "classifications": classifications,
        "project_inventories": project_inventories,
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve structure gap: {gap}" for gap in gaps],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit root-level workspace structure.")
    parser.add_argument("--repo-root", default=".", help="Repository root. Defaults to current directory.")
    parser.add_argument("--policy", default="", help="Optional policy JSON path.")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 when gaps are found.")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    policy = Path(args.policy) if args.policy else None
    report = audit_structure(repo_root, policy)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if args.check and report["requires_rework"] else 0


def _classify_root_dir(
    name: str,
    registered_projects: set[str],
    reserved_dirs: set[str],
    local_only_dirs: set[str],
    runtime_adapter_dirs: set[str],
    generated_output_patterns: list[str],
) -> str:
    if name in registered_projects:
        return "registered_project"
    if name in reserved_dirs:
        return "reserved_operational"
    if name in local_only_dirs:
        return "local_only"
    if name in runtime_adapter_dirs:
        return "runtime_adapter"
    if _is_generated_output_name(name, generated_output_patterns):
        return "generated_output"
    return "unknown_root"


def _normalize_root_name(value: str) -> str:
    return value.strip().strip("/").split("/", 1)[0]


def _gitignore_mentions(gitignore_text: str, name: str) -> bool:
    candidates = {name, f"{name}/", f"/{name}", f"/{name}/"}
    lines = {line.strip() for line in gitignore_text.splitlines() if line.strip() and not line.strip().startswith("#")}
    return bool(candidates.intersection(lines))


def _gitignore_mentions_pattern(gitignore_text: str, pattern: str) -> bool:
    lines = {line.strip() for line in gitignore_text.splitlines() if line.strip() and not line.strip().startswith("#")}
    normalized = pattern.strip()
    suffix = normalized.removeprefix("**/").strip("/")
    basename = suffix.rsplit("/", 1)[-1]
    candidates = {
        normalized,
        normalized.strip("/"),
        suffix,
        f"{suffix}/",
        f"/{suffix}/",
        basename,
        f"{basename}/",
        f"/{basename}/",
    }
    wildcard_suffix = Path(basename).suffix
    if wildcard_suffix:
        candidates.add(f"*{wildcard_suffix}")
    return bool(candidates.intersection(lines))


def _declared_project_top_dirs(project: JsonMap) -> list[str]:
    project_root = _normalize_root_name(project.get("path", project.get("name", "")))
    declared = set()
    for value in project.get("project_specific_home", []):
        path = value.strip().strip("/")
        if not path:
            continue
        if path == project_root:
            continue
        if path.startswith(f"{project_root}/"):
            path = path[len(project_root) + 1 :]
        declared.add(path.split("/", 1)[0])
    return sorted(declared)


def _is_generated_output_name(name: str, patterns: list[str]) -> bool:
    candidates = {name, f"{name}/"}
    for pattern in patterns:
        suffix = pattern.removeprefix("**/").strip("/")
        basename = suffix.rsplit("/", 1)[-1]
        pattern_candidates = {suffix, f"{suffix}/", basename, f"{basename}/"}
        if candidates.intersection(pattern_candidates):
            return True
        if any(fnmatch.fnmatch(candidate, pattern.removeprefix("**/")) for candidate in candidates):
            return True
    return False


def _read_json(path: Path) -> JsonMap:
    return json.loads(path.read_text(encoding="utf-8"))


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


if __name__ == "__main__":
    raise SystemExit(main())
