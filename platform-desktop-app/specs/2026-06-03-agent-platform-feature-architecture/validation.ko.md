# 에이전트 플랫폼 기능 아키텍처 검증

## 명령

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`

## 수동/시각 검증

- in-app Browser에서 Overview가 `Agent Orchestration`, `Agent Factory`, `Learning & Evaluation Loop`, `Observability is support`를 표시하는지 확인한다.
- 고객 snapshot에서 feature layer는 남고 `currentAssets`, `validationGates`, 내부 record target은 제거되는지 확인한다.
