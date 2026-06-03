# Validation Plan

## Functional Validation

- `npm test`
- `npm run collect`
- Confirm snapshot has `collaborationBoard.summary`, `lanes`, and `flows`.
- Confirm the Agents UI collaboration board and agent-task-project flow build.

## Build Validation

- `npm run check`
- `npm run build`

## Platform Validation

- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...`
- `python3 _tools/workspace-health/src/workspace_health.py`
- `git diff --check`
