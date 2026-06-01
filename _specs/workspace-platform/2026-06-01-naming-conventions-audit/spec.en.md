# Spec: Naming Rules And Audit

## Goal

Manage durable repository names through namespace-specific rules and verify mechanically enforceable rules through an audit tool.

## Requirement

- `REQ-WS-035`

## Scope

- `_ops/naming/naming-policy.json`
- `_docs/governance/naming-governance.ko.md`
- `_docs/governance/naming-governance.en.md`
- `_tools/naming-audit/`
- `workspace-health` governance check
- memory bootstrap/config contract integration

## Behavior

- The naming policy explains case style and patterns by project/tool/skill/docs/spec/history/config/source/commit namespace.
- naming audit checks mechanically enforceable rules and exits non-zero when gaps exist.
- workspace-health runs naming audit in the governance category.

## Out of Scope

- Mass-renaming existing durable paths
- Rewriting git commit history
- Adding language-specific symbol linting for every language
