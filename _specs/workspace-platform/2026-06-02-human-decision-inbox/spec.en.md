# Spec: Human Decision Inbox

## Purpose

Implement `REQ-WS-048` by collecting human-needed answers in one place, continuing safe independent work while waiting, and checkpointing current work before resuming only the affected task when an answer arrives.

## Requirement

- `REQ-WS-048`

## Behavior

- Record `blocked_decision`, `clarification_needed`, approval, and preference decisions in `_ops/coordination/human-decision-inbox.json`.
- Give each decision one stable ID.
- Each record includes question, answer format, impact, blocked work, unblocked work, assumptions, notification event, interrupt policy, checkpoint requirement, and resume action.
- Batch related questions when the human can answer them together.
- Continue safe `unblocked_work` while waiting.
- When an answer arrives, checkpoint current work first.
- Interrupt/resume immediately for high-priority or risk-reducing answers.
- Schedule low-priority or documentation-only answers for the next safe point when appropriate.
- Record state changes in `decision_history`.

## Change Targets

- Requirements baseline and change/review records
- `_ops/coordination/human-decision-inbox.json`
- `_ops/coordination/human-decision-inbox.*.md`
- `_ops/workflows/61-human-decision-inbox.md`
- `_ops/prompts/91-human-decision-inbox.md`
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `agent-platform/configs/integrations/notification-channels.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_docs/instructions/persistent-instructions.*.md`
- `AGENTS.md`
- `_ops/prompts/00-router.md`
- `_ops/index.md`
- History, research, evaluation, and timing records

## Acceptance Criteria

- The central inbox JSON includes self-documenting config fields and passes JSON validation.
- Workflow and prompt require decision creation, batching, unblocked work, checkpointing, interrupt/resume, and decision history updates.
- Notification config exposes `human_decision_needed`, `human_decision_answered`, and `resume_ready`.
- Memory bootstrap and persistent instructions make the inbox discoverable.
- Config contract, memory bootstrap, docs/naming/structure audit, grounding, evaluator, and work timer pass.
