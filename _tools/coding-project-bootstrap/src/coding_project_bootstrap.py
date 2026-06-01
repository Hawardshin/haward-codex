from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

PROJECT_NAME_RE = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")
REQUIRED_BLUEPRINT_FIELDS = {
    "id",
    "label",
    "registry_type",
    "purpose_template",
    "scope_template",
    "technology_stack",
    "official_docs",
    "directories",
    "files",
    "project_specific_home",
}


class BootstrapError(ValueError):
    """Raised when a coding project cannot be bootstrapped safely."""


@dataclass(frozen=True)
class FilePlan:
    path: Path
    content: str


@dataclass(frozen=True)
class BootstrapPlan:
    project_name: str
    blueprint_id: str
    target_dir: Path
    directories: tuple[Path, ...]
    files: tuple[FilePlan, ...]
    register: bool
    registry_path: Path
    registry_entry: JsonMap | None

    def to_json(self) -> JsonMap:
        return {
            "project_name": self.project_name,
            "blueprint_id": self.blueprint_id,
            "target_dir": self.target_dir.as_posix(),
            "register": self.register,
            "registry_path": self.registry_path.as_posix(),
            "directories": [path.as_posix() for path in self.directories],
            "files": [file_plan.path.as_posix() for file_plan in self.files],
            "registry_entry": self.registry_entry,
        }


def default_workspace_root() -> Path:
    return Path(__file__).resolve().parents[3]


def default_config_path() -> Path:
    return Path(__file__).resolve().parents[1] / "configs" / "blueprints.json"


def load_json(path: Path) -> JsonMap:
    with path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise BootstrapError(f"JSON root must be an object: {path}")
    return data


def write_json(path: Path, data: JsonMap) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def validate_config(config: JsonMap) -> list[str]:
    gaps: list[str] = []
    for field in ("reader_guide", "reference_links", "structure_rules", "field_guide", "blueprints"):
        if field not in config:
            gaps.append(f"Missing top-level field: {field}")
    blueprints = config.get("blueprints", [])
    if not isinstance(blueprints, list) or not blueprints:
        gaps.append("blueprints must be a non-empty list.")
        return gaps

    seen_ids: set[str] = set()
    for index, blueprint in enumerate(blueprints):
        prefix = f"blueprints[{index}]"
        if not isinstance(blueprint, dict):
            gaps.append(f"{prefix} must be an object.")
            continue
        missing = sorted(REQUIRED_BLUEPRINT_FIELDS - blueprint.keys())
        if missing:
            gaps.append(f"{prefix} missing fields: {', '.join(missing)}")
        blueprint_id = blueprint.get("id")
        if not isinstance(blueprint_id, str) or not blueprint_id:
            gaps.append(f"{prefix}.id must be a non-empty string.")
        elif blueprint_id in seen_ids:
            gaps.append(f"Duplicate blueprint id: {blueprint_id}")
        else:
            seen_ids.add(blueprint_id)
        for list_field in ("technology_stack", "official_docs", "directories", "files", "project_specific_home"):
            if not isinstance(blueprint.get(list_field), list):
                gaps.append(f"{prefix}.{list_field} must be a list.")
    return gaps


def blueprint_by_id(config: JsonMap, blueprint_id: str) -> JsonMap:
    for blueprint in config.get("blueprints", []):
        if isinstance(blueprint, dict) and blueprint.get("id") == blueprint_id:
            return blueprint
    available = ", ".join(sorted(str(item.get("id")) for item in config.get("blueprints", []) if isinstance(item, dict)))
    raise BootstrapError(f"Unknown blueprint {blueprint_id!r}. Available: {available}")


def render_template(text: str, variables: JsonMap) -> str:
    rendered = text
    for key, value in variables.items():
        rendered = rendered.replace("{{" + key + "}}", str(value))
    return rendered


def render_path(path_text: str, variables: JsonMap) -> Path:
    return Path(render_template(path_text, variables))


