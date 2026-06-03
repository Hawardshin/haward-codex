# Cross-Platform Installable Runtime Decision

## Decision

The first installable product architecture for `platform-desktop-app` is **platform-first host runtime**, **Tauri v2 + Rust desktop shell**, **workspace-monitor static UI**, **agent-platform Python layer**, and **optional external CLI guest adapters**.

This keeps the product from running on top of any one AI coding tool. The platform launches first; Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity, and future tools attach as configurable guest lanes on top of it. External AI tools can be execution providers, but task state, durable memory, decision inbox, artifacts, validation, and UI authority remain owned by the platform.

## Expert Debate Summary

| Perspective | Position | Counterpoint | Resolution |
| --- | --- | --- | --- |
| Product | Users need an app-like install and launch path, not only a repository setup. | A desktop shell can hide the operating system of docs, history, and evaluation. | The shell owns entry and first-run UX; the existing platform memory, history, and evaluation structure remains the source of truth. |
| Desktop packaging | macOS and Windows trust depend on signing, notarization, install/uninstall, and update behavior. | Signing credentials and a Windows build host are not available yet. | Separate local/internal/public execution levels and block production-ready claims until release gates pass. |
| Runtime/language | Tauri/Rust fits a small shell and explicit native boundary better than an Electron-first default. | Rust is not installed on the current machine and adds build cost. | Select Tauri-first for the product architecture, but install dependencies only after an audit record. Keep Go as the local service candidate. |
| Infrastructure | CLI execution, watchers, update tasks, and background agents create leak and orphan-process risks. | Blocking everything upfront slows product progress. | The first product slice focuses on shell/readiness; sidecars, services, and CLI execution require explicit lifecycle contracts. |
| Security/privacy | Installers must not contain tokens, cookies, private snapshots, or signing keys. | Convenience pushes toward automatic setup. | Store secrets through OS credentials, environment variables, or runtime input, never committed defaults. |
| UX | First run should make workspace, mode, missing capability, and task state visible. | Too many questions block work. | Optional CLIs are deferred capability cards; decision inbox collects blocked choices while unblocked work continues. |
| Principle guardian | The platform must enforce structure, not rely only on prompts. | Too many gates slow work. | Use work modes for overhead control and release/readiness gates for installable software. |
| Cost/efficiency | Avoid duplicated UI and runtimes because the platform exists to reduce repeated human work. | The existing monitor may need desktop-specific UX later. | Reuse workspace-monitor first and add desktop-only UI only after real need is proven. |

## Candidate Comparison

| Candidate | Strengths | Risks | Decision |
| --- | --- | --- | --- |
| Tauri v2 + Rust | Small shell direction, Rust native boundary, macOS/Windows installer docs, sidecar pattern | Requires Rust toolchain and OS-specific signing/build learning | Selected |
| Electron | Mature JS desktop ecosystem, broad packager/updater examples, easier Node integration | Larger Chromium footprint and strict hardening needed for shell/file access | Fallback |
| Wails + Go | Go backend with web UI, good local service fit | Less clear benefit when reusing existing Next.js monitor | Local daemon candidate |
| Native packaging only | Simpler web/CLI distribution without a shell | Weaker installable app experience | Comparison candidate |

## Selected Architecture

```text
User
  -> platform-first host runtime
  -> Tauri desktop shell (Rust)
      -> workspace-monitor static export (TypeScript/Next.js)
      -> selected workspace snapshot/docs/history
      -> platform supervisor boundary
          -> agent-platform Python commands/service/sidecar
          -> optional guest CLI adapters
              -> Codex / Gemini CLI / Claude Code CLI / OpenCode / Cursor / Antigravity / other CLIs
```

## Current Reality

- Node/npm exists on the current machine.
- Go exists on the current machine.
- Rust/Cargo/Tauri local build path is verified on the current machine.
- Local/internal `.app` and DMG artifacts can be produced, but they must not be described as public signed installers.
- The current baseline keeps the Tauri product shell, readiness tests, macOS/Windows execution profiles, and release gates while public distribution gates remain closed.

## Public Release Gates

- macOS: Developer ID signing, hardened runtime, notarization, stapling when applicable, clean Mac smoke test.
- Windows: code signing, SmartScreen/download trust plan, MSI/NSIS/MSIX selection, clean Windows smoke test.
- Shared: install/open/update/uninstall/rollback tests, privacy review, dependency/license review, optional CLI missing behavior, workspace boundary test.

## Evidence

- Tauri v2 distribution docs cover platform-specific installers and code-signing expectations.
- Tauri Windows installer docs cover MSI/NSIS options and the Windows-host requirement for MSI creation.
- Tauri sidecar docs describe external binary bundling patterns suitable for Python CLI/API server boundaries.
- Apple notarization docs define Developer ID, hardened runtime, and notarization expectations for outside-App-Store distribution.
- Microsoft MSIX docs emphasize package signing and deployment trust.

## Next Steps

1. Keep the macOS local/internal build passing with `pnpm`, `cargo`, and Tauri validation.
2. Define a Windows build host or CI path.
3. Keep Developer ID signing, notarization, signed updater, and clean-machine smoke tests as public release blockers.
4. Do not use public-ready wording until signing, notarization, certificate, and smoke-test gates pass.
