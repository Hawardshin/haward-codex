# Agent Platform Feature Architecture Validation

## Commands

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`

## Manual/Visual Check

- Verify in the in-app Browser that Overview shows `Agent Orchestration`, `Agent Factory`, `Learning & Evaluation Loop`, and `Observability is support`.
- Verify the customer snapshot keeps feature layers while removing `currentAssets`, `validationGates`, and internal record targets.
