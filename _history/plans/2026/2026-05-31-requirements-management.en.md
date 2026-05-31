# 2026-05-31 Plan Record: Requirements Management

## Initial Instruction Summary

The user instructed that work should define requirements, keep revising and reviewing those requirements, and build from them.

## Research

- Ran web search first.
- Checked requirements management, traceability matrix, change management, and change-log practices.
- Decided that requirements should live as a separate baseline layer between request summaries and request-to-outcome traces.

## Plan

1. Add `_requirements/` as the shared requirements layer.
2. Create bilingual shared requirements baselines, change records, and review records.
3. Add requirements management policy, templates, prompt, and workflow.
4. Add `requirements-manager-agent`.
5. Make `work-evaluator-agent` treat missing `requirements_targets` as blocking gaps.
6. Connect README, AGENTS, persistent instructions, memory bootstrap, operations index, start/close workflows, history, research, and coordination board.

## Public Decision

Request summaries preserve intent and request-to-outcome traces connect results. But implementation can drift without requirement IDs and verification methods. A separate requirements baseline layer keeps the build criteria explicit, while change and review records keep the lifecycle inspectable.

## Completion Criteria

- `_requirements/` baseline, change, and review files exist.
- Requirements management prompt/workflow/agent exist.
- Evaluation input requires `requirements_targets`.
- Tests, config checks, grounding, and evaluation pass.
- Commit and push complete.
