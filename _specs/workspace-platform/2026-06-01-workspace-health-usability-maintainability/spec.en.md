# Spec: Workspace Health Usability And Maintainability

## Goal

Make `workspace-health` easier for humans to use and stable for automation.

## Requirement

- `REQ-WS-033`

## Scope

- `_tools/workspace-health/src/workspace_health.py`
- `_tools/workspace-health/tests/test_workspace_health.py`
- `_tools/workspace-health/README.ko.md`
- `_tools/workspace-health/README.en.md`

## Behavior

- Every check belongs to one of `governance`, `projects`, `tools`, or `frontend`.
- `--category <name>` runs only that category and can be repeated.
- `--list` prints commands with category and relative cwd.
- `--json` prints pure JSON.
- Failed checks include stdout/stderr in JSON.

## Out Of Scope

- CI workflow setup
- Workspace Monitor UI integration
