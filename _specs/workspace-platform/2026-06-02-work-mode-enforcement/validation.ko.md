# 검증: 작업 모드 강제화

## 예정 검증

- `python3 -m json.tool agent-platform/configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input>`
- `python3 -m unittest discover -s tests` from `agent-platform`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## 결과

- JSON 문법 검증 통과.
- `check-work-modes`: `ready`.
- `python3 -m unittest discover -s tests`: 118개 테스트 통과.
- `check-config-contract`: core shared settings 모두 `self_documenting`.
- `check-memory-bootstrap`: `ready_to_bootstrap`.
- `docs-audit`: `docs_ready`.
- `naming-audit`: `clean`.
- `structure-audit`: `clean`. 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 생성물 분류 경고는 남아 있으나 이번 변경의 차단 이슈는 아님.
- `workspace_index.py`, `task_board.py`, `workspace-monitor npm run collect` 실행.
- `npm run collect`는 한 번 루트에서 잘못 실행해 `package.json` 없음 오류가 났고, 이후 `workspace-monitor/`에서 재실행해 통과했다.
- `check-grounding`: 첫 실행에서 `json_schema` source_type이 허용 목록 밖이라 수정했고, 재실행 결과 `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `work_timer.py check`: `ready`. 사후 기록이라 phase duration은 미측정 경고가 남음.
- `git diff --check` 통과.
