# 요청-결과 추적: 작업 중심 네비게이션과 Operator Center 분리

- 요청 ID: UR-2026-06-03-036
- 날짜: 2026-06-03
- 소유 프로젝트: `platform-desktop-app/`
- 결과 상태: ready_to_validate

## 요청 요약

- 플랫폼의 주 목적은 모니터링이 아니라 agent orchestration, agent work environment, development environment, agent factory, 자동 생성/학습/성능 개선 플랫폼이다.
- 작업 surface가 주가 되고 monitoring/operator/admin surface는 별도로 분리되어야 한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/OperatorCenterDialog.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `agent-platform/configs/access/view-mode-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `platform-desktop-app/specs/2026-06-03-agent-platform-feature-architecture/`

## 검증 계획

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- in-app Browser에서 기본 nav와 Operator Center 분리 확인

## 결과 요약

- 기본 activity rail/sidebar는 작업 섹션만 전면에 두도록 변경했다.
- 운영/모니터링/문서/요구사항/구조 섹션은 Operator Center dialog에서 열리도록 분리했다.
- user view와 customer snapshot allowed sections를 작업 중심으로 바꿨다.
- readiness/test/check가 운영 섹션 회귀를 잡도록 보강됐다.
