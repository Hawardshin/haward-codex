# Work Mode Routing Plan

## Selected Mode

- Current work mode: `governance`
- Reason: this changes repository-wide operating rules, evaluator behavior, workflows, persistent rules, and memory bootstrap.

## Evidence

- Web search record: `_history/web-searches/2026/2026-05-31-work-mode-routing.en.md`
- External evidence: Google Engineering Practices, GitHub Flow, Atlassian technical debt guidance
- Internal evidence: `_research/overlap-audits/2026-05-31-source-discovery-overlap.en.md`, current `work_evaluator.py`, `_ops/workflows/00-start-here.md`

## Plan

1. Identify where the evaluator and start/close prompts force the full loop.
2. Add a work-mode registry and define blocking targets by mode.
3. Add `work_mode` and `deferred_improvement_targets` to `work-evaluator-agent`.
4. Update start, close, and evaluation prompts plus workflows to branch by mode.
5. Add a deferred improvement backlog.
6. Update requirements, specs, history, evaluation, and maps.
7. Run tests plus config, memory, grounding, and evaluation checks.
8. Commit and push immediately.

## Architecture Options

| Option | Description | Decision |
| --- | --- | --- |
| Hard-code modes only inside evaluator | Fast, but the user cannot understand the policy by opening one settings file. | Rejected |
| Self-documenting registry plus evaluator policy | The mode criteria, evidence, and rules are visible in a settings file and shared by docs/evaluator. | Accepted |

## Source Values And Plan Evidence

- Mode names and required targets are recorded in `agent-platform/configs/workflows/work-mode-registry.json`.
- Evaluator default remains `standard` to preserve existing behavior.
- `ship_first` deferred improvement work is tracked in `_ops/backlog/deferred-improvements.en.md`.
