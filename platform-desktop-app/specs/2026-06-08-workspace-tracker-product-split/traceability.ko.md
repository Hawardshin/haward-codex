# 추적성: workspace tracker product split

| 요구사항 | 구현 | 테스트/검증 |
| --- | --- | --- |
| REQ-WTPS-001, REQ-WM-078 | `product-feature-registry.json`, `product-feature-architecture.mjs`, README | readiness tests, config contract |
| REQ-WTPS-002, REQ-WM-079 | `view-mode-registry.json`, `MonitorShell.tsx` | `tool-studio.test.mjs`, readiness tests |
| REQ-WTPS-003, REQ-WM-082 | `workspace-tracker-product-split-registry.json`, `WorkspaceProductSplitPanel.tsx`, task intents | `collector.test.mjs`, `tool-studio.test.mjs` |
| REQ-WTPS-004, REQ-WM-080 | `product-feature-registry.json`, `ProductFeatureArchitecturePanel.tsx`, `agent-platform/README.md` | readiness tests |
| REQ-WTPS-005 | `workspace-tracker-product-split-registry.json`, `_ops/projects/registry.json` | config contract, README review |
| REQ-WTPS-006, REQ-WM-081 | `snapshot.ts`, `collect-workspace.mjs` | `collector.test.mjs` |
| REQ-WTPS-007, REQ-WM-083 | `WorkspaceProductSplitPanel.tsx`, navigation labels, command recommendations | `tool-studio.test.mjs`, build |
