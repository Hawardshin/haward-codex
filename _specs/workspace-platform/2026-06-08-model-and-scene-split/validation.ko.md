# Validation: model and scene split

- 날짜: 2026-06-08

## 실행 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter platform-desktop-app run renderer:build`

## 결과

- 통과: `corepack pnpm --filter workspace-monitor test`
  - 120/120 tests passed.
- 통과: `corepack pnpm --filter workspace-monitor run check`
  - TypeScript, lazy boundary, scroll, source control design, comprehensive improvement, history payload checks passed.
- 통과: `corepack pnpm --filter workspace-monitor run build`
  - Next.js production build passed.
- 재시도 후 통과: `corepack pnpm --filter platform-desktop-app run renderer:build`
  - 첫 병렬 실행은 Next.js build lock 충돌로 실패했다.
  - 동일 명령을 단독 재실행해 customer build와 `customer-bundle:audit`가 통과했다.

## 파일 크기 결과

- `renderer/workspace-monitor/lib/snapshot.ts`: 95 lines.
- `renderer/workspace-monitor/lib/snapshotTypes.ts`: 5 lines.
- `renderer/workspace-monitor/lib/snapshotProjectTypes.ts`: 420 lines.
- `renderer/workspace-monitor/lib/snapshotCatalogTypes.ts`: 334 lines.
- `renderer/workspace-monitor/lib/snapshotReferenceTypes.ts`: 325 lines.
- `renderer/workspace-monitor/lib/snapshotRuntimeTypes.ts`: 231 lines.
- `renderer/workspace-monitor/types/desktop.ts`: 78 lines.
- `renderer/workspace-monitor/types/desktopTypes.ts`: 5 lines.
- `renderer/workspace-monitor/types/desktopCoreTypes.ts`: 235 lines.
- `renderer/workspace-monitor/types/desktopCliTypes.ts`: 259 lines.
- `renderer/workspace-monitor/types/desktopWorkspaceTypes.ts`: 249 lines.
- `renderer/workspace-monitor/types/desktopInteractionTypes.ts`: 139 lines.
- `renderer/workspace-monitor/components/workbench/tool-studio/useToolAgentScene.ts`: 432 lines.

## 남은 구조 압력

- `renderer/workspace-monitor/components/MonitorShell.tsx`: 13042 lines.
- `renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`: 1318 lines.
- 이 둘은 아직 500줄 기준을 넘지만 이번 slice의 type model과 scene lifecycle 분리는 완료됐다.
