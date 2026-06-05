# 네이티브 PTY 터미널 런타임 스펙

## 목표

하단 런타임 터미널에 실제 OS PTY 기반 shell surface를 추가한다. 기존 CLI supervisor는 agent-run 기록/결정함용으로 유지하고, 새 PTY surface는 사용자가 직접 조작하는 라이브 터미널로 분리한다.

## 구현 대상

- `src-tauri/src/lib.rs`
- `src-tauri/Cargo.toml`
- `renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `renderer/workspace-monitor/components/MonitorShell.tsx`
- `renderer/workspace-monitor/app/globals.css`
- `runtime-contracts/installer-shell-runtime-contract.json`
- `configs/product-gap-registry.json`
- readiness checks and architecture docs

## 런타임 계약

- `start_native_pty_terminal(workingDir?, command?, rows?, cols?)`
- `poll_native_pty_terminal_session(sessionId)`
- `list_native_pty_terminal_sessions()`
- `write_native_pty_terminal_input(sessionId, input)`
- `resize_native_pty_terminal(sessionId, rows, cols)`
- `cancel_native_pty_terminal(sessionId)`

## 설계

- Rust는 `portable-pty`로 PTY master/slave, child process, reader thread, writer handle, resize를 소유한다.
- Renderer는 `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-web-links`를 동적 import한다.
- xterm 인스턴스는 React render마다 재생성하지 않고 host mount 시 1회 생성한다.
- 입력은 16ms 단위로 buffer flush하고 Enter/Ctrl-C는 즉시 flush한다.
- 출력은 Rust bounded scrollback을 누적 report로 받고, xterm에는 delta만 write한다.
- PTY view는 기존 start/session/output/events view와 분리한다.

## 리스크

- PTY는 장기 실행 프로세스, reader thread, writer handle, resize observer, poll timer를 가진다.
- 이번 구현은 bounded in-memory output과 finished-session retention cleanup으로 메모리 증가를 제한한다.
- task-run 영구 로그 저장은 pipe-first supervisor가 담당하며, PTY 세션 영구 저장은 후속 slice로 남긴다.
