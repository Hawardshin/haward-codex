# Requirement Change: Naming Rules And Audit

## Change Summary

- Added requirement: `REQ-WS-035`
- Source request: `UR-2026-06-01-019`
- Work mode: `governance`

## Change

Names for projects, tools, skills, docs, specs, history, configs, and source code are managed through namespace-specific rules. The human-readable guide lives in `_docs/governance/naming-governance.en.md`, the machine-readable source of truth lives in `_ops/naming/naming-policy.json`, and `_tools/naming-audit/` performs deterministic checks.

## Acceptance Criteria

- The naming policy config is self-documenting.
- Korean and English naming governance docs exist.
- naming-audit returns clean for the current repository.
- workspace-health governance checks include naming audit.
- memory bootstrap and config contract include the naming policy.
