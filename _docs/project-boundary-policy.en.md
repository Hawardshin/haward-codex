# Project Boundary Policy

## Purpose

This repository is a long-running monorepo where many interests and projects will grow over time. The shared operating environment applies to all projects, but project-specific code, docs, settings, and artifacts belong inside the owning project folder.

The philosophical basis lives in [_philosophy/agent-operating-philosophy.en.md](../_philosophy/agent-operating-philosophy.en.md). This document turns that philosophy into project management policy.

## Principles

- A normal root folder is an individual project.
- Project folder names use `kebab-case`.
- Project-specific content stays inside the owning project folder.
- Shared operating rules, templates, tools, research, and philosophy live under underscore-prefixed folders.
- `_private/` and `outputs/` are exceptions used only as local-only ignored folders, not as shared knowledge or durable artifacts.
- Promote something to shared only when cross-project reuse is clear.
- Register project status and boundaries in `_ops/projects/registry.json`.
- Explain durable project top-level folders in each registry entry's `project_specific_home`.
- Root folder classification rules live in `_ops/projects/root-structure-policy.json`.
- `.claude/`, `.cursor/`, and `.agents/` are AI assistant runtime adapter folders, not projects. They should contain only thin adapters that point to `_ops/assistant-runtimes/adapter-registry.json` and shared operating principles.

## What Belongs Inside A Project

- Project code: `project-name/src/`
- Project tests: `project-name/tests/`
- Project docs and decisions: `project-name/docs/`
- Project artifacts: `project-name/artifacts/`
- Project configs: `project-name/configs/`
- Project-specific tools: `project-name/tools/`
- Project commands and checks: `project-name/README.md`

## What Belongs In Shared Folders

- Shared operating policy: `_docs/`
- Operating philosophy: `_philosophy/`
- Prompts and workflows: `_ops/`
- Shared tools: `_tools/`
- Templates: `_templates/`
- Reusable research: `_research/`
- Custom skill source: `_skills/`
- Work, plan, and evaluation history: `_history/`

## When To Create A New Project

Create a new root project when a new interest or task has any of these traits:

- It has an independent purpose and lifecycle.
- It will produce its own code, data, UI, docs, or artifacts.
- It may later be run, tested, deployed, archived, or resumed separately.
- It would mix concerns if placed inside an existing project.

## When To Promote To Shared

Tools, templates, and rules that start inside a project can move to shared locations when:

- They are reused by at least two projects.
- They are likely to recur across future projects.
- They work without hidden project-specific context.
- Usage and boundaries are documented.

## What Not To Do

- Do not put project-specific files directly under `_docs/`, `_ops/`, or `_tools/`.
- Do not fork common operating policy by copying it separately into `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, and `.agents/rules`.
- Do not mix unrelated concerns into one project.
- Do not make shared tools depend secretly on project-local state.
- Do not create a root project without a README.
- Do not leave project status only in chat memory instead of the registry.
- Do not leave durable artifacts in `outputs/`. Durable artifacts belong under the owning project's `artifacts/`.
- Do not use `_private/` content as work evidence, requirements, history, or knowledge-base source.

## Structure Validation

After changing root folders, the project registry, reserved operational folders, runtime adapter folders, local-only folder rules, durable project top-level folders, or generated-output rules, run:

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
```
