# Structural Guardrails Spec

## Purpose

Reflect the user's “guardrails are necessary” instruction as an execution principle. A guardrail is defined as a structural execution boundary around risky actions, not as prompt wording.

## Requirement

- `REQ-WS-079`

## Scope

- Add a philosophy principle.
- Add `structural_guardrail_contract` to `ai-usage-gap-profile`.
- Add material-risk guardrail records to workflow and prompt behavior.
- Update memory bootstrap and persistent instructions.
- Create requirement, history, and evaluation records.

## Out Of Scope

- Implementing a linter for every prompt file.
- Installing an external guardrail SaaS or policy engine.
- Implementing a full runtime permission system.

## Acceptance Criteria

- Guardrails are explained as execution boundaries distinct from prohibition wording.
- Material-risk work records risk surface, selected guardrail, allowed/blocked actions, fallback/escalation, and verification evidence.
- `check-config-contract`, `check-philosophy-trace`, `check-memory-bootstrap`, omission, grounding, and evaluator pass.
