# Naming Governance

## Purpose

This document defines shared naming rules for projects, tools, skills, docs, specs, history, configs, and source code. The detailed source of truth is `_ops/naming/naming-policy.json`.

## Default Principles

- Path names should reveal ownership and artifact type.
- New root projects, tools, skills, workflows, prompts, and spec slugs use `kebab-case` by default.
- Python packages, modules, and functions use `snake_case`.
- Important dated records start with `YYYY-MM-DD-<lower-kebab-slug>`.
- Important bilingual docs use paired `name.ko.md` and `name.en.md` files.
- Existing durable paths require a migration plan, trace update, and validation before renaming.

## Namespace Rules

| Target | Rule | Example |
| --- | --- | --- |
| root project | `kebab-case` | `agent-platform/`, `workspace-monitor/` |
| reserved operations folder | `_` + lower-kebab | `_docs/`, `_history/` |
| runtime adapter | `.` + lower-kebab | `.claude/`, `.cursor/` |
| tool folder | `kebab-case` | `_tools/workspace-health/` |
| skill folder | `kebab-case` | `_skills/create-validated-skill/` |
| Python package/module | `snake_case` | `workspace_health/`, `naming_audit.py` |
| spec/history slug | `YYYY-MM-DD-lower-kebab` | `2026-06-01-naming-conventions-audit/` |
| bilingual docs | `name.ko.md`, `name.en.md` | `naming-governance.en.md` |
| commit | `type(scope): summary` | `docs(workspace): add naming governance` |

## Audit

Run this after adding, moving, or changing durable names.

```bash
python3 _tools/naming-audit/src/naming_audit.py --check
```

Repository-wide verification includes naming audit through `workspace-health`.

```bash
python3 _tools/workspace-health/src/workspace_health.py --category governance
```

## Exceptions

- `README.md`, `README.ko.md`, `README.en.md`: documentation entrypoint convention
- `AGENTS.md`, `CLAUDE.md`: assistant runtime entrypoint convention
- `SKILL.md`: Codex skill entrypoint convention
- `__init__.py`: Python package marker convention

Record new exceptions with reasons in `_ops/naming/naming-policy.json`.
