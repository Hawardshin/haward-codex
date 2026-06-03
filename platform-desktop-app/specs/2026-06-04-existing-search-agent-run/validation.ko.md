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
- Browser smoke for Agents screen and Desktop search-agent work chat

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
  - Agents screen: `검색 에이전트 작업 채팅`, `작업 시작`, `research-insight-planner-agent`, `research-insight-plan-template` visible
  - Desktop runtime: `바로 쓰기`, `검색 에이전트 작업 채팅`, `research-insight-planner-agent` visible
- Screenshot: `outputs/browser-smoke/existing-search-agent-run.png`

## 참고

- Next dev server smoke did not hydrate to snapshot fetch in this environment, so the final UI smoke used the exported static customer build.
- Both validation servers were stopped after testing; an unrelated local `http.server` on port 3018 remained running and was not touched.

## 2026-06-04 작업 채팅 전환 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: passed
- JSON parse for changed product/user-flow/runtime-contract/history JSON: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: passed, `self_documenting`
- `corepack pnpm --filter platform-desktop-app test`: passed, 21 tests
- `corepack pnpm --filter workspace-monitor test`: passed, 17 tests
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed
- Browser smoke on static output `http://127.0.0.1:4182`: passed
  - Agents screen: `검색 에이전트 작업 채팅`, `작업 시작`, `research-insight-planner-agent`, `research-insight-plan-template` visible
  - Clicking `작업 시작` stays in the work chat and appends runtime-link/preview messages
  - Desktop runtime quick start and command grid expose `검색 에이전트 작업 채팅`
- Screenshot: `outputs/browser-smoke/agent-chat-workbench.png`
- Browser plugin API fallback: in-app browser runtime did not expose `browser.nameSession`; validation used bundled Playwright instead.
- Static preview limitation: the native Tauri runtime is unavailable in the browser smoke, so actual CLI session startup is represented by the preview-mode chat message. Installed app execution path is covered by `start_cli_adapter_session` contract/readiness tests.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-04-agent-chat-workbench-omission-check.json`: passed, `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-04-agent-chat-workbench-resource.json`: passed, `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-04-agent-chat-workbench-evaluation-input.json`: passed, `ready_to_close`
