# Cross-Platform Installable Runtime Spec

## Goal

Create a real product structure that can evolve into installable macOS and Windows desktop software. The repository is currently developed from Codex, but the final platform must configure Codex, Claude Code, Cursor, Antigravity, and other AI coding tools as optional capabilities.

## Scope

- Tauri v2/Rust desktop shell scaffold
- Reuse of the `workspace-monitor` static UI
- Runtime boundary that keeps `agent-platform` Python logic outside the renderer
- Windows execution profile
- macOS/Windows release gates
- Separation between installable product packaging and repository setup `install_mode`
- Readiness check and Node test

## Out Of Scope

- Installing Rust toolchain
- Installing Tauri dependencies
- Creating signed macOS/Windows installers
- Configuring notarization, code signing, or updater servers
- Implementing a Python sidecar or Go daemon
- Auto-running Codex/Claude/Cursor/Antigravity CLIs

## Selected Architecture

```text
Tauri desktop shell (Rust)
  -> workspace-monitor static export (Next.js)
  -> selected workspace docs/history/specs
  -> future platform execution boundary
      -> agent-platform Python command/service/sidecar
      -> optional AI coding CLI adapters
```

## Acceptance Criteria

- `platform-desktop-app/package.json` has check/test/Tauri scripts.
- `platform-desktop-app/src-tauri/` has Tauri v2 config, Rust entrypoint, and capability file.
- `desktop-distribution-registry.json` references the selected Tauri-first architecture and Windows profile.
- `windows-execution-profile.json` satisfies the self-documenting config contract.
- `npm --prefix platform-desktop-app run check` passes.
- `npm --prefix platform-desktop-app test` passes.
- The lack of an actual installer and the next installation-audit step are documented.

## Risks

- Rust toolchain is not currently installed, so Tauri build is blocked.
- Public macOS/Windows distribution cannot be claimed without signing, notarization, SmartScreen/download trust planning, and clean-machine smoke tests.
- Adding CLI execution too early creates command injection, path traversal, orphan process, and resource leak risk.

