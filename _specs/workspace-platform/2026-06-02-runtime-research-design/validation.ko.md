# 검증: 런타임 조사/설계

## 예정 검증

- `python3 -m json.tool agent-platform/configs/runtime/language-decision-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/runtime/language-decision-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` 및 `--check`
- `python3 _tools/task-board/src/task_board.py --check`
- `npm run collect` from `workspace-monitor`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-runtime-research-design-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-runtime-research-design-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-runtime-research-design.json`
- `git diff --check`

## 결과

- JSON 구문 검사 통과: language decision registry, grounding input, evaluation input.
- Config contract 통과: `configs/runtime/language-decision-registry.json`.
- Memory bootstrap 통과: `ready_to_bootstrap`.
- Docs audit 통과: `docs_ready`.
- Naming audit 통과: `clean`.
- Structure audit 통과: `clean`, 단 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 경고는 유지.
- Workspace index 재생성 및 freshness check 통과.
- Task board 재생성 및 freshness check 통과.
- Workspace monitor snapshot 수집 통과: 1200 documents.
- Grounding check 통과: `ready_to_publish`.
- Work evaluator 통과: `ready_to_close`.
- Work timer 통과: `ready`, 단 이번 작업은 중간부터 타이밍 기록이 시작되어 모든 phase가 `not_measured`.
- `git diff --check` 통과.
