# Platform-First Host Runtime Request Trace

- Request ID: `UR-2026-06-02-058`
- Request summary: The user asked to stop treating the workspace/product as running on Codex or another commercial agent tool, and instead launch the platform first, then mount external AI CLIs on top.
- Work mode: `governance`

## Outcome

- Updated persistent instructions, AGENTS entrypoint, and platform identity to platform-first host runtime.
- Added `platform_is_primary_host_runtime`, `host_runtime_model`, and `guest_adapter_on_platform` contracts to the CLI adapter registry.
- Updated desktop/user-flow registries, architecture docs, product boundary, packaging docs, requirements/specs/readiness tests.
- Updated Workspace Monitor Desktop tab to show `Platform-first host`, `Guest adapters`, and `Platform state owner`.

## Artifacts

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/operating-models/platform-identity-operating-model.ko.md`

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `check-config-contract` for CLI adapter, desktop registry, user-flow registry, assistant runtime registry, and memory bootstrap manifest
- Built-output HTTP/string validation was completed; desktop/mobile screenshot validation is deferred because browser automation dependencies were unavailable and Computer Use permissions remained pending.
