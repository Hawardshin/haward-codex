# PTY Terminal Decision

## Decision

The installable desktop app adopts interactive PTY/xterm as the native live terminal surface. The existing pipe-first CLI supervisor remains the task execution and record path with task-run storage, decision inbox, bounded stdout/stderr previews, stdin/defer/cancel commands, and recovery-friendly records.

## Rationale

- The product is an agent orchestration and learning platform, not only a terminal emulator.
- The requested desktop-grade terminal needs OS pseudo terminal behavior, TTY detection, raw input, resize, and ANSI rendering rather than only piped stdin/stdout.
- Rust owns the PTY lifecycle through `portable-pty`; the renderer owns terminal rendering through `xterm.js` and `@xterm/addon-fit`.
- The current pipe-first path already connects task-run `record.json`, `stdout.log`, `stderr.log`, decision inbox, auto-defer, and support diagnostics, so it remains the governed agent-run path.

## Policy

- External CLIs remain guest adapters on the platform.
- Questions, approvals, and source-affecting work continue to route through the decision inbox and merge gates.
- Live terminal sessions use `start_native_pty_terminal`, `poll_native_pty_terminal_session`, `list_native_pty_terminal_sessions`, `write_native_pty_terminal_input`, `resize_native_pty_terminal`, and `cancel_native_pty_terminal`.
- PTY output is kept in bounded in-memory scrollback and reports truncation for long-running sessions.
- Process lifecycle, reader thread, writer handle, resize observer, and polling interval remain resource-guard validation targets.

## Validation

- `RuntimeTerminalDrawer` provides multi-CLI session start/list/output/events views.
- `start_cli_adapter_session`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, and `cancel_cli_adapter_session` remain available.
- The `RuntimeTerminalDrawer` PTY view provides a native PTY surface backed by `xterm.js`, `@xterm/addon-fit`, and a Rust PTY crate.
- `start_native_pty_terminal`, `write_native_pty_terminal_input`, `resize_native_pty_terminal`, and `cancel_native_pty_terminal` are registered in the Tauri runtime.
- The task-run store and support diagnostics continue preserving bounded output.
