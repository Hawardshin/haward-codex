# Spec: Non-Blocking Clarification

## Purpose

Implement `REQ-WS-047` so waiting for a user clarification answer does not become a global task pause.

## Requirement

- `REQ-WS-047`

## Behavior

- When `clarification_needed` or a clarifying question appears, split dependencies first.
- Put only the item that cannot be decided without the answer into `blocked_decision`.
- Continue answer-independent work as `unblocked_work`.
- Record assumptions, defaults, and deferred items.
- When the answer arrives, use `resume_action` to patch only affected work.

## Change Targets

- Requirement baseline and change/review records
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.*.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/instructions/persistent-instructions.*.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_docs/policies/spec-driven-development-policy.*.md`
- Operations index/router plus history and evaluation records

## Acceptance Criteria

- The AI usage gap profile includes `global_pause_on_clarification`, `non_blocking_progress`, and `non_blocking_clarification_policy`.
- The workflow and prompt require pending answers to be represented as `blocked_decision`, `unblocked_work`, `assumptions`, and `resume_action`.
- Durable instructions and AGENTS include the no-global-pause rule.
- Config contract, memory bootstrap, docs/naming/structure audit, grounding, evaluator, and work timer pass.
