# Spec: pnpm Workspace Migration

## Goal

- Move npm-lockfile-based Node projects to a pnpm workspace.
- Make current verification and installation docs use pnpm.

## Scope

- Add root `package.json`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml`.
- Change `workspace-monitor`, `platform-desktop-app`, and `presentation-agent` package manifests plus current execution docs/configs.
- Remove project-level `package-lock.json` files.

## Non-Scope

- Adding new runtime dependencies.
- Changing Rust/Cargo dependencies.
- Retroactively rewriting all historical records.

## Acceptance Criteria

- `corepack pnpm install --frozen-lockfile` passes.
- `workspace-monitor` test/check/build/perf/customer checks pass through pnpm.
- `platform-desktop-app` test/check/monitor build pass through pnpm.
- `presentation-agent` resolves through pnpm and browser harness docs use pnpm commands.

