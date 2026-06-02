# Request Trace: CLI Task Run Store Implementation

- Request ID: UR-2026-06-03-004
- Request summary: Stop only making specs and implement the planned installable platform features.
- Owning projects: `platform-desktop-app/`, `workspace-monitor/`

## Outcome

- The Tauri runtime assigns `task_run_id`, task kind, and pipeline/lane provenance to CLI sessions and task pipe lanes.
- When status, stdout/stderr, or decision counts change, the runtime writes `platform-desktop-app/artifacts/task-runs/<task-run-id>/record.json`, `stdout.log`, and `stderr.log`.
- When no relevant state changed, the task-run persist signature skips file writes to reduce polling cost.
- The Workspace Monitor Desktop tab now includes a `Task Run Store` panel, task-run metric, refresh action, and session record/log path display.

## Implementation Files

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`

## Remaining Constraint

- Rust toolchain is not installed, so actual Tauri compile/build validation is still pending.
