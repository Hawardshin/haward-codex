# 검증: 인간 프로세스 자동화 목적

## 검증 명령

- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-human-process-automation-purpose-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-human-process-automation-purpose-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-human-process-automation-purpose.json`
- `git diff --check`

## 확인할 사항

- 플랫폼 목적이 반복 작업 감소, 시간 절감, 인간 프로세스 모델링으로 일관되게 표현된다.
- 자동화가 인간 판단, 검증, rollback 경계를 보존해야 한다는 제한이 빠지지 않는다.
- 웹 검색 근거와 내부 문서 근거가 평가 입력에 연결된다.
