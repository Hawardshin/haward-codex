# Request Trace: CLI Task Run Detail and Prune

- Request ID: UR-2026-06-03-005
- Request summary: Continue implementing platform source code.
- Owning projects: `platform-desktop-app/`, `workspace-monitor/`

## Outcome

- Added Tauri `read_cli_task_run_record` to read saved `record.json`, `stdout.log`, and `stderr.log` as bounded previews.
- Added Tauri `prune_cli_task_run_records` to keep the latest 30 records by default and remove older task-run directories.
- Restricted prune targets to canonical directories inside the task-run store.
- Added Workspace Monitor Desktop `Open Logs`, `Prune Old`, and stdout/stderr/record JSON preview UI.

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
