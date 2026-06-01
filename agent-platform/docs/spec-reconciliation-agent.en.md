# spec-reconciliation-agent

## Purpose

`spec-reconciliation-agent` decides whether to update the spec, update the source, or ask the user when a project spec is ambiguous or differs from the current source.

## Use When

- Acceptance criteria are ambiguous enough to allow multiple implementation choices.
- The spec says behavior A, but source, tests, or artifacts behave like B.
- It is unclear whether current source is newer intended behavior or an implementation regression.
- The decision depends on product intent, priority, compatibility, or UX trade-offs.

## Input

- `project`
- `request_summary`
- `spec_paths`
- `source_paths`
- `comparison_evidence`
- `issues`
- `notification_targets`
- `plan_history_targets`

## Decision Rules

- `update_spec`: current source behavior is intentional, validated, and the old spec is stale.
- `update_source`: the latest approved spec is concrete and current source is incomplete or regressed.
- `ask_user`: product intent, acceptance criteria, priority, compatibility, or trade-off preference is ambiguous.
- `defer`: the issue is outside the current work scope but should be tracked.

## Question Format

Clarification questions should be easy to answer.

```text
[WARNING] Spec clarification needed: <project>
Project: <project>
Request: <request summary>
Spec/source reconciliation needs your decision before continuing.
Questions:
- SSR-001: <issue summary>
  - Q1: <question>? Options: <A>, <B>, <defer>. Recommended: <A>.
Reply format:
Q1=<answer>
event=clarification_needed
project=<project>, question_ids=Q1
```

## Operating Rules

- Do not change spec or source for `ask_user` issues until the answer is recorded.
- After the answer arrives, reflect it in spec, plan, tasks, validation, and traceability.
- If notification channels are used, use the `clarification_needed` event in `agent-platform/configs/integrations/notification-channels.json`.
- Do not store real webhook URLs or tokens in the repository.

## Main Commands

```bash
PYTHONPATH=src python3 -m agent_platform.cli reconcile-spec configs/planning/spec-reconciliation-template.json
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event clarification_needed --title "Spec clarification needed" --message "Q1=<answer>" --severity warning --dry-run
```

## Related Files

- `agent-platform/configs/planning/spec-reconciliation-template.json`
- `agent-platform/src/agent_platform/planning/spec_reconciliation.py`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_ops/prompts/38-reconcile-spec-source.md`
