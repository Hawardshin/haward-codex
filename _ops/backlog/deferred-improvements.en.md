# Deferred Improvements

## Purpose

This file keeps track of improvements that should not block quick or `ship_first` work but must not be forgotten.

## Status

| ID | Status | Owning Scope | Improvement | Reason Deferred | Revisit Trigger | Related Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| DI-2026-05-31-001 | open | `_ops`, `agent-platform` | Collect real examples of `quick` and `ship_first` usage, then tune mode criteria if they prove too loose or too strict. | The mode system was introduced today and has no usage history yet. | Three or more work items have mode-selection records, or evaluator gaps repeat. | `agent-platform/configs/workflows/work-mode-registry.json`, `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |
| DI-2026-06-01-001 | open | `workspace-monitor`, `agent-platform` | Collect open `clarification_needed` questions from `reconcile-spec` outputs and show them as a waiting-for-answer panel in `workspace-monitor`. | The current request is focused on alert format plus CLI/operating rules; the UI panel is a separate feature scope. | Multiple projects accumulate `clarification_needed` result files, or the user asks to answer those questions from the dashboard. | `agent-platform/src/agent_platform/planning/spec_reconciliation.py`, `workspace-monitor/` |

## Usage Rules

- When closing an item, link the related requirement, spec, evaluation, or work summary.
- `ship_first` evaluator input should include this file, or an equivalent project-specific file, in `deferred_improvement_targets`.
