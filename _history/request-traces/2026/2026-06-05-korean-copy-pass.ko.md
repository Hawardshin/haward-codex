# Request Trace: Korean Copy Pass

- 요청: 한글이 어색한 UI 문구를 고치기.
- 요구사항: PDA-REQ-045.
- 주요 변경 파일:
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/tool-studio/data.ts`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 검증:
  - `corepack pnpm --filter workspace-monitor test`: pass, 52 tests.
  - `corepack pnpm --filter workspace-monitor run check`: pass.
  - `corepack pnpm --filter workspace-monitor run build`: pass.