def project_title(project_name: str) -> str:
    return " ".join(part.capitalize() for part in project_name.split("-"))


def package_name(project_name: str) -> str:
    return project_name.replace("-", "_")


def java_package_path(project_name: str) -> str:
    return Path("local") / "workspace" / package_name(project_name)


def validate_project_name(project_name: str) -> None:
    if not PROJECT_NAME_RE.fullmatch(project_name):
        raise BootstrapError("Project name must be kebab-case, for example `my-python-agent`.")
    if project_name.startswith("_"):
        raise BootstrapError("Project names must not start with an underscore; underscore roots are reserved for workspace operations.")


def resolve_target_dir(workspace_root: Path, project_name: str, target_dir: str | None) -> Path:
    if target_dir:
        candidate = Path(target_dir)
        if not candidate.is_absolute():
            candidate = workspace_root / candidate
    else:
        candidate = workspace_root / project_name
    resolved = candidate.resolve()
    workspace = workspace_root.resolve()
    if workspace not in (resolved, *resolved.parents):
        raise BootstrapError("Target directory must stay inside the workspace root.")
    return resolved


def is_root_project_target(workspace_root: Path, target_dir: Path, project_name: str) -> bool:
    return target_dir.resolve() == (workspace_root / project_name).resolve()


def build_plan(
    *,
    workspace_root: Path,
    config: JsonMap,
    project_name: str,
    blueprint_id: str,
    target_dir: str | None = None,
    register: bool = False,
) -> BootstrapPlan:
    validate_project_name(project_name)
    gaps = validate_config(config)
    if gaps:
        raise BootstrapError("; ".join(gaps))

    blueprint = blueprint_by_id(config, blueprint_id)
    target = resolve_target_dir(workspace_root, project_name, target_dir)
    variables: JsonMap = {
        "project_name": project_name,
        "project_title": project_title(project_name),
        "package_name": package_name(project_name),
        "java_package_path": java_package_path(project_name).as_posix(),
        "blueprint_id": blueprint_id,
        "blueprint_label": blueprint["label"],
    }

    directory_texts = list(config.get("common_directories", [])) + list(blueprint.get("directories", []))
    directories = tuple(sorted({target / render_path(str(path), variables) for path in directory_texts}))

    files: list[FilePlan] = []
    files.extend(_common_files(target, blueprint, variables, config))
    for file_def in blueprint.get("files", []):
        if not isinstance(file_def, dict):
            raise BootstrapError(f"Blueprint {blueprint_id} has a non-object file definition.")
        path = target / render_path(str(file_def.get("path", "")), variables)
        content_lines = file_def.get("content", [])
        if not isinstance(content_lines, list):
            raise BootstrapError(f"File content for {path} must be a list of lines.")
        content = "\n".join(render_template(str(line), variables) for line in content_lines)
        if content:
            content += "\n"
        files.append(FilePlan(path, content))

    registry_path = workspace_root / "_ops" / "projects" / "registry.json"
    registry_entry = None
    if register:
        if not is_root_project_target(workspace_root, target, project_name):
            raise BootstrapError("--register is only allowed when target is the root project directory `<workspace>/<project-name>`.")
        registry_entry = _registry_entry(config, blueprint, variables)

    return BootstrapPlan(
        project_name=project_name,
        blueprint_id=blueprint_id,
        target_dir=target,
        directories=directories,
        files=tuple(files),
        register=register,
        registry_path=registry_path,
        registry_entry=registry_entry,
    )


def apply_plan(plan: BootstrapPlan, *, overwrite: bool = False) -> None:
    if plan.target_dir.exists() and any(plan.target_dir.iterdir()) and not overwrite:
        raise BootstrapError(f"Target directory is not empty: {plan.target_dir}")
    for directory in plan.directories:
        directory.mkdir(parents=True, exist_ok=True)
    for file_plan in plan.files:
        if file_plan.path.exists() and not overwrite:
            raise BootstrapError(f"Refusing to overwrite existing file: {file_plan.path}")
        file_plan.path.parent.mkdir(parents=True, exist_ok=True)
        file_plan.path.write_text(file_plan.content, encoding="utf-8")
    if plan.register and plan.registry_entry is not None:
        _register_project(plan.registry_path, plan.registry_entry)


