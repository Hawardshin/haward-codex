# 검증

## 계획

- `python3 -m unittest discover -s _tools/workspace-health/tests`
- `python3 _tools/workspace-health/src/workspace_health.py --list`
- `python3 _tools/workspace-health/src/workspace_health.py --list --json`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- JSON parse check
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `check-grounding`
- `evaluate-work`
- `git diff --check`

## 결과

- `python3 -m unittest discover -s _tools/workspace-health/tests`: 통과, 5 tests.
- `python3 _tools/workspace-health/src/workspace_health.py --list`: 통과, category와 상대 cwd 출력 확인.
- `python3 _tools/workspace-health/src/workspace_health.py --list --json`: 통과, JSON parse 확인.
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`: 통과, JSON parse와 category filter 확인.
- `python3 _tools/workspace-health/src/workspace_health.py --category frontend`: 통과, 2 checks.
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 통과, 17 checks.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `git diff --check`: 통과.
