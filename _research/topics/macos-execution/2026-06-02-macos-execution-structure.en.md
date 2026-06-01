# macOS Execution Structure Research Note

## Summary

To make a macOS app that ordinary users can download and run, the platform needs to separate local run, internal test, and public distribution. During development, unsigned or ad-hoc signed apps may be enough, but public outside-App-Store distribution should require Developer ID signing, hardened runtime, notarization, and Gatekeeper-enabled launch testing as release gates.

## Key Decisions

- Tauri is the first-choice shell candidate for the current platform. `workspace-monitor` already has a Next.js UI, and Tauri provides App Bundle, DMG, and macOS signing/notarization paths.
- Electron remains a fallback candidate. Its ecosystem is strong, but runtime size and update/signing operations are heavier.
- Python `agent-platform` should stay behind a sidecar, local service, or command boundary rather than being absorbed directly into the desktop shell.
- Optional CLIs are not app-launch prerequisites. If missing, only the related capability should degrade as `capability_missing`.

## Reusable Release Gate

1. Do not scan arbitrary folders before user workspace selection.
2. Require local command execution allowlists and timeouts.
3. Do not store tokens, signing credentials, or update keys in the repository.
4. Require Developer ID signing, hardened runtime, and notarization.
5. Run clean Mac open/install smoke tests per DMG/ZIP/PKG target.
6. Enable updater only after update manifest, signature, and rollback verification.

## Main Sources

- https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution
- https://developer.apple.com/documentation/security/hardened-runtime
- https://help.apple.com/xcode/mac/current/en.lproj/dev033e997ca.html
- https://v2.tauri.app/distribute/
- https://v2.tauri.app/distribute/sign/macos/
- https://v2.tauri.app/plugin/updater/
- https://www.electronjs.org/docs/latest/tutorial/code-signing
- https://www.electronjs.org/docs/latest/api/auto-updater/

