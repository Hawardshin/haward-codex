# 검증: 기존 검색 에이전트 실행

## 계획된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `cargo check` from `platform-desktop-app/src-tauri`
- `python3 -m json.tool` for changed JSON registries/contracts
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/research-insight-planner-agent.json`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser smoke for Agents screen and Desktop search-agent quick run

## 결과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: passed
- `cargo check` from `platform-desktop-app/src-tauri`: passed
- `python3 -m json.tool platform-desktop-app/configs/product-feature-registry.json`: passed
- `python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json`: passed
- `python3 -m json.tool platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/research-insight-planner-agent.json`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed, 21 tests
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter workspace-monitor test`: passed, 17 tests
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed
- `git diff --check`: passed
- Browser smoke on static output `http://127.0.0.1:4178`: passed
  - Agents screen: `검색 에이전트 바로 실행`, `research-insight-planner-agent`, `research-insight-plan-template` visible
  - Desktop runtime: `바로 쓰기`, `검색 에이전트 실행`, `research-insight-planner-agent` visible
- Screenshot: `outputs/browser-smoke/existing-search-agent-run.png`

## 참고

- Next dev server smoke did not hydrate to snapshot fetch in this environment, so the final UI smoke used the exported static customer build.
- Both validation servers were stopped after testing; an unrelated local `http.server` on port 3018 remained running and was not touched.
