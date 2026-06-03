# Installable Software Productization Policy

## Purpose

When turning the platform into software that an end user installs, separate repository setup from end-user installer packaging. Visual Studio-style installable software is owned by the `platform-desktop-app/` project.

## Rules

- Installable desktop app productization belongs in `platform-desktop-app/`.
- `agent-platform/configs/installations/install-mode-registry.json` describes repository user/developer setup modes, not DMG/MSIX/MSI/NSIS-style distribution packaging.
- The desktop shell owns `platform-desktop-app/renderer/workspace-monitor/` as the selected product UI source. A separate UI requires a release-quality migration plan, trace update, and validation run first.
- Before desktop UI or installer implementation, check `platform-desktop-app/configs/user-flow-registry.json` and review first run, workspace chooser, view mode, optional setup deferral, task timeline, decision inbox, and recovery flows.
- The installable app is not a single CLI wrapper. External CLIs attach as optional capabilities through `agent-platform/configs/integrations/cli-adapter-registry.json`.
- Tauri is the currently selected product runtime. Re-evaluate Electron, Wails, or native-packaging-only only when a new release blocker or maintenance case is recorded.
- Use PoC, prototype, and initial-candidate language only for bounded experiments on new alternative routes. Do not downgrade the selected `platform-desktop-app/` product structure into a PoC or initial candidate.
- If dependency installation, upgrade, or removal actually occurs, create an installation audit record.
- Installers must not include real tokens, webhook URLs, browser cookies, private snapshots, or local-only secrets.
- macOS distribution requires signing and notarization gates; Windows distribution requires signing and installer format gates; Linux distribution requires format and uninstall behavior gates.
- Before calling a build production-ready, complete install, first-run, update, uninstall, rollback smoke tests plus privacy, security, and license review.

## Source Of Truth

- Project: `platform-desktop-app/`
- Distribution config: `platform-desktop-app/configs/desktop-distribution-registry.json`
- User-flow config: `platform-desktop-app/configs/user-flow-registry.json`
- CLI adapter config: `agent-platform/configs/integrations/cli-adapter-registry.json`
- Workflow: `_ops/workflows/63-installable-software-productization.md`
- Prompt: `_ops/prompts/93-installable-software-productization.md`

## Current Baseline

As of 2026-06-03, the baseline is the Tauri-first product runtime. `platform-desktop-app/renderer/workspace-monitor` is the desktop product-owned renderer UI source, while Electron, Wails, and native-packaging-only remain fallback/comparison routes only when a recorded release blocker or maintenance case justifies re-evaluation.
