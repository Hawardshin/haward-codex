# 요청 결과 추적: Terminal Agent Bridge

날짜: 2026-06-06

## 요청

터미널 연결 기능과 에이전트 기능을 제대로 연결한다.

## 결과

- Desktop Runtime에 PTY -> CLI adapter -> agent session bridge UI 추가.
- `createNativePtySession`, `createCliAdapterSession`, `startTerminalAgentBridge` 추가.
- 기존 start-selected-lane action feedback 실패 전파 보강.
- CSS와 test contract 추가.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/specs/2026-06-06-terminal-agent-bridge/`

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm -w run desktop:renderer:build`
- Browser smoke
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
- `corepack pnpm --dir platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-06-terminal-agent-bridge-input.json`
- `git diff --check`
