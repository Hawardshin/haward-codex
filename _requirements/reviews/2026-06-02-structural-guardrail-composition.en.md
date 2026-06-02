# Structural Guardrail Composition Requirement Review

## Reviewed Requirement

- `REQ-WS-080`

## Fit

- Connects the user's guardrail and structural-composition requests.
- Implements the rule as a checkable `agent-platform` capability, not only documentation.
- Requires risk surfaces, allowed/blocked actions, failure handling, and verification evidence instead of prompt-only prohibitions.

## Duplication Review

- `REQ-WS-078`: converts prohibition-heavy instructions into positive behavior contracts.
- `REQ-WS-079`: states that material risk needs structural guardrails.
- `REQ-WS-080`: makes that principle executable through a JSON composition template and CLI checker.

## Decision

- Approved.
- Keep `REQ-WS-080` as a separate implementation requirement for `REQ-WS-079`.
