# Repository Instructions

This repository is the workspace for building and tracking a personal agent-building platform and related projects.

## Workspace Rules

- Treat each root-level non-reserved directory as a separate project.
- Create new project directories at the repository root using `kebab-case`.
- Reserve underscore-prefixed root directories for workspace operations:
  - `_docs/` for workspace-level documentation and decision records
  - `_history/` for dated work history and compressed context summaries
  - `_skills/` for tracked source copies of custom Codex skills
  - `_templates/` for reusable project scaffolds
  - `_tools/` for reusable local tools and scripts
  - `_archive/` for paused or retired projects
- Keep project-specific code, docs, tests, and assets inside that project folder.
- Do not move or delete unrelated files unless the user explicitly asks.
- Prefer creating a project folder for substantial work instead of placing loose files at the repository root.

## Git Rules

- Check `git status` before editing and before committing.
- Commit every completed meaningful change set.
- Use commit messages in the form `type(scope): summary`.
- Keep commits scoped to the work just completed.
- Do not rewrite history, reset, or discard user changes unless explicitly requested.
- Update the relevant history log before committing when the work changes project direction, repository rules, or meaningful artifacts.

## Platformization Rules

- Treat the repository as a monorepo for a personal agent-building platform.
- Keep reusable platform concepts in `agent-platform/` unless they clearly belong to another project.
- When a workflow repeats or creates avoidable friction, consider promoting it into a template, tool, or skill.
- Prefer the smallest reusable asset that solves the problem:
  - template for repeated file or folder structure
  - tool for deterministic execution, conversion, validation, or generation
  - skill for repeated agent behavior, domain rules, or multi-step workflows

## Capability Creation Rules

- For new skills, use the `skill-creator` guidance.
- Keep skill source under `_skills/<skill-name>/` so it is tracked by git.
- If a skill must be active in Codex, install or copy it into `$CODEX_HOME/skills` only after confirming the target path and permissions.
- For new tools, prefer `_tools/<tool-name>/` for shared tools or `project-name/tools/` for project-specific tools.
- Document each reusable tool with its purpose, inputs, outputs, and main command.
- Do not create a new skill or tool when a short documented procedure is enough.

## Context Management Rules

- When conversation context becomes long, compress stable decisions into `_history/YYYY/YYYY-MM-DD.md` and the relevant project docs.
- Keep the latest project purpose, status, commands, and constraints in that project's `README.md`.
- Preserve only durable information in docs: decisions, requirements, command results worth reusing, and links to artifacts.
- Avoid relying on chat history for project state that future work needs.

## Artifact Format Rules

- Use Markdown for logs, rules, decisions, and lightweight documentation.
- Consider HTML for dashboards, visual reports, product specs, prototypes, and standalone artifacts that benefit from browser rendering.
- Put project-specific generated or designed artifacts under `project-name/artifacts/`.
- Reusable HTML patterns belong under `_templates/html-artifact/`.

## Default Project Skeleton

New projects should normally start with:

```text
project-name/
  README.md
  artifacts/
  docs/
  src/
  tests/
```

Adjust the skeleton only when the project type clearly needs a different structure.
