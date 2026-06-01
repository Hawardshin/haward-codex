# 검증: 런타임/언어 방향

## 예정 검증

- `python3 -m json.tool agent-platform/configs/runtime/language-decision-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/runtime/language-decision-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` 및 `--check`
- `python3 _tools/task-board/src/task_board.py --check`
- `npm run collect` from `workspace-monitor`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-runtime-language-direction-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-runtime-language-direction-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-runtime-language-direction.json`
- `git diff --check`

## 결과

- JSON syntax: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과, 단 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 경고는 유지
- Workspace index/task board freshness: 통과
- Workspace monitor snapshot collect: 통과
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`
- `git diff --check`: 통과
