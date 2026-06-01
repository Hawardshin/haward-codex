# 검증 계획

## 정적 검증

- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`

## 운영 검증

- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`

## 평가 검증

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-installable-software-productization-grounding.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-installable-software-productization-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-installable-software-productization.json`

## 브라우저/앱 검증

이번 작업은 desktop app 구현이 아니므로 Playwright나 앱 실행 검증 대상은 없다. 실제 UI prototype이 생기면 브라우저 또는 desktop smoke test를 추가한다.
