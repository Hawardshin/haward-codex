# Python Agent Project

## Purpose

Use this template for new Python-first agent projects.

## Scope Boundary

- Keep this agent project's code, configs, tests, docs, and artifacts inside this folder.
- Put project-specific tools under `tools/` if needed.
- Promote only cross-project reusable tools, prompts, templates, or policies to shared workspace folders.
- Register the project in `_ops/projects/registry.json`.

## Structure

```text
project-name/
  README.md
  pyproject.toml
  artifacts/
  configs/
    agents/
  docs/
  src/
  tests/
```

## Rules

- Keep the agent domain model local.
- Put open-source framework integrations behind adapters.
- Prefer standard-library tests until external dependencies are justified.
- Document setup, run, test, and evaluation commands as soon as they exist.
