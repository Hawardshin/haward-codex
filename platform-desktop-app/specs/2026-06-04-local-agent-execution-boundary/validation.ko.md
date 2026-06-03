# Validation: Local Agent Execution Boundary

## 검증 명령

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json ../platform-desktop-app/configs/user-flow-registry.json ../platform-desktop-app/configs/service-readiness-registry.json ../platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `git diff --check`

## 수용 기준

- AgentCore proposal helper에 `local_python_agent_runtime`과 `local_process_execution`이 포함된다.
- Service readiness의 `local_python_execution_boundary` check가 통과한다.
- UI는 실제 에이전트/Python 실행이 로컬 runtime에서 일어난다고 설명한다.
- Lambda/cloud function은 실행 호스트가 아니라 optional connector로 기록된다.

