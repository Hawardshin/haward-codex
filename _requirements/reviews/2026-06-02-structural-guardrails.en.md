# Requirement Review: Structural Guardrails

## Review Target

- Requirement: `REQ-WS-079`
- Request: The user said guardrails are necessary.

## Review Result

- Approved: `must`
- Reason: `REQ-WS-078` covers prohibition rewriting, but a separate requirement is needed for selecting and recording guardrails as execution boundaries.

## Acceptance Criteria

- The philosophy document includes a guardrail principle.
- `ai-usage-gap-profile` includes a structural guardrail contract.
- The workflow and prompt require a guardrail record when material risk exists.
- History, web search, omission, grounding, and evaluation records exist.
