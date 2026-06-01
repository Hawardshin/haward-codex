# macOS Execution Structure Spec

## Goal

Define execution levels, process boundaries, distribution formats, security/permission posture, and release gates so `platform-desktop-app` can evolve into a macOS-runnable installable app.

## Scope

- Included:
  - Developer local run
  - Internal test `.app`
  - Public distribution app
  - Tauri-first `.app` shell structure
  - `workspace-monitor` UI reuse
  - Python `agent-platform` sidecar/local service boundary
  - Optional CLI adapter degradation
  - Developer ID signing, hardened runtime, notarization, stapling
  - Update/rollback and clean Mac smoke tests
- Excluded:
  - Tauri/Electron dependency installation
  - Actual `.app`, DMG, ZIP, or PKG generation
  - Apple Developer certificate preparation
  - Actual notarization execution

## Execution Structure

1. The desktop shell owns the macOS app entry point, window lifecycle, and workspace chooser.
2. `workspace-monitor` provides docs, history, agents, source viewer, and decision inbox UI.
3. `agent-platform` remains the Python-first local agent/service layer and communicates with the shell through a documented command or service contract.
4. External CLIs such as Codex, Claude Code, Cursor, GitHub CLI, and package managers attach only as optional adapter capabilities.
5. The app does not scan arbitrary folders or execute commands before the user selects a workspace.

## Success Criteria

- `platform-desktop-app/configs/macos-execution-profile.json` satisfies the self-documenting config contract.
- macOS execution levels are described consistently in docs and config.
- Public macOS distribution readiness is not claimed without signing, notarization, stapling, and smoke-test gates.
- Missing optional CLIs are handled as capability missing states rather than whole-app failures.

