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

### Electron Fallback

Electron has a mature ecosystem and many installer examples.

- Strengths: JavaScript ecosystem, Node integration, and broad installer tooling.
- Risks: larger bundles, Chromium runtime cost, and stricter local-access security hardening.
- Must check: Electron Forge versus electron-builder, sandbox/context isolation, notarization.

### Native Packaging Only

If a desktop shell adds little product value, compare OS installers around a CLI plus local web UI.

- Strengths: smaller product surface.
- Risks: weaker desktop integration and more user understanding of local services.

## Release Gate

Before calling a build distributable installable software, complete:

- Framework decision record
- Project-local dependency installation audit
- License and security review
- macOS signing/notarization plan
- Windows signing and installer format decision
- Install, first-run, update, uninstall, and rollback smoke tests
- Privacy review
- User documentation

## Not Done Yet

This work did not install Tauri, Electron, or packager dependencies. It only creates the productization structure and decision criteria.
