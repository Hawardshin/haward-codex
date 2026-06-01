# Requirement Review: Naming Rules And Audit

## Review Target

- `REQ-WS-035`
- User request: "name structure naming rules"

## Decision

- Status: approved
- Owners: `_ops/naming`, `_tools/naming-audit`, `_docs/governance`
- Change type: durable workspace governance

## Review Notes

- Naming rules should define defaults and validation criteria for new names, not mass-rename existing paths immediately.
- Existing durable paths are linked by docs and dashboard snapshots, so they should not be renamed without a migration plan.
- The audit reports only mechanically checkable gaps; commit messages remain a documented rule instead of a history rewrite check.

## Required Verification

- naming-audit clean
- docs-audit clean
- config contract clean
- memory bootstrap clean
- full workspace-health run
