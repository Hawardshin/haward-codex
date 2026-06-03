# Platform Desktop App

## Purpose

`platform-desktop-app/` is the productization project for turning this workspace platform into installable desktop software.

This is separate from `agent-platform/configs/installations/install-mode-registry.json`. The install mode registry decides how a maintainer sets up this repository as a user or developer. This project decides how an end user would install and run the platform as software, similar to a desktop application such as Visual Studio Code.

## Current Direction

- Treat the first installable product as the platform-first host runtime: the app launches first, owns workspace state, task state, decisions, artifacts, validation, and UI authority, then mounts external AI CLIs as guest adapter lanes.
- Treat the desktop product as an agent capability platform, not as a monitoring dashboard. `configs/product-feature-registry.json` is the source of truth for primary features: agent orchestration, agent work environment, agent development environment, agent factory, and the learning/evaluation loop. Monitoring and history surfaces support those features through observability.
- Treat `runtime-contracts/installer-shell-runtime-contract.json` as the bundled contract the installed shell reads before task execution. This contract fixes required read targets, enforcement gates, and structured data accumulation targets so shell behavior is not driven by chat memory or a one-off UI path.
- Treat this repository as the development source that builds the platform, not as the customer-visible product payload. Installed customers should use the app, their selected workspaces, app-managed data stores, classified logs, and exports without seeing the platform source tree.
- Keep user workspace data, platform data stores, log stores, cache stores, and agent runtime workspaces separate from platform source code. Use `configs/runtime-data-boundary-registry.json` as the steering source before adding persistent runtime data or log features.
- Keep reusable agent definitions under `agent-platform/configs/agents/`; runtime agent input/output/log/handoff/temp work belongs in the installed product's scoped agent workspace plane.
- Keep the Next.js renderer under `platform-desktop-app/renderer/workspace-monitor/` as the selected product UI source instead of duplicating the monitoring interface in a separate root project.
- Use the selected renderer as a product feature workbench: it must pull from the product feature registry and show sellable feature layers before supporting observability or repository-monitoring details.
- Design the first-run user flow before implementing installer code: open/create/demo workspace, confirm workspace boundary, select view mode, run required readiness checks, then reach the dashboard.
- Keep Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity, notifications, browser automation, and advanced validators as optional capability cards that can be configured later instead of blocking initial use.
- Treat Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as the first concrete AI CLI guest adapter targets for multi-CLI orchestration, while keeping the app usable when any of them is missing.
- Borrow Claude Code design patterns only from public, verifiable sources. Keep the transfer map in `configs/claude-code-design-transfer-registry.json`; never use leaked or non-public material as design evidence.
- Model real multi-CLI execution as supervised process lanes with process graph validation, terminal I/O bounds, decision inbox routing, artifact retention, merge gates, and cleanup before any executable implementation.
- The first implemented supervisor surface is intentionally narrow but executable: the Tauri backend exposes allowlisted CLI adapter discovery, bounded `--version` health checks, pipe-based CLI sessions, stdin/defer/cancel controls, deferred question persistence plus answer updates in the human decision inbox, and scoped source file read/write with backup. The project-owned renderer exposes these in the `Desktop` tab with setup guides and work-mode presets. Missing CLIs report `capability_missing` and do not block the UI.
- Keep `agent-platform/` as the Python-first agent/config/evaluation layer.
- For macOS, treat `configs/macos-execution-profile.json` as the source of truth for local run, internal `.app`, and public signed/notarized distribution structure.
- For Windows, treat `configs/windows-execution-profile.json` as the source of truth for local run, internal installer testing, public signed distribution, installer format, WebView2, update, uninstall, and smoke-test structure.
- Do not bundle user secrets, webhook tokens, browser cookies, or private repository data into installers.
- Require distribution gates before calling a build production-ready: code signing, notarization where required, installer smoke tests, update policy, uninstall/rollback behavior, privacy review, and dependency/license review.

## Selected Framework Decision

The selected product runtime is Tauri v2:

- Rust/Tauri owns the desktop shell, native window lifecycle, and future scoped native command boundary.
- `platform-desktop-app/renderer/workspace-monitor/` owns the TypeScript/Next.js renderer UI.
- `agent-platform/` owns Python-first research, planning, evaluation, and config validation.
- External AI coding CLIs remain guest adapters through `agent-platform/configs/integrations/cli-adapter-registry.json`; they execute platform-scoped lanes but do not own durable platform state.
- Go remains a candidate for a future long-running local service or CLI supervisor if measurement shows that a daemon is needed.

Electron, Wails, and native packaging remain fallback/comparison routes, but new implementation work should target the Tauri product shell unless a recorded release blocker or maintenance case changes the decision.

Current machine state checked on 2026-06-03:

- Node/npm: available.
- Go: available.
- Rust/rustup/Cargo: available through the user's local Cargo toolchain.
- Tauri CLI: installed as a project-local npm dev dependency through the recorded installation audit.

This means the desktop product shell can be built locally with Rust/Tauri for developer and internal testing. Public macOS distribution is still blocked until Developer ID signing, hardened runtime, notarization, stapling where applicable, clean-machine smoke tests, update/rollback planning, and privacy/dependency review pass.

