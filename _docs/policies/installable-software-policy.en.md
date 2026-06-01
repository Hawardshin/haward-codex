# Installable Software Productization Policy

## Purpose

When turning the platform into software that an end user installs, separate repository setup from end-user installer packaging. Visual Studio-style installable software is owned by the `platform-desktop-app/` project.

## Rules

- Installable desktop app productization belongs in `platform-desktop-app/`.
- `agent-platform/configs/installations/install-mode-registry.json` describes repository user/developer setup modes, not DMG/MSIX/MSI/NSIS-style distribution packaging.
- The first desktop shell should evaluate reuse of `workspace-monitor/`.
- The installable app is not a single CLI wrapper. External CLIs attach as optional capabilities through `agent-platform/configs/integrations/cli-adapter-registry.json`.
- Compare at least two routes among Tauri, Electron, and native packaging-only before installing framework or packager dependencies.
- If dependency installation, upgrade, or removal actually occurs, create an installation audit record.
- Installers must not include real tokens, webhook URLs, browser cookies, private snapshots, or local-only secrets.
- macOS distribution requires signing and notarization gates; Windows distribution requires signing and installer format gates; Linux distribution requires format and uninstall behavior gates.
- Before calling a build production-ready, complete install, first-run, update, uninstall, rollback smoke tests plus privacy, security, and license review.

## Source Of Truth

- Project: `platform-desktop-app/`
- Distribution config: `platform-desktop-app/configs/desktop-distribution-registry.json`
- CLI adapter config: `agent-platform/configs/integrations/cli-adapter-registry.json`
- Workflow: `_ops/workflows/63-installable-software-productization.md`
- Prompt: `_ops/prompts/93-installable-software-productization.md`

## Current Baseline

As of 2026-06-02, the recommendation is a Tauri-first prototype, but the final decision is not locked. Electron and native-packaging-only remain comparison candidates.
