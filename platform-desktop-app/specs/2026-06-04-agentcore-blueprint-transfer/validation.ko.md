# Validation: AgentCore Blueprint Transfer

## 완료된 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser smoke: `http://127.0.0.1:4175/`
  - Agents 화면에서 `Production 에이전트 블루프린트` 표시 확인
  - `Memory-Enabled Work Agent` 선택 확인
  - `에이전트 생성 입력 채우기` 클릭 후 Search Agent Work Chat과 Agent Factory 입력 변경 확인
  - 스크린샷: `outputs/agentcore-blueprint-smoke.png`

## 남은 검증

- Final full test/check before commit
