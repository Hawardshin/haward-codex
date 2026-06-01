# macOS Execution Structure Source Provenance

| Value/Claim | Source | Access Date | Reliability | Used In |
| --- | --- | --- | --- | --- |
| Outside-App-Store distribution should use Developer ID signing and notarization for trust, and should be launch-tested on a Gatekeeper-enabled Mac. | Xcode Help: Distribute outside the Mac App Store | 2026-06-02 | High, Apple official | `macos-execution-profile.json` public release gate |
| Hardened runtime is needed for notarization. | Apple Developer Hardened Runtime, Xcode Help | 2026-06-02 | High, Apple official | Signing/notarization requirements |
| Tauri provides platform-specific installers, App Bundle, DMG, and macOS signing/notarization paths. | Tauri Distribute, Tauri macOS Code Signing | 2026-06-02 | High, framework official | Tauri-first structure |
| Ad-hoc signing can support development/testing but may still require user security-setting bypass. | Tauri macOS Code Signing | 2026-06-02 | High, framework official | Local/internal/public level split |
| Updater needs separate manifest/signature/channel/rollback design. | Tauri Updater, Electron autoUpdater | 2026-06-02 | High, framework official | Update strategy gate |
| Optional CLIs are not app-launch prerequisites and should degrade by capability. | Internal CLI adapter registry | 2026-06-02 | Medium, internal policy | Runtime boundaries |

