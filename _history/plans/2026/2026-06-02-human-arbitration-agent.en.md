# Plan: Human Arbitration Agent

## Purpose

Add a structure so the AI does not fake final certainty when multiple options or agent judgments are defensible, and instead routes the remaining judgment to the human.

## Work Mode

- `governance`

## Scope

- Add `REQ-WS-068`
- Add `human-arbitration-agent` config and Korean/English docs
- Update persistent instructions and `agent-platform/README.md`
- Add a memory bootstrap anchor
- Save history, provenance, plan evidence, and evaluation records

## Out Of Scope

- Runtime arbitration engine implementation
- Notification token setup
- UI card implementation

## Implementation Order

1. Record evidence from official sources on human oversight, accountability, and management systems.
2. Define a role that does not duplicate `human-decision-inbox`, `principle-guardian-agent`, or `spec-reconciliation-agent`.
3. Add the agent config and docs.
4. Update the requirements baseline and persistent instructions.
5. Run verification, omission, grounding, and evaluator checks, then commit and push.
