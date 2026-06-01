# Spec: Coding Project Bootstrap

## Goal

Create a reusable tool and operating flow that prepares technology-specific structure, project boundaries, registry links, and coding-research starting points for new coding projects.

## Requirement

- `REQ-WS-038`

## Scope

- Add `_tools/coding-project-bootstrap/`.
- Manage technology-specific blueprints as a self-documenting JSON config.
- Default execution must be dry-run; actual creation requires `--apply`.
- Root project creation may use `--register` to update `_ops/projects/registry.json`.
- Nested targets may be created but must not be auto-registered as root projects.
- Generated projects include `README.md`, `docs/`, `specs/`, `configs/project-context.json`, `src/`, `tests/`, `tools/`, and `artifacts/`.
- Connect the workflow from operations workflow, prompt router, memory, and navigation.

## Out Of Scope

- Dependency installation
- Running external framework generators
- Creating a specific product project now

## Acceptance Criteria

- Blueprint listing, planning, dry-run creation, apply, and registry update behavior are tested.
- Workspace health passes.
- Workspace Monitor snapshot reflects the new tool and docs.
- The evaluation report records `ready_to_close`.
