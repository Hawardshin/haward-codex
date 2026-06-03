# 추적성: Intent Feature Map UI

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-021` | `workspace-monitor/scripts/collect-workspace.mjs`의 `collectIntentFeatureMap` | `npm --prefix workspace-monitor test` |
| `REQ-WM-021` | `workspace-monitor/lib/snapshot.ts`의 `WorkspaceIntentFeatureMap` | `npm --prefix workspace-monitor run check` |
| `REQ-WM-021` | `workspace-monitor/components/MonitorShell.tsx`의 `IntentFeatureMapPanel`과 `Intent Map` 섹션 | `npm --prefix workspace-monitor run build` |
| 고객 경계 | `buildCustomerSnapshot`의 빈 `intentFeatureMap` | `npm --prefix workspace-monitor run build:customer` |
| view mode | `agent-platform/configs/access/view-mode-registry.json`의 developer/superadmin allowed section | `check-config-contract` |
| 최신성/회귀검사 | `workspace-monitor/scripts/check-intent-feature-map.mjs`와 최신 source 선택 로직 | `npm --prefix workspace-monitor run check:intent-map`, `npm --prefix workspace-monitor run check:intent-map:customer` |
