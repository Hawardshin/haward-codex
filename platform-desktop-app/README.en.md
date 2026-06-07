# Platform Desktop App

This is the English README. The default Korean README is [README.md](./README.md), and the explicit Korean copy is [README.ko.md](./README.ko.md).

## Purpose

`platform-desktop-app/` is the desktop app for importing, opening, running, and tracking work across multiple Git workspaces and AI coding tools.

The app is not a thin wrapper around one CLI. The app launches first and owns Git workspace state, task timeline, terminal run state, decision inbox, evidence, reports, validation, and UI authority. Codex CLI, Claude Code CLI, Cursor, Antigravity, Gemini CLI, OpenCode, and similar tools attach as optional guest adapters.

Agent creation, tool-platform management, Ollama model management, and AWS AgentCore-style runtime, gateway, and identity capabilities are not default user-facing desktop surfaces. Those capabilities belong to the separated `agent-platform/` project. The desktop app focuses on helping the user see current Git repositories, terminal runs, plans, reports, and evidence in work order.

## One-Shot Commands

For first setup of dependencies and browser runtime only, run this from the repository root:

```bash
corepack pnpm run desktop:setup
```

For first setup plus full verification:

```bash
corepack pnpm run desktop:setup:verify
```

To run the desktop app in development mode:

```bash
corepack pnpm run desktop:dev
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

To quickly diagnose a blocked setup or build:

```bash
corepack pnpm run desktop:doctor
```

To build the local/internal `.app` and DMG in one command:

```bash
corepack pnpm run desktop:package:internal
```

To run an already built local/internal `.app`:

```bash
corepack pnpm run desktop:run:internal
```

To build the local/internal `.app` and DMG and then open the app:

```bash
corepack pnpm run desktop:package:run:internal
```

To check public distribution readiness in report-only mode:

```bash
corepack pnpm run desktop:release:report
```

To create a local developer updater signing env scaffold:

```bash
corepack pnpm run desktop:release:dev-env
```

To build public artifacts after signing, updater, and notarization environment variables are configured:

```bash
corepack pnpm run desktop:package:public
```

To preview the command sequence without running it:

```bash
corepack pnpm --filter platform-desktop-app run pipeline:dry-run
```

## What The Commands Run

`desktop:setup` installs the workspace dependencies needed for the desktop app path from the lockfile, then installs the Workspace Monitor Playwright Chromium headless shell.

`desktop:dev` runs the app in Tauri development mode and starts the Workspace Monitor dev server automatically.

`desktop:verify:quick` runs Workspace Monitor check/test and desktop app test/check without rebuilding the renderer or Rust app.

`desktop:doctor` checks Node, pnpm, Rust/Cargo, Tauri CLI, the Playwright browser cache, customer bundle boundaries, and internal/public release gates. Public signing, notarization, updater, and clean-machine smoke gaps are reported as warnings rather than local/internal developer verification failures.

`desktop:verify` runs:

- Workspace Monitor typecheck/test
- customer renderer build and customer bundle audit
- developer/customer snapshot checks
- desktop app Node tests
- runtime contract/readiness/customer bundle/internal release/service readiness checks
- Rust `cargo test`

`desktop:package:internal` runs `desktop:verify`, then Rust build, prepared-renderer Tauri build, macOS `codesign` verification, and DMG `hdiutil verify`. Direct Tauri builds (`corepack pnpm --filter platform-desktop-app run tauri:build`) still run the renderer build first, but the packaging pipeline reuses the already audited renderer output to avoid a duplicate Next.js build.

`desktop:run:internal` opens the macOS `.app` produced by `desktop:package:internal`. If the artifact is missing, it fails with the package command to run first.

`desktop:package:run:internal` builds the local/internal `.app` and DMG, then runs `desktop:run:internal`.

`desktop:release:dev-env` creates a Tauri updater dev key under ignored `src-tauri/target/public-release/dev/` and writes an export file for `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_UPDATER_ENDPOINTS`, and `TAURI_RELEASE_ASSET_BASE_URL`. It does not create Apple Developer ID signing/notarization credentials and does not mean the app is public-ready.

`desktop:package:public` runs `desktop:verify` and public preflight, then creates a temporary public Tauri config from `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_ENDPOINTS`, `TAURI_RELEASE_ASSET_BASE_URL`, and Apple signing/notarization environment variables. It builds signed updater artifacts and a static `latest.json` manifest without writing the private updater key or Apple credentials into the repository.

## Build Pipeline Structure

- `scripts/desktop-pipeline.mjs`: CLI entrypoint
- `scripts/desktop-pipeline/paths.mjs`: repository, Tauri, artifact, and prepared build config paths
- `scripts/desktop-pipeline/definitions.mjs`: setup, quick verify, full verify, package, and public report step definitions
- `scripts/desktop-pipeline/runner.mjs`: dry-run handling, platform skips, subprocess execution, and failure handling
- `scripts/public-release-config.mjs`: public signing/updater environment validation and generated Tauri config
- `scripts/public-release-dev-env.mjs`: local developer updater signing env scaffold
- `scripts/public-release-build.mjs`: public Tauri build runner
- `scripts/create-updater-manifest.mjs`: static updater `latest.json` generator

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
- macOS entitlements file wiring
- Windows code signing / SmartScreen handling
- signed updater channel: `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_ENDPOINTS`
- clean-machine install/open/update/uninstall smoke tests
- privacy/dependency/license review

## Product Direction

- The product center is `workspace_tracker`.
- Default users see Git workspace import, terminal and AI tool execution, work timeline, reports/evidence, requirements, and documents first.
- Codex, Claude Code, Cursor, Antigravity, and similar tools are guest AI tools, not a single hard dependency for the app.
- Agent factory, root tool management, Ollama model management, provider direct agent run, and AWS AgentCore-style runtime lifecycle move to `agent-platform/`.
- Remaining P0 product gaps are tracked in [configs/product-gap-registry.json](./configs/product-gap-registry.json).

## Key Files

- Product feature structure: [configs/product-feature-registry.json](./configs/product-feature-registry.json)
- Workspace product split structure: [configs/workspace-tracker-product-split-registry.json](./configs/workspace-tracker-product-split-registry.json)
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
