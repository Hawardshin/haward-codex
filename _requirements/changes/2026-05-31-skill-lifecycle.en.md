# Requirement Change: Explicit Skill Lifecycle

## Change Summary

- Added `REQ-WS-014`.
- Custom skill creation and updates must leave source, trigger examples, validation, forward tests, improvement backlog, and evaluation targets.

## Source Request

- `UR-2026-05-31-038`: The user noted skill creation was not explicit enough and asked that created skills continue to be verified and improved.

## Impact

- `_skills/` source management
- `skill-lifecycle-agent`
- `validate-skill` CLI
- skill target checks in `work-evaluator-agent`
- skill creation/update close-out procedure

## Verification

- Confirm with `validate-skill` tests and real validation of `create-validated-skill`.

