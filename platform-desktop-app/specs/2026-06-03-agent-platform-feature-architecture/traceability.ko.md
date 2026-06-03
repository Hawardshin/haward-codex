# 에이전트 플랫폼 기능 아키텍처 추적성

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| PDA-REQ-035 | `configs/product-feature-registry.json` | config contract, readiness/test |
| PDA-REQ-035 | `renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs` | workspace-monitor collector test |
| PDA-REQ-035 | `renderer/workspace-monitor/lib/snapshot.ts` | TypeScript check |
| PDA-REQ-035 | `renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx` | Browser smoke, TypeScript check |
| PDA-REQ-035 | `scripts/check-readiness.mjs`, `tests/readiness.test.mjs` | platform-desktop-app test/check |
