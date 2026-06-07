# 2026-06-08 large-scope decomposition

## Source inventory

- Runtime: `platform-desktop-app/src-tauri/src/lib.rs`, `src-tauri/src/features/*`
- Terminal UI: `renderer/workspace-monitor/components/MonitorShell.tsx`, `RuntimeTerminalDrawer.tsx`
- Terminal split modules: `renderer/workspace-monitor/components/workbench/runtime-terminal/*`
- Readiness scripts/tests: `platform-desktop-app/scripts/*`, `platform-desktop-app/tests/*`, `renderer/workspace-monitor/tests/*`

## Slices

- Slice A: Codex CLI/AI CLI first-run PTY 실행 경로 복구
- Slice B: Rust `lib.rs` 500줄 이하 물리 분리
- Slice C: 터미널 드로어 TypeScript 표면 500줄 이하 분리
- Slice D: readiness/test aggregation 보정
- Slice E: 기존 대형 TypeScript 파일 전면 분리, 별도 후속 리팩터링

## Touch paths

- Slice A-D는 이번 변경에 포함했다.
- Slice E는 `MonitorShell.tsx`, `ToolStudioPanel.tsx`, `SearchAgentWorkChatPanel.tsx`, `snapshot.ts`, `desktop.ts` 등 기존 큰 파일을 포함하므로 별도 commit 단위가 필요하다.

## Merge gate

- Rust check/test, renderer check/test, desktop check/test, renderer customer build
