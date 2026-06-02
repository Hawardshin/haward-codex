# Runtime Data Boundary Spec

## Scope

- `platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `platform-desktop-app/docs/architecture/runtime-data-boundary.*.md`
- `platform-desktop-app/docs/product-boundary.*.md`
- Persistent instructions, memory bootstrap, readiness/test gates

## Requirements

- Installed customers use the app, selected workspaces, redacted log summaries, and export surfaces.
- The installed customer product does not expose the platform source tree, internal specs/history, private snapshots, or unredacted logs as features.
- Runtime data planes are separated into app bundle, user workspace, platform data store, log store, agent workspace, and cache store.
- Log taxonomy is applied before retention, export, or model ingestion.
- Reusable agent definitions stay under `agent-platform/configs/agents/`; runtime work belongs in the agent workspace plane.

## Out Of Scope

- OS-specific storage adapter implementation
- Support bundle export UI implementation
- Installer payload scanner implementation
- Source-map build pipeline changes

## Acceptance Criteria

- The new registry satisfies the self-documenting config contract.
- `platform-desktop-app` readiness/test checks the new registry, docs, customer visibility, and log/agent/data plane tokens.
- The memory bootstrap manifest includes the runtime data boundary registry as a required warm anchor.
- Requirements, spec, web-search, plan, request trace, work summary, and evaluation artifacts are recorded.
