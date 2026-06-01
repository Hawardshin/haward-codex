# Traceability

## 요청

- `UR-2026-06-02-005`: 에이전트들이 무엇이 있는지와 히스토리를 시각화해달라는 요청.

## 요구사항

- `REQ-WM-009`
- `REQ-WM-010`

## 구현 파일

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/src/generated/workspace-snapshot.json`
- `workspace-monitor/public/workspace-snapshot.json`

## 검증

- `npm test`
- `npm run check`
- `npm run collect`
- `npm run build`
- browser/Playwright smoke check
