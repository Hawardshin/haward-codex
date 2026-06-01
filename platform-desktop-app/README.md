# Platform Desktop App

## Purpose

`platform-desktop-app/` is the productization project for turning this workspace platform into installable desktop software.

This is separate from `agent-platform/configs/installations/install-mode-registry.json`. The install mode registry decides how a maintainer sets up this repository as a user or developer. This project decides how an end user would install and run the platform as software, similar to a desktop application such as Visual Studio Code.

## Current Direction

- Treat the first installable product as a desktop shell over existing platform capabilities.
- Keep `workspace-monitor/` as the initial UI candidate instead of duplicating the monitoring interface.
- Design the first-run user flow before implementing installer code: open/create/demo workspace, confirm workspace boundary, select view mode, run required readiness checks, then reach the dashboard.
- Keep optional CLIs, notifications, browser automation, and advanced validators as capability cards that can be configured later instead of blocking initial use.
- Keep `agent-platform/` as the Python-first agent/config/evaluation layer.
- Do not bundle user secrets, webhook tokens, browser cookies, or private repository data into installers.
- Require distribution gates before calling a build production-ready: code signing, notarization where required, installer smoke tests, update policy, uninstall/rollback behavior, privacy review, and dependency/license review.

## Initial Framework Decision

The initial recommendation is a Tauri-first prototype because the platform already has web UI assets and Tauri can wrap web frontends with smaller native bundles. Electron remains a valid fallback when Node/Electron ecosystem maturity, extension-like integrations, or updater/distribution tooling is more important than bundle size.

Final framework selection is not locked. Before implementation, compare at least:

- Tauri desktop shell around `workspace-monitor`
- Electron desktop shell around `workspace-monitor`
- Native platform packaging only, if the platform becomes a CLI plus web UI instead of a desktop shell

## Structure

```text
platform-desktop-app/
  README.md
  artifacts/
  configs/
  docs/
  docs/requirements/
  specs/
  src/
  tests/
```

## Source Of Truth

- Distribution registry: `configs/desktop-distribution-registry.json`
- User flow registry: `configs/user-flow-registry.json`
- Product boundary: `docs/product-boundary.ko.md`
- Packaging strategy: `docs/packaging-strategy.ko.md`
- User flow: `docs/user-flow.ko.md`
- First-run onboarding: `docs/first-run-onboarding.ko.md`
- Flow map: `artifacts/user-flow-map.html`
- First spec: `specs/2026-06-02-installable-desktop/`

## Commands

No desktop framework dependency has been installed yet.

Current verification is documentation/config focused:

```bash
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json
```

When a desktop framework is actually installed later, create an installation audit record under `_history/installations/YYYY/` and update `_ops/installations/registry.json`.
