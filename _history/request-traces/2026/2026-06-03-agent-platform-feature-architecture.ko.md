# 2026-06-03 에이전트 플랫폼 기능 아키텍처 요청 추적

## 요청

현재 구현된 shell, source review, runtime data, decision inbox, history, monitoring 조각을 제품 기능으로 재구성하고, monitoring을 주기능으로 두지 않으며, 에이전트 오케스트레이션, 에이전트 작업 환경, 개발 환경, 손쉬운 에이전트 생성, 자동 생성, 학습과 성능 개선 플랫폼을 주기능으로 만든다.

## 결과

- `product-feature-registry.json`를 추가해 primary product를 `agent_capability_platform`로 고정했다.
- primary feature layer를 Agent Orchestration, Agent Work Environment, Agent Development Environment, Agent Factory, Learning & Evaluation Loop로 정의했다.
- Observability & Monitoring은 supporting feature로만 정의했다.
- Workspace Monitor snapshot에 `productFeatureArchitecture`를 추가하고 customer snapshot에서는 내부 source path, validation gate, record target을 제거했다.
- Overview에 `ProductFeatureArchitecturePanel`을 추가해 제품 기능 구조가 첫 화면에서 보이게 했다.
- readiness/test/check-config-contract가 product identity와 supporting observability 역할을 검증하게 했다.

## 산출물

- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/specs/2026-06-03-agent-platform-feature-architecture/`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`

## 남은 개선

- `MonitorShell.tsx`가 여전히 크므로 다음 UI 구조 개선에서는 Desktop Runtime, Source Workbench, Overview Home을 컴포넌트 단위로 더 분리한다.
- Agent Factory의 실제 agent creation wizard와 learning/evaluation feedback loop 자동화는 다음 feature slice로 구현한다.
