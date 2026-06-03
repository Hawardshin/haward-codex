# 검증: Codex/Claude Desktop 레퍼런스 반영

## 계획된 검증

- `python3 -m json.tool platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
- `git diff --check`

## 결과

- `python3 -m json.tool platform-desktop-app/configs/reference-platform-advantage-registry.json`: passed
- `python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/reference-platform-advantage-registry.json`: passed, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`: passed, `self_documenting`
- `corepack pnpm --filter platform-desktop-app test`: passed, 21 tests
- `corepack pnpm --filter workspace-monitor test`: passed, 17 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed
- `git diff --check`: passed
- Browser smoke on static output `http://127.0.0.1:4183`: passed
  - `Codex식 스레드 작업대`, `Claude Desktop식 커넥터 우선 채팅`, `Codex app`, `Claude Desktop` visible
  - Screenshot: `outputs/browser-smoke/codex-claude-desktop-reference.png`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-04-codex-claude-desktop-reference-omission-check.json`: passed, `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-04-codex-claude-desktop-reference-resource.json`: passed, `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-04-codex-claude-desktop-reference-evaluation-input.json`: passed, `ready_to_close`
