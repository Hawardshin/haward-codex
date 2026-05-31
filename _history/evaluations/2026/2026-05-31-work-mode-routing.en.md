# 2026-05-31 Work Mode Routing Evaluation

## Evaluation Input

- Work mode: `governance`
- Initial instruction: avoid running the full loop every time, select modes by work type, support ship-first then deferred improvement, and clean up overlapping flow.
- Result summary: added the work mode registry, evaluator mode-specific target policy, mode-selection workflow/prompt, deferred improvement backlog, and updated durable rules, requirements, specs, history, and research records.

## References Checked

- Google Engineering Practices - Small CLs
- GitHub Docs - GitHub Flow
- Atlassian Technical Debt
- Thoughtworks Evolutionary Architecture
- `_research/overlap-audits/2026-05-31-source-discovery-overlap.en.md`
- Existing `work_evaluator.py`, `_ops/workflows/00-start-here.md`

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests`: pass, 72 tests
- `check-config-contract`: pass, `self_documenting`
- `check-memory-bootstrap`: pass, `ready_to_bootstrap`
- `complete-coding-research`: pass, `ready_to_implement`
- `plan-from-research`: pass, `ready_to_plan`
- `validate-knowledge`: pass, `ready_to_reference`
- `check-grounding`: pass, `ready_to_publish`
- `evaluate-work`: pass, `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Blocking gaps: none
- Commit/push: `3927922` pushed to `origin/main`
- Improvement idea: after real work examples accumulate, tune `quick` and `ship_first` criteria through `DI-2026-05-31-001`.

## Key Artifacts

- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `_ops/workflows/02-select-work-mode.md`
- `_ops/prompts/02-select-work-mode.md`
- `_ops/backlog/deferred-improvements.en.md`
- `_specs/workspace-platform/2026-05-31-work-mode-routing/`
- `_history/web-searches/2026/2026-05-31-work-mode-routing.en.md`
- `_research/topics/agent-operations/2026-05-31-work-mode-routing.en.md`

## Evaluator Output Summary

```json
{
  "status": "ready_to_close",
  "requires_rework": false,
  "work_mode": "governance",
  "gaps": [],
  "improvements": [
    "After several real tasks, tune quick and ship_first thresholds using DI-2026-05-31-001."
  ]
}
```
