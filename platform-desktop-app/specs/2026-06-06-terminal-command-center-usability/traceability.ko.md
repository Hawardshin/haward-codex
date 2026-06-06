# Traceability: Terminal Command Center Usability

| 요구사항 | 구현 | 검증 |
|---|---|---|
| REQ-PDA-130 | `SearchAddon`, search input, previous/next actions | `tool-studio.test.mjs`, workspace-monitor check/test |
| REQ-PDA-131 | copy/paste/clear/fit toolbar, terminal custom key handler | `tool-studio.test.mjs` |
| REQ-PDA-132 | `nativePtyQuickActions`, quick command buttons | `tool-studio.test.mjs` |
| REQ-PDA-133 | `.native-pty-command-center`, `.native-pty-terminal-stage` bounded surface | `check-scroll-containers.mjs`, CSS static test |
| REQ-PDA-134 | installation record and registry entry | config contract, install audit |

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `pnpm-lock.yaml`
- `_history/installations/2026/2026-06-06-workspace-monitor-xterm-search-addon.ko.md`
- `_ops/installations/registry.json`
