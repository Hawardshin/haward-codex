# Repository Instructions

This repository is the workspace for building and tracking a personal agent-building platform and related projects.

## Workspace Rules

- Treat each root-level non-reserved directory as a separate project.
- Create new project directories at the repository root using `kebab-case`.
- Reserve underscore-prefixed root directories for workspace operations:
  - `_docs/` for workspace-level documentation and decision records
  - `_templates/` for reusable project scaffolds
  - `_archive/` for paused or retired projects
- Keep project-specific code, docs, tests, and assets inside that project folder.
- Do not move or delete unrelated files unless the user explicitly asks.

## Git Rules

- Check `git status` before editing and before committing.
- Commit every completed meaningful change set.
- Use commit messages in the form `type(scope): summary`.
- Keep commits scoped to the work just completed.
- Do not rewrite history, reset, or discard user changes unless explicitly requested.

## Default Project Skeleton

New projects should normally start with:

```text
project-name/
  README.md
  docs/
  src/
  tests/
```

Adjust the skeleton only when the project type clearly needs a different structure.

