# Task Pipe Init Web-First Intake

- 날짜: 2026-06-02
- 요청 ID: `UR-2026-06-02-059`
- 요청 요약: task intake를 기준으로 다양한 CLI를 pipe 구조로 init하는 방향을 구현해 달라는 지시.

## Queries

- `Tauri v2 shell plugin command sidecar stdin stdout stderr official docs`
- `Node.js child_process spawn stdio pipe official documentation`
- `Rust std process Command stdin stdout stderr piped official documentation`
- `portable pty pipe CLI orchestration stdout stderr stdin macOS official docs`

## Checked Sources

- Node.js child_process official docs: `https://nodejs.org/api/child_process.html`
- Rust `std::process::Command` official docs: `https://doc.rust-lang.org/std/process/struct.Command.html`
- Rust `std::process::Stdio` official docs: `https://doc.rust-lang.org/std/process/struct.Stdio.html`
- Tauri sidecar docs: `https://v2.tauri.app/develop/sidecar/`
- Tauri shell JavaScript reference: `https://v2.tauri.app/reference/javascript/shell/`

## Plan Impact

- Pipe-based CLI init must explicitly model stdin, stdout, and stderr.
- Output must be continuously consumed and bounded because pipe buffers can block a subprocess if output is not captured.
- Tauri shell/sidecar integration remains a future dependency-audited path; this slice uses the existing Rust `std::process::Command` scaffold and does not install shell plugin dependencies.
- The platform should represent task pipe init as process/lane edges, not shell strings.

## Uncertainty

- Actual provider-specific CLI behavior still needs installed CLI smoke tests.
- Rust compile and Tauri dev/build remain gated by Rust/Tauri setup.
