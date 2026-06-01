# Requirement Review: AI Usage Gap And Bridge

## Target

- `REQ-WS-042`

## Fit

- The user requested durable platform behavior, not only a one-off answer.
- The repository already had research, search, and evaluation structures, but no dedicated profile for diagnosing and improving AI-use maturity.
- The new requirement is compatible with work modes, spec-driven operation, source grounding, and capability promotion.

## Decision

Adopt `REQ-WS-042` as a shared workspace requirement.

## Verification Criteria

- `ai-usage-gap-profile.json` passes the self-documenting config contract.
- The workflow, prompt, router, index, and memory bootstrap expose the new profile.
- Evaluation input links web search records, requirements, specs, source provenance, plan evidence, and timing summary.
