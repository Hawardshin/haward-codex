# 검증 계획

## 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor test`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `git diff --check`

## 브라우저 스모크

- customer build를 로컬 서버로 열고 `작업 실행` 또는 `Run` 화면에 진입한다.
- `Run Configuration`, `Services`, `Problems`, `작업 실행 구성`, `실행`, `터미널`이 렌더되는지 확인한다.
- 패널이 빈 화면이 아니며 버튼 텍스트가 넘치지 않는지 desktop/mobile viewport로 확인한다.
