# Traceability: 터미널 탭 개혁

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-077 | `RuntimeTerminalDrawer.tsx`, `RuntimeTerminalStartPanel.tsx`, `runtimeTerminalCopy.ts`, `globals.css` | `tool-studio.test.mjs`, `pnpm run check`, `pnpm test`, `pnpm run build` |
| 터미널 PTY 기능 유지 | `RuntimeNativePtyTerminalSurface.tsx` 기존 search/copy/paste/fit/quick command 유지 | `Native PTY terminal exposes search, clipboard, and quick command controls` |
