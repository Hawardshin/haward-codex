# Requirement Change: Human Arbitration Agent

## Change

Add `REQ-WS-068`.

When several options, sources, principles, or agent outputs are defensible and the remaining choice depends on values, responsibility, risk appetite, strategy, or preference, the platform shall avoid pretending certainty and use `human-arbitration-agent` to create a human arbitration packet.

## Rationale

The user asked for a structure where a human judges when both sides are genuinely right. The existing `human-decision-inbox` stores pending decisions and interrupt/resume handoffs, while `principle-guardian-agent` protects principles. This requirement adds the missing judgment handoff between evidence checking and final authority.

## Acceptance Criteria

- The agent spec and docs exist.
- The requirements baseline and persistent instructions record the arbitration rule.
- Factual uncertainty is separated from value or strategy judgment.
- Arbitration packets route to `_ops/coordination/human-decision-inbox.json`.
- Verification and evaluation pass.
