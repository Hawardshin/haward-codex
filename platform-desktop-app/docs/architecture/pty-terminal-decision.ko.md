# PTY Terminal Decision

## 결정

설치형 데스크톱 앱은 interactive PTY/xterm을 네이티브 터미널 surface로 채택한다. 기존 pipe-first CLI supervisor는 task-run store, decision inbox, bounded stdout/stderr preview, stdin/defer/cancel command를 유지하는 작업 실행/기록 경로로 남긴다.

## 이유

- 플랫폼의 목적은 단순 터미널 에뮬레이터가 아니라 agent orchestration, 작업 기록 축적, 결정 보류, 검증, rollback 추적이다.
- 현재 pipe-first 구조는 task-run `record.json`, `stdout.log`, `stderr.log`, decision inbox, auto-defer, support diagnostic export와 이미 연결되어 있다.
- 사용자가 요구한 “데스크톱 앱답게 OS 자원을 쓰는 터미널”은 pipe-only stdin/stdout보다 OS pseudo terminal, TTY 인식, raw input, resize, ANSI rendering이 필요하다.
- PTY는 `portable-pty`로 Rust runtime이 소유하고, 화면 렌더링은 `xterm.js`와 `@xterm/addon-fit`로 처리한다.
- pipe-first 구조는 task-run `record.json`, `stdout.log`, `stderr.log`, decision inbox, auto-defer, support diagnostic export와 이미 연결되어 있어 agent 작업 기록 경로로 유지한다.

## 정책

- external CLI는 계속 guest adapter로 취급한다.
- 질문, 승인, source-affecting 작업은 decision inbox와 merge gate를 우선한다.
- live terminal은 `start_native_pty_terminal`, `poll_native_pty_terminal_session`, `list_native_pty_terminal_sessions`, `write_native_pty_terminal_input`, `resize_native_pty_terminal`, `cancel_native_pty_terminal` command를 사용한다.
- PTY output은 bounded scrollback으로 앱 메모리에 유지하고, 긴 세션은 truncation 상태를 명시한다.
- process lifecycle, reader thread, writer handle, resize observer, polling interval은 resource guard 검증 대상으로 둔다.

## 검증

- `RuntimeTerminalDrawer`가 다중 CLI session start/list/output/events view를 제공한다.
- `start_cli_adapter_session`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, `cancel_cli_adapter_session` command가 유지된다.
- `RuntimeTerminalDrawer`의 PTY view가 `xterm.js`, `@xterm/addon-fit`, Rust PTY crate 기반 네이티브 PTY surface를 제공한다.
- `start_native_pty_terminal`, `write_native_pty_terminal_input`, `resize_native_pty_terminal`, `cancel_native_pty_terminal` command가 Tauri runtime에 등록된다.
- task-run store와 support diagnostic이 bounded output을 계속 보존한다.
