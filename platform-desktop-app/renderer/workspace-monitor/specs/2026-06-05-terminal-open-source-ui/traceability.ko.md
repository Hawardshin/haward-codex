# Traceability: Terminal Open Source UI

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-040` terminal chrome/tab/emulator/prompt 구조 | `RuntimeTerminalDrawer.tsx`, `globals.css` | in-app Browser DOM/CSS audit, 1280/900/390px static export audit |
| `REQ-WM-040` 전역 터미널 버튼 라우팅 | `MonitorShell.tsx` `openTerminalDrawer` | overview titlebar button smoke, hash `#section-desktop`, drawer open |
| `REQ-WM-040` 작은 창 overflow 방지 | `globals.css` responsive terminal chrome overrides | static export viewport audit: body/drawer overflow 0 |
| 기존 scroll/source/design 계약 유지 | scoped CSS, no scroll lock regression | `pnpm --filter workspace-monitor run check` |
| 고객 bundle/내부 readiness 유지 | customer build output, platform check | `build:customer`, `perf:budget`, `platform-desktop-app check` |
