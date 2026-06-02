# Traceability: Intent Feature Map UI

| Requirement | Implementation | Validation |
| --- | --- | --- |
| `REQ-WM-021` | `collectIntentFeatureMap` in `workspace-monitor/scripts/collect-workspace.mjs` | `npm --prefix workspace-monitor test` |
| `REQ-WM-021` | `WorkspaceIntentFeatureMap` in `workspace-monitor/lib/snapshot.ts` | `npm --prefix workspace-monitor run check` |
| `REQ-WM-021` | `IntentFeatureMapPanel` and `Intent Map` section in `workspace-monitor/components/MonitorShell.tsx` | `npm --prefix workspace-monitor run build` |
| Customer boundary | Empty `intentFeatureMap` in `buildCustomerSnapshot` | `npm --prefix workspace-monitor run build:customer` |
| View mode | Developer/superadmin allowed section in `agent-platform/configs/access/view-mode-registry.json` | `check-config-contract` |
| Freshness/regression checks | `workspace-monitor/scripts/check-intent-feature-map.mjs` and latest-source selection logic | `npm --prefix workspace-monitor run check:intent-map`, `npm --prefix workspace-monitor run check:intent-map:customer` |
