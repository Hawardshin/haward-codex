# 검증: 설치 모드 분리

## 검증 계획

- `python3 -m json.tool agent-platform/configs/installations/install-mode-registry.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-install-modes configs/installations/install-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli list-install-modes configs/installations/install-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli show-install-mode configs/installations/install-mode-registry.json user`
- `PYTHONPATH=src python3 -m unittest tests.test_install_modes`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` 및 `--check`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-install-mode-split-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-install-mode-split-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-install-mode-split.json`
- `git diff --check`

## 결과

- JSON syntax: 통과
- Install mode CLI check/list/show: 통과
- Agent-platform install mode unit tests: 통과
- Agent-platform 전체 unittest: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과, 단 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 경고는 유지
- Workspace index/task board freshness: 통과
- Workspace health governance: 통과
- Grounding check: `ready_to_publish`
- Work timer: `ready`
- Work evaluator: `ready_to_close`
- `git diff --check`: 통과
