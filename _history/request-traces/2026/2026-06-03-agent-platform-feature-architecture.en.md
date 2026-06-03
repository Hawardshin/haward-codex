# 2026-06-03 Agent Platform Feature Architecture Request Trace

## Request

Reframe the current shell, source review, runtime data, decision inbox, history, and monitoring pieces as product features. Monitoring must not be the main feature. The main product should be agent orchestration, agent work environment, development environment, easy agent creation, automatic agent creation, learning, and performance improvement.

## Outcome

- Added `product-feature-registry.json` to lock the primary product as `agent_capability_platform`.
- Defined Agent Orchestration, Agent Work Environment, Agent Development Environment, Agent Factory, and Learning & Evaluation Loop as primary feature layers.
- Defined Observability & Monitoring as supporting only.
- Added `productFeatureArchitecture` to the Workspace Monitor snapshot and stripped internal source paths, validation gates, and record targets from customer snapshots.
- Added `ProductFeatureArchitecturePanel` to Overview so the product feature structure appears on the first screen.
- Updated readiness, tests, and config-contract checks to validate product identity and the supporting observability role.

## Artifacts

- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/specs/2026-06-03-agent-platform-feature-architecture/`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.en.md`
- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`

## Validation

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`

## Remaining Improvements

- `MonitorShell.tsx` is still large; the next UI structure pass should split Desktop Runtime, Source Workbench, and Overview Home into components.
- The concrete Agent Factory creation wizard and automated learning/evaluation feedback loop remain next feature slices.
