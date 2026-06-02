# 2026-06-02 Cross-Platform Installable Desktop Platform Web Search Record

## Request

Turn the platform built so far into a realistic macOS and Windows installable software structure, and make Codex, Claude Code, Cursor, Antigravity, and similar tools configurable on top of the platform.

## Queries

- `Tauri v2 distribution macOS Windows installer updater sidecar official docs`
- `Apple notarize macOS software before distribution official developer documentation`
- `Microsoft MSIX packaging code signing Windows desktop apps official documentation`
- `Wails desktop app official docs Go webview packaging Windows macOS`
- `site:v2.tauri.app/distribute/ Tauri v2 distribute macOS Windows installer`
- `site:v2.tauri.app/develop/sidecar/ Tauri v2 sidecar external binaries`
- `site:v2.tauri.app/reference/config/ Tauri v2 config frontendDist beforeBuildCommand`
- `Claude Code CLI official documentation Anthropic install command`
- `OpenAI Codex CLI official documentation GitHub install`
- `Google Antigravity coding agent documentation CLI official`

## Checked Sources

| Source | Type | Applied To |
| --- | --- | --- |
| Tauri v2 Distribute, Windows Installer, Sidecar, Updater, Config docs | official docs | Tauri-first shell, MSI/NSIS, sidecar, updater, static UI wiring |
| Apple Developer notarization docs | official docs | macOS public distribution gate: Developer ID, hardened runtime, notarization |
| Microsoft Learn MSIX packaging/signing docs | official docs | Windows code signing, MSIX signing, distribution trust gate |
| Wails official docs | official docs | Go/Wails comparison |
| Anthropic Claude Code docs/help | official docs/help | Claude Code as optional CLI capability, not platform runtime |
| OpenAI Codex CLI docs/help/GitHub | official docs/help/repo | Codex CLI as optional CLI capability |
| Google Antigravity CLI docs | official docs | Antigravity as optional CLI capability |

## Weak Sources Ignored Or Downgraded

- Reddit, community posts, and news were used only as release-friction or adoption signals.
- Wikipedia and unofficial PDFs were not used as decision evidence.
- Community install success/failure stories were treated as risk signals below official documentation.

## Plan Impact

- Selected Tauri v2/Rust as the first desktop shell scaffold.
- Wired the `workspace-monitor` static export as the Tauri `frontendDist`.
- Kept Python `agent-platform` outside the renderer behind a future sidecar/local service/command-adapter boundary.
- Added a Windows execution profile for MSI/NSIS/MSIX, WebView2, code signing, SmartScreen, update, uninstall, and clean Windows smoke tests.
- Kept Codex, Claude Code, Cursor, and Antigravity as optional CLI capabilities, not required runtimes.
- Did not run a Tauri build because Rust is not installed on the current machine; dependency installation is deferred to an audit-backed step.

## Uncertainty

- Signed installers require Apple Developer ID, Windows code signing certificate, Windows build host or CI, and clean-machine test environments.
- The Tauri v2 config is validated as a source scaffold; compile validation is deferred until Rust/Tauri dependencies are installed.
- Windows MSI creation requires a Windows build environment, so it was not fully validated on this macOS machine.

