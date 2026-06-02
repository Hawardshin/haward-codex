# Requirement Review: Whole-Workspace Completeness Audit

## Decision

- Status: approved
- Baseline: `REQ-WS-075`
- Mode: `governance`

## Review

The request is not just a one-time inspection. It should strengthen the reusable quality gate so the same omissions do not recur. Updating the health tool, fixing root generated output false positives, and cleaning unfinished-looking spec signals is the right scope.

## Acceptance Criteria

- `workspace-health --include-build --json` passes.
- The health list includes privacy audit, current core config contracts, presentation browser validation, desktop readiness, and workspace-monitor build.
- `structure-audit` does not misclassify policy-declared root generated outputs as unknown roots.
- Stale `[ ] commit/push` checkboxes and `예정 검증` headings are cleaned up.
