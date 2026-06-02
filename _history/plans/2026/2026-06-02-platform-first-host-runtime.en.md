# Platform-First Host Runtime Plan

## Goal

Make the installable product's runtime owner the platform itself, not Codex or another commercial assistant tool. External AI CLIs attach only as guest adapter lanes on top of the platform.

## Scope

1. Reflect the platform-first host runtime rule in persistent instructions, AGENTS entrypoint, and platform identity.
2. Add host/guest boundaries to the CLI adapter registry and desktop/user-flow registries.
3. Update platform-desktop-app requirements, specs, architecture docs, product boundary, and packaging docs.
4. Update Workspace Monitor Desktop UI to show `Platform-first host`, `Guest adapters`, and `Platform state owner`.
5. Validate with readiness tests, config contract, memory bootstrap, docs/naming checks, build, and visual smoke.

## Non-Scope

- Installing or auto-installing Codex, Gemini, Claude, or OpenCode.
- Installing Tauri shell plugin, sidecars, PTY, xterm.js, or Monaco dependencies.
- Claiming a public-ready installer.
