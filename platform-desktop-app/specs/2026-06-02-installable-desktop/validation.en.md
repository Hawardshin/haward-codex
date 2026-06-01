# Validation Plan

## Static Validation

- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`

## Operations Validation

- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`

## Evaluation Validation

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-installable-software-productization-grounding.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-installable-software-productization-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-installable-software-productization.json`

## Browser/App Validation

This work does not implement a desktop app, so Playwright or app-run validation is not in scope. Add browser or desktop smoke tests when a UI prototype exists.
