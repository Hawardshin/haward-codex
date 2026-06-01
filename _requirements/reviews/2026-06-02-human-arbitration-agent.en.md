# Requirement Review: Human Arbitration Agent

## Review Result

- Status: accepted
- Requirement: `REQ-WS-068`

## Checks

- The existing `human-decision-inbox` stores questions and resumes work, but it does not define how to recognize irreducible judgment calls.
- The existing `principle-guardian-agent` detects principle conflicts, but final value judgment should remain with the user.
- `human-arbitration-agent` is therefore not a duplicate. It turns facts-checked but judgment-dependent conflicts into small decision packets.

## Approval Conditions

- Route factual uncertainty back to research, grounding, or knowledge skepticism first.
- Route sufficiently grounded but judgment-dependent decisions to the human.
- Pause only the affected branch and continue safe unblocked work.
- Record options, evidence, trade-offs, recommended default, blocked/unblocked work, and resume action.
