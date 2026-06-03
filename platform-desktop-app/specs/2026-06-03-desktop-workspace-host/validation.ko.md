# Desktop Workspace Host 검증

## 현재 통과

- `cargo fmt && cargo check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 14 tests.
- `corepack pnpm --filter platform-desktop-app run runtime:contract`: 통과.
- `corepack pnpm --filter platform-desktop-app run service:readiness`: 통과, workspace onboarding passed, public blockers 3.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 16 tests.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`, largest initial chunk 227542 bytes.
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: 통과.
- `corepack pnpm --filter platform-desktop-app run service:readiness:public:report`: 통과 report-only, public blockers 3.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-desktop-workspace-host-omission-input.json`: `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-desktop-workspace-host-resource-input.json`: `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-desktop-workspace-host-evaluation-input.json`: `ready_to_close`.
- `git diff --check`: 통과.
- Browser smoke: Runtime 화면에서 `Workspace Host`, `앱 워크스페이스`, `Import Workspace`, `Clone Workspace`, `managed root`, `state file`, `.desktop-workspace-panel` 확인. body/doc width 1280/1280, horizontal overflow false.