def _common_files(target: Path, blueprint: JsonMap, variables: JsonMap, config: JsonMap) -> list[FilePlan]:
    stack = ", ".join(str(item) for item in blueprint.get("technology_stack", []))
    official_docs = "\n".join(f"- {item}" for item in blueprint.get("official_docs", []))
    commands = "\n".join(
        [
            "```bash",
            "# 1. Before implementation, run coding research for the selected stack.",
            "# 2. Add project-local commands here after dependencies are intentionally installed.",
            "```",
        ]
    )
    readme = f"""# {variables["project_title"]}

## Purpose

{render_template(str(blueprint["purpose_template"]), variables)}

## Stack

- Blueprint: `{variables["blueprint_id"]}` ({variables["blueprint_label"]})
- Initial stack: {stack}

## Boundaries

- Keep project-specific source, tests, docs, configs, tools, and artifacts inside this folder.
- Promote only genuinely reusable capabilities to shared folders such as `_tools/`, `_templates/`, `_docs/`, or `_skills/`.
- If this project becomes a root project, register it in `_ops/projects/registry.json`.

## Required Before Coding

- Run web-first intake for the task.
- Run or simulate coding research with `agent-platform/configs/research/coding-research-profile.json`.
- Record language/runtime, architecture, folder-structure, official-doc, and issue/discussion decisions under `docs/research/` or `specs/`.

## Official Docs To Check First

{official_docs}

## Commands

{commands}
"""
    artifact_readme = f"""# Artifacts

Store durable project-specific generated artifacts for {variables["project_title"]} here.

Generated build output, dependency caches, and temporary files should stay ignored unless they are intentionally committed as reviewable deliverables.
"""
    requirements_readme = """# Requirements

Project-specific requirements belong here.

Use the shared workspace requirement process for durable cross-project behavior, but keep product or implementation requirements owned by this project in this folder.
"""
    research_readme = """# Research

Store project-specific research notes here, including official docs checked, stack version constraints, architecture references, issue/discussion evidence, and source provenance.
"""
    architecture_readme = """# Architecture

Record architecture options, trade-offs, folder semantics, and decisions here before implementation expands.
"""
    decisions_readme = """# Decisions

Store lightweight project-local decision records here.
"""
    context = {
        "schema_version": "2026-06-01",
        "project_name": variables["project_name"],
        "blueprint_id": variables["blueprint_id"],
        "blueprint_label": variables["blueprint_label"],
        "technology_stack": blueprint.get("technology_stack", []),
        "official_docs": blueprint.get("official_docs", []),
        "source_blueprint_config": "_tools/coding-project-bootstrap/configs/blueprints.json",
        "reader_guide": {
            "summary": "Project-local context generated by coding-project-bootstrap.",
            "how_to_use": [
                "Keep this file updated when the project stack or ownership boundary changes.",
                "Do not store secrets here.",
                "Link project-local requirements, specs, research, evaluations, and commands as they appear."
            ]
        },
        "boundary_rules": config.get("common_boundary_notes", []),
    }
    return [
        FilePlan(target / "README.md", readme),
        FilePlan(target / "artifacts" / "README.md", artifact_readme),
        FilePlan(target / "docs" / "requirements" / "README.md", requirements_readme),
        FilePlan(target / "docs" / "research" / "README.md", research_readme),
        FilePlan(target / "docs" / "architecture" / "README.md", architecture_readme),
        FilePlan(target / "docs" / "decisions" / "README.md", decisions_readme),
        FilePlan(target / "configs" / "project-context.json", json.dumps(context, ensure_ascii=False, indent=2) + "\n"),
        FilePlan(target / "specs" / ".gitkeep", ""),
        FilePlan(target / "src" / ".gitkeep", ""),
        FilePlan(target / "tests" / ".gitkeep", ""),
        FilePlan(target / "tools" / ".gitkeep", ""),
    ]


