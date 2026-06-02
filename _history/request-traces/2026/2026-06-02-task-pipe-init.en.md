# Task Pipe Init Request Trace

- Request ID: `UR-2026-06-02-059`
- Request summary: The user asked to implement the direction where diverse CLIs are initialized from diverse tasks through a pipe structure.
- Work mode: `governance`

## Outcome

- Added `list_cli_task_pipeline_presets` and `start_cli_task_pipeline` to the Rust/Tauri backend.
- Added a `Task Pipe Init` panel to the Workspace Monitor Desktop tab.
- Updated the CLI adapter registry, desktop registry, user-flow registry, requirements, spec, and readiness test.

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `check-config-contract`
- Additional build/evaluator validation is recorded in the close-out evaluation.
