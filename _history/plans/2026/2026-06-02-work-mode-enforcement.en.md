# Plan Record: Work Mode Enforcement

## Selected Mode

- `governance`

## Selection Reason

- The user instruction changes durable future operating rules and evaluator behavior.
- Because prompt-only modes are not enforced, the registry, CLI, evaluator, and evaluation report must be connected.

## Execution Plan

1. Use web search to check policy-as-code, schema validation, and guardrail enforcement references.
2. Inspect the current enforcement coverage in `work-mode-registry.json` and `work_evaluator.py`.
3. Add `mode_enforcement` and mode-level enforcement fields to the registry.
4. Add the `check-work-modes` CLI and Python validator.
5. Add `mode_selection_record_targets` to the evaluator.
6. Update requirements, specs, policy, workflows, persistent instructions, memory bootstrap, history, and evaluation.
7. Run tests and config checks, then commit and push.

## Evidence Files

- `_history/web-searches/2026/2026-06-02-work-mode-enforcement.en.md`
- `_research/topics/agent-operations/2026-06-02-work-mode-enforcement.en.md`
- `_specs/workspace-platform/2026-06-02-work-mode-enforcement/plan.en.md`
