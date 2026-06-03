# 에이전트 플랫폼 기능 아키텍처 추적성

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| PDA-REQ-035 | `configs/product-feature-registry.json` | config contract, readiness/test |
| PDA-REQ-035 | `renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs` | workspace-monitor collector test |
| PDA-REQ-035 | `renderer/workspace-monitor/lib/snapshot.ts` | TypeScript check |
| PDA-REQ-035 | `renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx` | Browser smoke, TypeScript check |
| PDA-REQ-035 | `scripts/check-readiness.mjs`, `tests/readiness.test.mjs` | platform-desktop-app test/check |
| PDA-REQ-036 | `agent-platform/configs/access/view-mode-registry.json`, `renderer/workspace-monitor/scripts/collect-workspace.mjs` | config contract, customer build/test |
| PDA-REQ-036 | `renderer/workspace-monitor/components/MonitorShell.tsx`, `renderer/workspace-monitor/components/features/OperatorCenterDialog.tsx` | TypeScript check, Browser smoke |
| PDA-REQ-036 | `configs/product-feature-registry.json`, `scripts/check-readiness.mjs`, `tests/readiness.test.mjs` | readiness/test |
