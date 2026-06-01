# Plan Record: Naming Rules And Audit

## Request

- Summary: define name structure and naming rules.
- Work mode: `governance`

## Evidence Checked

- Web search record: `_history/web-searches/2026/2026-06-01-naming-conventions-audit.en.md`
- Existing rules: `AGENTS.md`, `_ops/projects/root-structure-policy.json`, `_docs/registry.json`
- Related requirements: `REQ-WS-026`, `REQ-WS-027`, `REQ-WS-031`, `REQ-WS-035`

## Selected Direction

- Do not mass-rename existing durable paths.
- Store namespace-specific naming policy as a self-documenting config.
- Add both human-readable governance docs and executable naming audit.
- Connect naming audit to workspace-health so it stays in the full verification loop.

## Acceptance Criteria

- naming policy config contract passes
- naming-audit clean
- docs audit passes
- memory bootstrap passes
- full workspace-health run passes
