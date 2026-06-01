# Validation: Runtime Research/Design

## Planned Checks

- `python3 -m json.tool agent-platform/configs/runtime/language-decision-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/runtime/language-decision-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` and `--check`
- `python3 _tools/task-board/src/task_board.py --check`
- `npm run collect` from `workspace-monitor`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-runtime-research-design-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-runtime-research-design-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-runtime-research-design.json`
- `git diff --check`

## Results

- JSON syntax passed: language decision registry, grounding input, and evaluation input.
- Config contract passed for `configs/runtime/language-decision-registry.json`.
- Memory bootstrap passed: `ready_to_bootstrap`.
- Docs audit passed: `docs_ready`.
- Naming audit passed: `clean`.
- Structure audit passed: `clean`, with existing warnings for `presentation-agent/playwright-report` and `presentation-agent/test-results`.
- Workspace index regenerated and freshness check passed.
- Task board regenerated and freshness check passed.
- Workspace monitor snapshot collect passed: 1200 documents.
- Grounding check passed: `ready_to_publish`.
- Work evaluator passed: `ready_to_close`.
- Work timer passed: `ready`; this record remains partially measured because timing began mid-task and all phases are `not_measured`.
- `git diff --check` passed.
