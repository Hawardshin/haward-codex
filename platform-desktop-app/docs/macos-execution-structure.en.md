# macOS Execution Structure

This document defines the structure for running the platform as an installable macOS app. The source configuration is `platform-desktop-app/configs/macos-execution-profile.json`.

## Execution Levels

### 1. Developer Local Run

- Purpose: quick validation on a developer Mac with the repository available.
- Allowed: `workspace-monitor` dev server, static export preview, future unsigned or ad-hoc signed desktop app.
- Not allowed: calling it public distribution-ready.

### 2. Internal Test App

- Purpose: use an `.app` bundle or DMG/ZIP for trusted internal testing.
- Required: dependency installation audit, clean macOS account smoke test, workspace open/create/demo flow, optional CLI missing-capability behavior.

### 3. Public Outside-App-Store App

- Purpose: normal users can download and open the app without Gatekeeper workarounds.
- Required: Developer ID signing, hardened runtime, minimal entitlements, notarization, stapling where applicable, fresh Mac install/open smoke test, update/rollback/privacy/dependency review.

## Process Model

The initial recommendation is a Tauri-first macOS `.app` shell.

- Desktop shell: owns the macOS app entry point, native window lifecycle, workspace folder picker, and platform-first host boundary.
- Workspace Monitor UI: reuses dashboard, history, docs, agents, source viewer, and decision inbox screens.
- Agent Platform: owns Python-first agents, research, planning, evaluation, and config checks.
- Guest CLI adapters: Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, GitHub CLI, package managers, and deployment CLIs attach through adapter contracts after the platform is running.

The core rule is simple: the user launches one app, but internal agent logic and CLI execution stay behind explicit, testable boundaries.

## macOS Distribution Conditions

- `.app`: base desktop shell execution unit
- DMG: preferred public distribution candidate
- ZIP: updater or simple archive candidate
- PKG: only when privileged installer or managed deployment semantics are truly needed

## Permissions And Security

- Read only a user-selected workspace path.
- Open network access only when update, web research, notification, or remote service behavior is documented.
- Do not run local commands without adapter allowlists, timeouts, output redaction, and visible consent.
- Do not put tokens, webhook URLs, Apple signing credentials, or update private keys in the repository or installer.

## Not Done Yet

- Tauri/Electron installation
- `.app` bundle implementation
- Signing certificate preparation
- Notarization execution
- Auto-update implementation

This document fixes the execution structure and release gates. Actual dependency installation or builds require a separate installation audit.
