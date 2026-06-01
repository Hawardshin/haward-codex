# Validation

## Plan

- `python3 -m unittest discover -s _tools/workspace-health/tests`
- `python3 _tools/workspace-health/src/workspace_health.py --list`
- `python3 _tools/workspace-health/src/workspace_health.py --list --json`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- JSON parse check
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `check-grounding`
- `evaluate-work`
- `git diff --check`

## Result

- `python3 -m unittest discover -s _tools/workspace-health/tests`: passed, 5 tests.
- `python3 _tools/workspace-health/src/workspace_health.py --list`: passed, category and relative cwd output checked.
- `python3 _tools/workspace-health/src/workspace_health.py --list --json`: passed, JSON parse checked.
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`: passed, JSON parse and category filter checked.
- `python3 _tools/workspace-health/src/workspace_health.py --category frontend`: passed, 2 checks.
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: passed, 17 checks.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `git diff --check`: passed.
