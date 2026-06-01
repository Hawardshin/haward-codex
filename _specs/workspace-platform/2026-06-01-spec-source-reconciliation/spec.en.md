# Spec/Source Reconciliation Spec

## Purpose

Prevent the AI from guessing when a project spec is ambiguous or differs from source, tests, or generated artifacts. Before changing either side, the agent records comparison evidence and classifies whether to update the spec, update the source, ask the user, or defer.

## Requirements

- Related requirement: `REQ-WS-030`
- Related request: `UR-2026-06-01-013`

## Scope

- Add a `spec-reconciliation-agent` config and `reconcile-spec` CLI to `agent-platform`.
- Support the `clarification_needed` notification event.
- Route ambiguous spec or spec/source drift situations through a dedicated workflow and prompt.
- Keep the rule discoverable through memory bootstrap.

## Behavior Rules

1. Collect comparison evidence from specs, source, tests, generated artifacts, and existing requirements first.
2. Classify each issue as `update_spec`, `update_source`, `ask_user`, or `defer`.
3. Use `update_spec` only when current implementation is validated, intentional, and better aligned with latest user intent than the old spec.
4. Use `update_source` when the active spec is clear and source behavior is a regression or incomplete implementation.
5. Use `ask_user` when product intent, priority, acceptance criteria, compatibility, or trade-off preference is unclear.
6. `ask_user` issues include stable question IDs, options, answer format, and decision impact.
7. Do not change the related spec or source until the user answer is recorded for `ask_user` issues.

## Outputs

- `agent-platform/src/agent_platform/planning/spec_reconciliation.py`
- `agent-platform/configs/planning/spec-reconciliation-template.json`
- `agent-platform/configs/agents/spec-reconciliation-agent.json`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_ops/prompts/38-reconcile-spec-source.md`
- `agent-platform/configs/integrations/notification-channels.json`

## Acceptance Criteria

- `reconcile-spec` returns `rework_required` when evidence is insufficient.
- `ask_user` or `ambiguous_spec` issues return `clarification_required` and `notification_event.event_type=clarification_needed`.
- Clear `update_source` or `update_spec` candidates return `ready_to_reconcile`.
- The alert message includes the user-answerable `answer_format`.
- Unit tests plus config and memory checks pass.
