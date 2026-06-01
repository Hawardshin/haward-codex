# Requirement Change: Workspace Health And Source-of-Truth Navigation

## Change Summary

- Added requirement: `REQ-WS-032`
- Related request: `UR-2026-06-01-016`
- Change date: 2026-06-01

## Change

The repository-wide improvement request added a requirement that navigation and health checks should not rely on scattered manual procedures. They should read source-of-truth settings directly.

## Rationale

- `repository-map.md` previously showed some root folders with generic purposes even though root structure policy and project registry already held better metadata.
- Whole-repository checks were split across `docs-audit`, `structure-audit`, config contracts, memory bootstrap, project tests, and tool tests.

## Impact

- `_tools/workspace-index/` now reads root folder class, purpose, and source from policy/registry data.
- `_tools/workspace-health/` runs core audits and tests from one command.
