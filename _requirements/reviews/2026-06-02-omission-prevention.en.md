# 2026-06-02 Omission Prevention Requirement Review

## Review Target

- Requirement: `REQ-WS-056`
- Source request: `UR-2026-06-02-011`

## Decision

Approved. The platform already requires separate targets for web search, requirements, specs, timing, and work modes, but it lacked an independent gate that checks required items one by one against the user's instruction and confirms that nothing important was silently missed.

## Rationale

- Checklist-style operation helps reduce missed items when people cannot rely on memory alone for repeatable work.
- Requirements traceability is useful for finding missing links between requirements and verification.
- Existing `REQ-WS-055` enforces work modes, but it does not by itself require item-level omission coverage.

## Acceptance Criteria

- `omission-guard-agent` or an equivalent coverage check exists.
- `work-evaluator-agent` returns a gap when non-`quick` work omits `omission_check_targets`.
- Work mode registry and persistent instructions explain the policy.
- Unit tests and CLI checks pass.
