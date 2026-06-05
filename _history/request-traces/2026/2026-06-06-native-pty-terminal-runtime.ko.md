# 요청-결과 추적: 네이티브 PTY 터미널 런타임

## 요청

- 터미널 기능 재검토.
- 데스크톱 앱답게 운영체제 자원을 쓰는 실제 터미널 구현.
- 구현 후 자동 빌드.

## 결과

- 기존 pipe-first 터미널의 한계를 확인하고 native PTY path를 추가했다.
- `portable-pty`와 xterm.js 기반 live terminal surface를 구현했다.
- 내부 패키징 빌드까지 완료했다.

## 주요 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/2026-06-06-native-pty-terminal-runtime.ko.md`
- `platform-desktop-app/specs/2026-06-06-native-pty-terminal-runtime/`
- `_history/installations/2026/2026-06-06-native-pty-terminal-portable-pty.ko.md`

## 검증

- `cargo check`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과.
- `corepack pnpm --dir platform-desktop-app run check`: 통과, developer snapshot 복원 후 stale customer warning만 존재.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
- Playwright DOM/CSS smoke: PTY tab and CSS rule 확인.
- `git diff --check`: 통과.
