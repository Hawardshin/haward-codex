# 추적성: Dropdown Trigger Baseline

## 연결

- 사용자 요청: `_history/user-requests/2026/2026-06-05-dropdown-trigger-baseline.ko.md`
- 요구사항: `REQ-WM-065`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-dropdown-trigger-baseline/spec.ko.md`
- 계획: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-dropdown-trigger-baseline/plan.ko.md`
- 작업: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-dropdown-trigger-baseline/tasks.ko.md`
- 검증: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-dropdown-trigger-baseline/validation.ko.md`

## 구현 대상

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`

## 검증 대상

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- Browser dropdown smoke
- `git diff --check`
