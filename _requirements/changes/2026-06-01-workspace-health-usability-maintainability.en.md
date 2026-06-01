# Requirement Change: Workspace Health Usability And Maintainability

## Change Summary

- Added requirement: `REQ-WS-033`
- Related request: `UR-2026-06-01-017`
- Change date: 2026-06-01

## Change

Repository operations CLIs should separate terminal-friendly human output from JSON output for automation and dashboards. They should also provide category filters so maintainers can run only the checks they need.

## Rationale

- As the whole-workspace health check grows, running every check every time can be slow and makes failure localization harder.
- JSON output lets dashboards, CI, and future agents reuse results structurally.

## Impact

- `_tools/workspace-health/` now supports `--category`, `--json`, and `--list --json`.
- Documentation and tests verify category and JSON behavior.
