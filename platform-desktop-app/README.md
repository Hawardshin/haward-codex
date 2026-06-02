# Platform Desktop App

## Purpose

`platform-desktop-app/` is the productization project for turning this workspace platform into installable desktop software.

This is separate from `agent-platform/configs/installations/install-mode-registry.json`. The install mode registry decides how a maintainer sets up this repository as a user or developer. This project decides how an end user would install and run the platform as software, similar to a desktop application such as Visual Studio Code.

## Current Direction

- Treat the first installable product as the platform-first host runtime: the app launches first, owns workspace state, task state, decisions, artifacts, validation, and UI authority, then mounts external AI CLIs as guest adapter lanes.
- Keep `workspace-monitor/` as the initial UI source instead of duplicating the monitoring interface.
- Design the first-run user flow before implementing installer code: open/create/demo workspace, confirm workspace boundary, select view mode, run required readiness checks, then reach the dashboard.
- Keep Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity, notifications, browser automation, and advanced validators as optional capability cards that can be configured later instead of blocking initial use.
- Treat Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as the first concrete AI CLI guest adapter targets for multi-CLI orchestration, while keeping the app usable when any of them is missing.
- Model real multi-CLI execution as supervised process lanes with process graph validation, terminal I/O bounds, decision inbox routing, artifact retention, merge gates, and cleanup before any executable implementation.
- The first implemented supervisor MVP is intentionally narrow but executable: the Tauri backend exposes allowlisted CLI adapter discovery, bounded `--version` health checks, pipe-based CLI sessions, stdin/defer/cancel controls, deferred question persistence plus answer updates in the human decision inbox, and scoped source file read/write with backup. The Workspace Monitor exposes these in the `Desktop` tab with setup guides and work-mode presets. Missing CLIs report `capability_missing` and do not block the UI.
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
- External AI coding CLIs remain guest adapters through `agent-platform/configs/integrations/cli-adapter-registry.json`; they execute platform-scoped lanes but do not own durable platform state.
- Go remains a candidate for a future long-running local service or CLI supervisor if measurement shows that a daemon is needed.

Electron, Wails, and native packaging remain fallback/comparison candidates, but new implementation work should target the Tauri scaffold unless a recorded measurement or release blocker changes the decision.

Current machine state checked on 2026-06-03:

- Node/npm: available.
- Go: available.
- Rust/rustup/Cargo: available through the user's local Cargo toolchain.
- Tauri CLI: installed as a project-local npm dev dependency through the recorded installation audit.

This means the source scaffold can be built locally with Rust/Tauri for developer testing. Public macOS distribution is still blocked until Developer ID signing, hardened runtime, notarization, stapling where applicable, clean-machine smoke tests, update/rollback planning, and privacy/dependency review pass.

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
- Multi-CLI orchestration runtime: `docs/architecture/multi-cli-orchestration-runtime.ko.md`
- Product boundary: `docs/product-boundary.ko.md`
- Packaging strategy: `docs/packaging-strategy.ko.md`
- macOS execution structure: `docs/macos-execution-structure.ko.md`
- User flow: `docs/user-flow.ko.md`
- First-run onboarding: `docs/first-run-onboarding.ko.md`
- Flow map: `artifacts/user-flow-map.html`
- Tauri scaffold: `src-tauri/`
- First spec: `specs/2026-06-02-installable-desktop/`
- Cross-platform runtime spec: `specs/2026-06-02-cross-platform-installable-runtime/`
- Multi-CLI orchestration spec: `specs/2026-06-02-multi-cli-orchestration-desktop/`

## Commands

Desktop framework dependencies have been installed locally for developer builds. The current local verification path is:

```bash
npm --prefix platform-desktop-app ci
npm --prefix workspace-monitor ci
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
npm --prefix workspace-monitor run check
npm --prefix workspace-monitor test
npm --prefix workspace-monitor run build
cd platform-desktop-app/src-tauri && cargo test
cd platform-desktop-app/src-tauri && cargo build
npm --prefix platform-desktop-app run tauri:build
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/windows-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/macos-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/windows-execution-profile.json
```

Implemented desktop bridge commands:

- `app_health`
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

These commands are bounded pipe/session, human decision inbox append, and scoped file-editing MVP commands. Interactive PTY sessions, source-affecting autonomous execution, xterm.js, Monaco Editor, and packaged sidecars still require a dependency and permission audit before implementation.

Local Tauri build artifacts are generated under:

```bash
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

The macOS build uses Tauri ad-hoc signing (`signingIdentity: "-"`) for local developer and internal test builds only. Do not describe the DMG as public-ready until the public distribution gates above pass.
