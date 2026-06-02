# 2026-06-02 Cross-Platform Installable Desktop Platform Plan

## work_mode

`governance`

## Selection Reason

The request changes installable product structure, runtime language choice, macOS/Windows distribution policy, Codex/Claude Code/Cursor/Antigravity tool neutrality, memory bootstrap, requirements, specs, and validation gates, so `governance` is appropriate.

## Core Decisions

- Desktop shell: Tauri v2/Rust.
- UI: reuse `workspace-monitor` static export.
- Platform layer: keep `agent-platform` Python.
- Long-running local service: evaluate Go later when measured need appears.
- AI coding CLIs: Codex, Claude Code, Cursor, and Antigravity are optional adapter capabilities.
- No public-ready claim before signing, notarization, code signing, and clean-machine tests.

## Plan Evidence

- Tauri v2 official docs: platform-specific installers, Windows MSI/NSIS, sidecar, updater, config.
- Apple Developer docs: Developer ID signing, hardened runtime, and notarization gates for outside-App-Store macOS distribution.
- Microsoft Learn docs: MSIX and Windows package signing/trust requirements.
- Internal docs: `language-decision-registry.json`, `cli-adapter-registry.json`, `macos-execution-profile.json`, `user-flow-registry.json`.

## Sequence

1. Check official docs and candidate frameworks via web search.
2. Review existing platform desktop structure and runtime/CLI registries.
3. Add Windows execution profile.
4. Record expert debate and architecture decision.
5. Add Tauri scaffold.
6. Update requirements, specs, memory bootstrap, persistent instructions, and project registry.
7. Run JSON/config/test/readiness verification.
8. Record omission/resource/CLI/grounding/evaluator artifacts.
9. Commit and push.

## Bottlenecks And Deferrals

- Rust is not currently installed, so `tauri:dev` and `tauri:build` are deferred.
- Actual installation requires a separate `_history/installations/` audit record and rollback plan.
- Windows signed installer requires a Windows build host or CI plus a certificate.

