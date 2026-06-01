# Human Decision Inbox

- Source: `_ops/coordination/human-decision-inbox.json`
- Purpose: central inbox for human answers, approvals, preference decisions, `clarification_needed`, and `blocked_decision` items with safe interrupt/resume handling.
- Last reviewed: 2026-06-02

## Open Decisions

- None

## Usage Rules

- Do not scatter questions through chat; register them in the inbox with stable IDs.
- Each item includes question, options, answer format, impact, blocked work, unblocked work, and `resume_action`.
- When an answer arrives, checkpoint current work first, then interrupt immediately or schedule resume at the next safe point based on priority and risk.
- After resume, update status to `resumed`, `deferred`, `superseded`, or `cancelled`.

## Answer Format Example

```text
HDI-2026-06-02-001=A
reason=I want to freeze project scope first
resume=immediate
```
