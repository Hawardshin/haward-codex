# PTY Terminal Decision

## Decision

The installable desktop app does not adopt interactive PTY/xterm as the default primary terminal surface at this stage. The default terminal remains the pipe-first CLI supervisor with task-run storage, decision inbox, bounded stdout/stderr previews, stdin/defer/cancel commands, and recovery-friendly records.

## Rationale

- The product is an agent orchestration and learning platform, not only a terminal emulator.
- The current pipe-first path already connects task-run `record.json`, `stdout.log`, `stderr.log`, decision inbox, auto-defer, and support diagnostics.
- xterm.js and native PTY can improve terminal fidelity, but they add process lifecycle, file descriptor cleanup, terminal escape sequence, clipboard, scrollback, security boundary, dependency audit, and rollback scope.
- The requested bottom multi-CLI terminal is implemented as a drawer/workbench. True PTY remains an optional extension rather than a required blocker.

## Policy

- External CLIs remain guest adapters on the platform.
- Questions, approvals, and source-affecting work continue to route through the decision inbox and merge gates.
- PTY adoption requires a separate slice with xterm.js, `@xterm/addon-fit`, a Rust PTY crate, lifecycle/resource guards, installation audit, rollback plan, and clean smoke tests.

## Validation

- `RuntimeTerminalDrawer` provides multi-CLI session start/list/output/events views.
- `start_cli_adapter_session`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, and `cancel_cli_adapter_session` remain available.
- The task-run store and support diagnostics continue preserving bounded output.
