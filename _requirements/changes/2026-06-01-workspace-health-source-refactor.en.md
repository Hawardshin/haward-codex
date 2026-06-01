# Requirement Change: Workspace Health Source Structure Refactor

## Change Summary

- Added requirement: `REQ-WS-034`
- Source request: `UR-2026-06-01-018`
- Work mode: `standard`

## Change

When repository operations tools such as `workspace-health` grow, they should not keep CLI handling, check definitions, execution, and serialization inside one script. The source should be split into responsibility-focused modules while preserving the legacy script entrypoint so existing docs and automation keep working.

## Rationale

- Python `src` layout keeps importable code behind an explicit package boundary.
- Refactoring should preserve external behavior while improving internal structure and maintainability.
- Monorepo operations tools are easier to onboard and change when folder and module ownership is explicit.

## Acceptance Criteria

- The existing command `python3 _tools/workspace-health/src/workspace_health.py` still works.
- Tests import the new package modules directly.
- CLI, models, check definitions, and execution/serialization are separated.
- Unit tests and the full workspace health check pass.
