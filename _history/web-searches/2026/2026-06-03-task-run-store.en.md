# Web Search Record: CLI Task Run Store Implementation

- Date: 2026-06-03
- Request: Stop only making specs and implement the planned installable platform features.
- Queries:
  - `Rust std process Command Stdio stdin stdout stderr documentation`
  - `Tauri v2 command invoke state official documentation`
  - `Tauri v2 capabilities permissions documentation`

## Strong Sources Checked

- Rust `std::process::Command`: confirmed the official API for configuring `stdin`, `stdout`, and `stderr` with `Stdio` and using `spawn` to get a child process handle. <https://doc.rust-lang.org/std/process/struct.Command.html>
- Rust `std::process`: confirmed the official child-process I/O model for pipe setup and access through `Child`. <https://doc.rust-lang.org/stable/std/process/index.html>
- Tauri capabilities: confirmed the Tauri v2 security model for limiting window/webview access through capabilities. <https://v2.tauri.app/fr/reference/acl/capability/>

## Implementation Impact

- Kept external AI CLIs as guest process lanes using `Command` plus `Stdio::piped` rather than platform-internal logic.
- Persisted CLI stdout/stderr outside memory as split `record.json`, `stdout.log`, and `stderr.log` artifacts.
- Added a task-run persist signature so active polling rewrites record/log files only when state, output, or decision counters change.

## Uncertainty

- Rust toolchain is not installed in this environment, so actual Tauri compile/build validation was not possible. Static readiness, TypeScript, production build, and performance-budget checks were used instead.
