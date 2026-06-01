# Spec: Workspace Health Source Structure Refactor

## Goal

Improve `workspace-health` maintainability by splitting source responsibilities into modules while preserving external behavior.

## Requirement

- `REQ-WS-034`

## Scope

- `_tools/workspace-health/src/workspace_health.py`
- `_tools/workspace-health/src/workspace_health/`
- `_tools/workspace-health/tests/test_workspace_health.py`
- `_tools/workspace-health/README.ko.md`
- `_tools/workspace-health/README.en.md`

## Structure

```text
_tools/workspace-health/src/
  workspace_health.py          # legacy script wrapper
  workspace_health/
    __init__.py
    checks.py                  # check discovery and filtering
    cli.py                     # argparse and output modes
    models.py                  # shared dataclasses/constants
    runner.py                  # command execution and serialization
```

## Behavior

- The existing command `python3 _tools/workspace-health/src/workspace_health.py` continues to work.
- Tests import package modules.
- `--list`, `--json`, `--category`, and `--include-build` behavior is preserved.

## Out of Scope

- Root-level folder moves
- Package conversion for other `_tools/*`
- CI configuration changes
