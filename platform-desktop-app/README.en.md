# Platform Desktop App

This is the English README. The default Korean README is [README.md](./README.md), and the explicit Korean copy is [README.ko.md](./README.ko.md).

## Purpose

`platform-desktop-app/` productizes the personal agent-building platform as installable desktop software.

The app is not a thin wrapper around one CLI. The app launches first and owns workspace state, task state, decision inbox, artifacts, validation, accumulated data, and UI authority. Codex CLI, Claude Code CLI, Gemini CLI, OpenCode, and similar tools attach as optional guest adapters.

## One-Shot Commands

For first setup of dependencies and browser runtime only, run this from the repository root:

```bash
corepack pnpm run desktop:setup
```

For first setup plus full verification:

```bash
corepack pnpm run desktop:setup:verify
```

For fast repeated development verification:

```bash
corepack pnpm run desktop:verify:quick
```

If dependencies are already installed and you only want to verify:

```bash
corepack pnpm run desktop:verify
```

To rebuild and audit only the customer renderer without Tauri packaging:

```bash
corepack pnpm run desktop:renderer:build
```

To build the local/internal `.app` and DMG in one command:

```bash
corepack pnpm run desktop:package:internal
```

To check public distribution readiness in report-only mode:

```bash
corepack pnpm run desktop:release:report
```

To preview the command sequence without running it:

```bash
corepack pnpm --filter platform-desktop-app run pipeline:dry-run
```

## What The Commands Run

`desktop:setup` installs the workspace dependencies needed for the desktop app path from the lockfile, then installs the Workspace Monitor Playwright Chromium headless shell.

`desktop:verify:quick` runs Workspace Monitor check/test and desktop app test/check without rebuilding the renderer or Rust app.

`desktop:verify` runs:

- Workspace Monitor typecheck/test
- customer renderer build and customer bundle audit
- developer/customer snapshot checks
- desktop app Node tests
- runtime contract/readiness/customer bundle/internal release/service readiness checks
- Rust `cargo test`

`desktop:package:internal` runs `desktop:verify`, then Rust build, prepared-renderer Tauri build, macOS `codesign` verification, and DMG `hdiutil verify`. Direct Tauri builds (`corepack pnpm --filter platform-desktop-app run tauri:build`) still run the renderer build first, but the packaging pipeline reuses the already audited renderer output to avoid a duplicate Next.js build.

Internal build artifacts are expected at:

```text
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

The current macOS build uses ad-hoc signing for local/internal testing only. Do not call it public-ready.

## Release Docs

Use these runbooks for the actual release process:

- Korean: [docs/release-runbook.ko.md](./docs/release-runbook.ko.md)
- English: [docs/release-runbook.en.md](./docs/release-runbook.en.md)

Public distribution remains blocked until these gates pass:

- Developer ID or equivalent OS signing
- macOS notarization and stapling when applicable
- Windows code signing / SmartScreen handling
- signed updater channel
- clean-machine install/open/update/uninstall smoke tests
- privacy/dependency/license review

## Product Direction

- The product is an `agent_capability_platform`, not a monitoring dashboard.
- Primary features are agent orchestration, agent work environment, agent development environment, agent factory, and the learning/evaluation loop.
- Monitoring, history, requirements, and structure surfaces stay in Operator Center or supporting observability.
- Remaining P0 product gaps are tracked in [configs/product-gap-registry.json](./configs/product-gap-registry.json).

## Key Files

- Product feature structure: [configs/product-feature-registry.json](./configs/product-feature-registry.json)
- Remaining product gaps: [configs/product-gap-registry.json](./configs/product-gap-registry.json)
- Installer shell runtime contract: [runtime-contracts/installer-shell-runtime-contract.json](./runtime-contracts/installer-shell-runtime-contract.json)
- macOS execution profile: [configs/macos-execution-profile.json](./configs/macos-execution-profile.json)
- Windows execution profile: [configs/windows-execution-profile.json](./configs/windows-execution-profile.json)
- Renderer UI source: [renderer/workspace-monitor/](./renderer/workspace-monitor/)
- Tauri shell: [src-tauri/](./src-tauri/)

## Structure

```text
platform-desktop-app/
  README.md
  README.ko.md
  README.en.md
  artifacts/
  configs/
  docs/
  renderer/workspace-monitor/
  runtime-contracts/
  scripts/
  specs/
  src-tauri/
  tests/
```

## Current Status

- Tauri v2/Rust is the selected desktop runtime.
- `platform-desktop-app/renderer/workspace-monitor/` is the product renderer source.
- Internal verification and internal test build paths are ready.
- Public release still needs signing, notarization, updater, and clean-machine smoke gates.