## Structure

```text
platform-desktop-app/
  README.md
  artifacts/
  configs/
  docs/
  docs/requirements/
  renderer/
    workspace-monitor/
  runtime-contracts/
  specs/
  src/
  src-tauri/
  scripts/
  tests/
```

## Source Of Truth

- Distribution registry: `configs/desktop-distribution-registry.json`
- Product feature registry: `configs/product-feature-registry.json`
- macOS execution profile: `configs/macos-execution-profile.json`
- Windows execution profile: `configs/windows-execution-profile.json`
- User flow registry: `configs/user-flow-registry.json`
- Claude Code public design transfer registry: `configs/claude-code-design-transfer-registry.json`
- Runtime data/code/log/agent workspace boundary registry: `configs/runtime-data-boundary-registry.json`
- Installer shell runtime contract: `runtime-contracts/installer-shell-runtime-contract.json`
- Installer shell bootstrap guide: `runtime-contracts/installer-shell-bootstrap.ko.md`
- Installer shell runtime architecture: `docs/architecture/installer-shell-runtime-contract.ko.md`
- Cross-platform runtime decision: `docs/architecture/cross-platform-installable-runtime-decision.ko.md`
- Multi-CLI orchestration runtime: `docs/architecture/multi-cli-orchestration-runtime.ko.md`
- Claude Code public design transfer: `docs/architecture/claude-code-design-transfer.ko.md`
- Runtime data/code boundary: `docs/architecture/runtime-data-boundary.ko.md`
- Product boundary: `docs/product-boundary.ko.md`
- Packaging strategy: `docs/packaging-strategy.ko.md`
- macOS execution structure: `docs/macos-execution-structure.ko.md`
- User flow: `docs/user-flow.ko.md`
- First-run onboarding: `docs/first-run-onboarding.ko.md`
- Flow map: `artifacts/user-flow-map.html`
- Tauri product shell: `src-tauri/`
- First spec: `specs/2026-06-02-installable-desktop/`
- Cross-platform runtime spec: `specs/2026-06-02-cross-platform-installable-runtime/`
- Multi-CLI orchestration spec: `specs/2026-06-02-multi-cli-orchestration-desktop/`

## Commands

Desktop framework dependencies have been installed locally for developer builds. The current local verification path is:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm --filter platform-desktop-app run runtime:contract
corepack pnpm --filter platform-desktop-app run check
corepack pnpm --filter platform-desktop-app test
corepack pnpm --filter workspace-monitor run check
corepack pnpm --filter workspace-monitor test
corepack pnpm --filter workspace-monitor run build:customer
corepack pnpm --filter platform-desktop-app run customer-bundle:audit
corepack pnpm --filter platform-desktop-app run release:preflight
corepack pnpm --filter platform-desktop-app run release:preflight:public:report
cd platform-desktop-app/src-tauri && cargo test
cd platform-desktop-app/src-tauri && cargo build
corepack pnpm --filter platform-desktop-app run tauri:build
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/windows-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/claude-code-design-transfer-registry.json
python3 -m json.tool platform-desktop-app/configs/runtime-data-boundary-registry.json
python3 -m json.tool platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/macos-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/windows-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/claude-code-design-transfer-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json
```

`monitor:build` runs the customer renderer build and then audits `platform-desktop-app/renderer/workspace-monitor/out` before Tauri embeds it. Public release preflight is report-only unless Developer ID signing and Apple notarization credentials are available.

Implemented desktop bridge commands:

- `app_health`
- `get_installer_shell_runtime_contract`
- `get_accumulated_data_overview`
- `get_desktop_workspace_state`
- `set_desktop_workspace_path`
- `clone_desktop_workspace`
- `list_cli_adapters`
- `run_cli_adapter_health`
- `run_all_cli_adapter_health`
- `start_cli_adapter_session`
- `poll_cli_adapter_session`
- `list_cli_adapter_sessions`
- `write_cli_adapter_stdin`
- `send_cli_adapter_defer_message`
- `cancel_cli_adapter_session`
- `read_workspace_text_file`
- `write_workspace_text_file`
- `list_human_decision_inbox`
- `answer_human_decision`
- `answer_and_resume_human_decision`

These commands are bounded workspace-host, pipe/session, human decision inbox append, and scoped file-editing product-slice commands. Interactive PTY sessions, full Git branch/push/pull UI, source-affecting autonomous execution, xterm.js, and packaged sidecars still require a dependency and permission audit before implementation.

`get_accumulated_data_overview` also persists the user-visible accumulated-data schema as `app_data/runtime-data/indexes/accumulated-data-overview.v1.json`, so the installed shell has a stable local manifest instead of only transient screen state.

`clone_desktop_workspace` treats Git as an optional bounded capability. If `git` is unavailable, the app reports `capability_missing` rather than blocking the desktop shell. Repository URL metadata and clone failure output are redacted before state/report exposure when credentials are present in the URL.

Local Tauri build artifacts are generated under:

```bash
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

The macOS build uses Tauri ad-hoc signing (`signingIdentity: "-"`) for local developer and internal test builds only. Do not describe the DMG as public-ready until the public distribution gates above pass.
