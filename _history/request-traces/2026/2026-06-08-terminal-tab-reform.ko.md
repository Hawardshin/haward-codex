# 요청-결과 추적: 터미널 탭 개혁

## 요청

터미널 탭 기능을 개혁한다.

## 결과 대상

- `RuntimeTerminalDrawer.tsx`
- `RuntimeTerminalStartPanel.tsx`
- `runtimeTerminalCopy.ts`
- `globals.css`
- `tool-studio.test.mjs`
- `REQ-WM-077`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-08-terminal-tab-reform/`

## 검증 대상

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
- close-out guards
