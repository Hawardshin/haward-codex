# macOS Execution Structure Requirement Change

## Change Summary

- Request summary: the platform needs a structure that can run on macOS.
- Changed requirement: `REQ-WS-069`
- Owning project: `platform-desktop-app`
- Related internal configuration:
  - `platform-desktop-app/configs/macos-execution-profile.json`
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `platform-desktop-app/docs/macos-execution-structure.en.md`

## Change

The installable desktop platform now separates macOS execution into developer local run, internal test `.app`, and public distribution app. Public distribution carries release gates for Developer ID signing, hardened runtime, notarization, stapling when applicable, update/rollback, and clean Mac smoke tests.

## Evidence

- Apple guidance for outside-App-Store macOS distribution points to Developer ID signing, notarization, and Gatekeeper-enabled launch testing.
- Apple guidance says hardened runtime is required for notarization.
- Tauri provides macOS App Bundle, DMG, signing, notarization, and updater paths.
- The current platform direction already separates Python agent-platform, Next.js workspace-monitor, Tauri-first desktop shell, and optional CLI adapter boundaries.

## Impact

- `platform-desktop-app` must check `macos-execution-profile.json` before claiming macOS runnable readiness.
- Actual Tauri/Electron installation, `.app` implementation, signing certificates, and notarization execution require a separate installation audit and implementation spec.
- This change fixes the structure and gates; it does not create a build artifact.

