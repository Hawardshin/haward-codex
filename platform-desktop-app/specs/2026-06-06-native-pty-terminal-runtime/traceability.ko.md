# 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PTY-001 | `PtySessionStore`, `start_native_pty_terminal`, `list_native_pty_terminal_sessions`, `poll_native_pty_terminal_session` | `cargo check`, readiness command tokens |
| REQ-PTY-002 | `NativePtyTerminalSurface`, xterm dynamic import, fit addon, web links addon, xterm CSS | `workspace-monitor run check`, Browser smoke 예정 |
| REQ-PTY-003 | 기존 `start_cli_adapter_session`, `write_cli_adapter_stdin`, decision inbox, task-run store 유지 | readiness 기존 command assertions |
| REQ-PTY-004 | bounded PTY output, writer drop, reader join, resize command, cancel command, finished retention cleanup | resource check record, `cargo check` |
| REQ-PTY-005 | validation record, package build, final build output | `validation.ko.md` |
