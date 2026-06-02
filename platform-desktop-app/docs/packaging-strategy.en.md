# Installable Software Packaging Strategy

## Evidence Summary

- Electron documentation treats application packaging and distribution as a separate topic.
- Electron Forge provides OS-specific installer maker configuration.
- Tauri documentation provides distribution and OS-specific bundling paths.
- Microsoft MSIX documentation explains the Windows application package format and install experience.
- Apple Developer documentation treats notarization as a trust gate for macOS software distributed outside the App Store.

## Candidate Strategies

### Tauri-First Desktop Shell

The current recommendation is a Tauri-first prototype.

- Strengths: wraps an existing web UI and aligns with smaller bundle goals.
- Risks: Rust/toolchain setup and explicit Python sidecar or local service boundary design.
- Must check: `workspace-monitor` static export compatibility, update strategy, macOS/Windows signing.
- macOS execution structure: check `platform-desktop-app/configs/macos-execution-profile.json` first.

### Go Local Service / Wails Comparison

Go is the first candidate for local services and operational CLIs rather than the default desktop shell.

- Strengths: simple cross-platform binaries, fast builds, concurrent file watchers/local daemons, and operational CLIs.
- Risks: if Wails becomes the desktop shell candidate, it still needs the same distribution, security, and installer release-gate comparison as Tauri.
- Must check: local service lifecycle, shutdown/restart behavior, repository path permissions, and IPC/API boundary with Python agents.

### Electron Fallback

Electron has a mature ecosystem and many installer examples.

- Strengths: JavaScript ecosystem, Node integration, and broad installer tooling.
- Risks: larger bundles, Chromium runtime cost, and stricter local-access security hardening.
- Must check: Electron Forge versus electron-builder, sandbox/context isolation, notarization.

### Native Packaging Only

If a desktop shell adds little product value, compare OS installers around a CLI plus local web UI.

- Strengths: smaller product surface.
- Risks: weaker desktop integration and more user understanding of local services.

### CLI-Neutral Adapter Layer

The installable app is not a single CLI wrapper. The platform launches first as the host runtime. It can use multiple CLIs, but they attach through guest adapter contracts in `agent-platform/configs/integrations/cli-adapter-registry.json`.

- Strengths: Codex CLI, Claude Code, GitHub CLI, package managers, and deployment CLIs can be used when they fit the task.
- Risks: desktop-originated local command execution needs command/path allowlists, timeouts, output redaction, and permission UI.
- Must check: missing-CLI fallback, version checks, user-supplied executable paths, and installation audit boundaries.

## Language And Runtime Direction

- Keep the core agent layer Python-first.
- Keep the current desktop shell prototype direction Tauri/Rust-first.
- If a separate background service becomes necessary, evaluate Go first.
- If profiling proves a stable parsing/index/search hot path is the bottleneck, evaluate a Rust native module.
- Treat external CLIs as guest adapter capabilities on top of the platform, not runtime bodies.
- Detailed decision criteria live in `agent-platform/configs/runtime/language-decision-registry.json` and `_docs/policies/runtime-language-selection-policy.en.md`.

## Release Gate

Before calling a build distributable installable software, complete:

- Framework decision record
- Project-local dependency installation audit
- License and security review
- macOS signing/notarization plan
- macOS execution profile review
- Windows signing and installer format decision
- Install, first-run, update, uninstall, and rollback smoke tests
- Privacy review
- User documentation

## Not Done Yet

This work did not install Tauri, Electron, or packager dependencies. It only creates the productization structure and decision criteria.
