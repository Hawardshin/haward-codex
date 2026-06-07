# Traceability

## 요구사항 연결

- CLI 첫 실행 불가: `start_cli_adapter_pty_session`, MonitorShell PTY 라우팅
- 터미널과 실제 사용 PATH 차이: `resolve_command` PATH 후보와 로그인 셸 fallback
- PTY 필요: `create_native_pty_session` extra env와 어댑터 PTY command
- Rust 대형 파일: `src-tauri/src/lib.rs`, `src-tauri/src/lib_parts/*.rs`
- TypeScript 터미널 파일: `RuntimeTerminalDrawer.tsx`, `components/workbench/runtime-terminal/*`

## 주요 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/src/lib_parts/07_cli_session_runtime.rs`
- `platform-desktop-app/src-tauri/src/lib_parts/13_pty_runtime_and_output.rs`
- `platform-desktop-app/src-tauri/src/lib_parts/27_workspace_paths_and_command_resolution.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/runtime-terminal/*`

## 검증 기록

- `_history/evaluations/2026/2026-06-08-codex-cli-pty-first-run.ko.md`
- `_history/omission-checks/2026/2026-06-08-codex-cli-pty-first-run.ko.md`
- `_history/resource-checks/2026/2026-06-08-codex-cli-pty-first-run.ko.md`
