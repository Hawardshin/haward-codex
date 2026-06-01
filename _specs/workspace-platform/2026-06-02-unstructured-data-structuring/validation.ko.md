# 검증: 비정형 데이터 정형화

## 예정 검증

- `python3 -m json.tool agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/unstructured-data-structuring-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` 및 `--check`
- `python3 _tools/task-board/src/task_board.py` 및 `--check`
- `npm run collect` from `workspace-monitor`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-unstructured-data-structuring-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-unstructured-data-structuring-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-unstructured-data-structuring.json`
- `git diff --check`

## 결과

- `python3 -m json.tool` 대상 JSON 파일 검증 통과.
- `check-config-contract` 통과: 신규 structuring profile과 memory bootstrap manifest가 self-documenting 계약을 만족함.
- `check-memory-bootstrap` 통과: 신규 `unstructured_data_structuring_profile` anchor가 부트스트랩 대상에 포함됨.
- `docs-audit`, `naming-audit` 통과.
- `structure-audit` 통과. 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 생성물 분류 경고가 남아 있으나 이번 변경의 차단 이슈는 아님.
- `workspace_index.py` 재생성 및 `--check` 통과.
- `task_board.py` 재생성 및 `--check` 통과.
- `workspace-monitor`의 `npm run collect` 통과: workspace snapshot 갱신.
- `check-grounding` 통과: `ready_to_publish`.
- `evaluate-work` 통과: `ready_to_close`.
- `work_timer.py check` 통과: `ready`. 실제 phase duration은 사후 기록이라 측정값 없음 경고가 남음.
- `git diff --check` 통과.
