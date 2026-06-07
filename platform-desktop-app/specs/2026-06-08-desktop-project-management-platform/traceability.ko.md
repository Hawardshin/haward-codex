# 추적성: desktop project management platform

| 요구사항 | 구현 | 테스트/검증 |
| --- | --- | --- |
| REQ-DPMP-001, REQ-WM-084 | `ProjectManagementPanel.tsx`, `MonitorShell.tsx` | `tool-studio.test.mjs`, Browser smoke |
| REQ-DPMP-002, REQ-WM-085 | `snapshot.ts`, `collect-workspace.mjs` | `collector.test.mjs`, generated snapshots |
| REQ-DPMP-003, REQ-WM-087 | `sanitizeProjectManagementForCustomer` | `collector.test.mjs`, customer bundle check |
| REQ-DPMP-004, REQ-WM-088 | `workspace-tracker-product-split-registry.json`, collector fallback | `check-config-contract`, `collector.test.mjs` |
| REQ-DPMP-005, REQ-WM-086 | localized lane/action copy in `ProjectManagementPanel.tsx` | Browser smoke DOM check |
| REQ-DPMP-006 | responsive CSS and mobile Browser smoke | Browser mobile viewport check |
