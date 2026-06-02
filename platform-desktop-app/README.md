# Platform Desktop App

## Purpose

`platform-desktop-app/` is the productization project for turning this workspace platform into installable desktop software.

This is separate from `agent-platform/configs/installations/install-mode-registry.json`. The install mode registry decides how a maintainer sets up this repository as a user or developer. This project decides how an end user would install and run the platform as software, similar to a desktop application such as Visual Studio Code.

## Current Direction

- Treat the first installable product as a Tauri v2 desktop shell over existing platform capabilities.
- Keep `workspace-monitor/` as the initial UI source instead of duplicating the monitoring interface.
- Design the first-run user flow before implementing installer code: open/create/demo workspace, confirm workspace boundary, select view mode, run required readiness checks, then reach the dashboard.
- Keep Codex, Claude Code, Cursor, Antigravity, notifications, browser automation, and advanced validators as optional capability cards that can be configured later instead of blocking initial use.
- Keep `agent-platform/` as the Python-first agent/config/evaluation layer.
- For macOS, treat `configs/macos-execution-profile.json` as the source of truth for local run, internal `.app`, and public signed/notarized distribution structure.
- For Windows, treat `configs/windows-execution-profile.json` as the source of truth for local run, internal installer testing, public signed distribution, installer format, WebView2, update, uninstall, and smoke-test structure.
- Do not bundle user secrets, webhook tokens, browser cookies, or private repository data into installers.
- Require distribution gates before calling a build production-ready: code signing, notarization where required, installer smoke tests, update policy, uninstall/rollback behavior, privacy review, and dependency/license review.

## Selected Framework Decision

The selected first scaffold is Tauri v2:

- Rust/Tauri owns the desktop shell, native window lifecycle, and future scoped native command boundary.
- `workspace-monitor/` owns the TypeScript/Next.js UI.
- `agent-platform/` owns Python-first research, planning, evaluation, and config validation.
- External AI coding CLIs remain optional adapters through `agent-platform/configs/integrations/cli-adapter-registry.json`.
- Go remains a candidate for a future long-running local service or CLI supervisor if measurement shows that a daemon is needed.

Electron, Wails, and native packaging remain fallback/comparison candidates, but new implementation work should target the Tauri scaffold unless a recorded measurement or release blocker changes the decision.

Current machine state checked on 2026-06-02:

- Node/npm: available.
- Go: available.
- Rust: not installed.

This means the source scaffold exists, but `tauri:dev` and `tauri:build` are blocked until Rust and Tauri dependencies are installed with an installation audit record.

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
  src-tauri/
  scripts/
  tests/
```

## Source Of Truth

- Distribution registry: `configs/desktop-distribution-registry.json`
- macOS execution profile: `configs/macos-execution-profile.json`
- Windows execution profile: `configs/windows-execution-profile.json`
- User flow registry: `configs/user-flow-registry.json`
- Cross-platform runtime decision: `docs/architecture/cross-platform-installable-runtime-decision.ko.md`
- Product boundary: `docs/product-boundary.ko.md`
- Packaging strategy: `docs/packaging-strategy.ko.md`
- macOS execution structure: `docs/macos-execution-structure.ko.md`
- User flow: `docs/user-flow.ko.md`
- First-run onboarding: `docs/first-run-onboarding.ko.md`
- Flow map: `artifacts/user-flow-map.html`
- Tauri scaffold: `src-tauri/`
- First spec: `specs/2026-06-02-installable-desktop/`
- Cross-platform runtime spec: `specs/2026-06-02-cross-platform-installable-runtime/`

## Commands

No desktop framework dependency has been installed yet. `package.json` declares the intended local Tauri CLI dependency, but `npm install` has not been run in this project.

Current verification is scaffold, documentation, and config focused:

```bash
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/windows-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/macos-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/windows-execution-profile.json
```

Planned after installation audit:

```bash
cd platform-desktop-app
npm install
npm run tauri:dev
npm run tauri:build
```

Those commands require Rust, Cargo, Tauri dependencies, and OS-specific signing/build prerequisites. When a desktop framework is actually installed later, create an installation audit record under `_history/installations/YYYY/` and update `_ops/installations/registry.json`.
