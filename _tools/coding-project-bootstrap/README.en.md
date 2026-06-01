# Coding Project Bootstrap

This tool prepares the root-project boundary, technology-aware starter folders, and requirements/spec/research/evaluation touchpoints for new coding projects.

## Purpose

- Avoid recreating new project structure by hand.
- Choose a starter shape for Python, Next.js, React/Vite, Spring Boot, C, or generic projects.
- Default to dry-run behavior so folders are not created accidentally.
- Optionally register root projects in `_ops/projects/registry.json`.
- Generated projects include `README.md`, `docs/`, `specs/`, and `configs/project-context.json` so Workspace Monitor can index them.

## Commands

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-agent --blueprint python-agent --register
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py create my-agent --blueprint python-agent --register --apply
```

Use `--target-dir` when creating a nested module inside an existing project. Nested targets are not automatically registered as root projects.

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper
```

## Supported Blueprints

- `generic`: undecided technology project
- `python-agent`: Python-first agent project
- `python-cli`: Python CLI project
- `next-app`: Next.js app project
- `react-vite`: React/Vite app project
- `spring-boot`: Java Spring Boot project
- `c-library`: C library or systems project

## Operating Rules

- Run `plan` before creating files.
- After creation, re-check official docs for the selected stack and record coding research.
- If dependency installation is needed, create an installation audit record first.
- Keep project-specific artifacts inside the generated project.
- Promote only repeated cross-project capabilities to `_tools/` or `_templates/`.

## Verification

```bash
python3 -m unittest discover -s _tools/coding-project-bootstrap/tests
python3 _tools/workspace-health/src/workspace_health.py --category tools
```