def _registry_entry(config: JsonMap, blueprint: JsonMap, variables: JsonMap) -> JsonMap:
    common_home = [render_template(str(path), variables) for path in config.get("common_project_specific_home", [])]
    blueprint_home = [render_template(str(path), variables) for path in blueprint.get("project_specific_home", [])]
    return {
        "name": variables["project_name"],
        "path": f"{variables['project_name']}/",
        "status": "active",
        "type": blueprint["registry_type"],
        "purpose": render_template(str(blueprint["purpose_template"]), variables),
        "scope": render_template(str(blueprint["scope_template"]), variables),
        "project_specific_home": common_home + blueprint_home,
        "shared_dependencies": config.get("common_shared_dependencies", []),
        "boundary_notes": config.get("common_boundary_notes", []),
    }


def _register_project(registry_path: Path, entry: JsonMap) -> None:
    registry = load_json(registry_path)
    projects = registry.get("projects")
    if not isinstance(projects, list):
        raise BootstrapError(f"registry projects must be a list: {registry_path}")
    if any(isinstance(item, dict) and item.get("name") == entry["name"] for item in projects):
        raise BootstrapError(f"Project is already registered: {entry['name']}")
    projects.append(entry)
    projects.sort(key=lambda item: str(item.get("name", "")) if isinstance(item, dict) else "")
    write_json(registry_path, registry)


def list_blueprints(config: JsonMap) -> JsonMap:
    gaps = validate_config(config)
    if gaps:
        raise BootstrapError("; ".join(gaps))
    return {
        "blueprints": [
            {
                "id": blueprint["id"],
                "label": blueprint["label"],
                "registry_type": blueprint["registry_type"],
                "technology_stack": blueprint.get("technology_stack", []),
            }
            for blueprint in config["blueprints"]
            if isinstance(blueprint, dict)
        ]
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Plan or create a technology-aware coding project scaffold.")
    parser.add_argument("--workspace-root", default=str(default_workspace_root()), help="Workspace root. Defaults to this repository root.")
    parser.add_argument("--config", default=str(default_config_path()), help="Blueprint config path.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list", help="List available blueprints.")

    for command in ("plan", "create"):
        command_parser = subparsers.add_parser(command, help=f"{command.capitalize()} a coding project scaffold.")
        command_parser.add_argument("project_name", help="New project name in kebab-case.")
        command_parser.add_argument("--blueprint", default="generic", help="Blueprint ID.")
        command_parser.add_argument("--target-dir", help="Target directory inside the workspace. Defaults to root/<project-name>.")
        command_parser.add_argument("--register", action="store_true", help="Add a root project entry to _ops/projects/registry.json.")
        command_parser.add_argument("--overwrite", action="store_true", help="Allow overwriting files in the target directory.")
        command_parser.add_argument("--apply", action="store_true", help="Required for create to write files.")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    workspace_root = Path(args.workspace_root).resolve()
    config = load_json(Path(args.config))

    try:
        if args.command == "list":
            print(json.dumps(list_blueprints(config), ensure_ascii=False, indent=2))
            return 0

        plan = build_plan(
            workspace_root=workspace_root,
            config=config,
            project_name=args.project_name,
            blueprint_id=args.blueprint,
            target_dir=args.target_dir,
            register=args.register,
        )
        if args.command == "plan":
            print(json.dumps(plan.to_json(), ensure_ascii=False, indent=2))
            return 0

        if not args.apply:
            print(json.dumps({"dry_run": True, "message": "Re-run with --apply to create files.", "plan": plan.to_json()}, ensure_ascii=False, indent=2))
            return 0
        apply_plan(plan, overwrite=args.overwrite)
        print(json.dumps({"created": True, "plan": plan.to_json()}, ensure_ascii=False, indent=2))
        return 0
    except BootstrapError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
