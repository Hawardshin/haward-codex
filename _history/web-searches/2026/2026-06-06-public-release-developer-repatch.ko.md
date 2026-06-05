# 2026-06-06 Web Search: Public Release Developer Repatch

## Queries

- `Tauri v2 updater signing key generate command TAURI_SIGNING_PRIVATE_KEY official docs`
- `Tauri v2 macOS signing notarization skip stapling Developer ID official docs`
- `Tauri CLI signer generate updater key official docs`

## Checked Sources

- Tauri Updater: https://v2.tauri.app/plugin/updater/
- Tauri macOS Code Signing: https://v2.tauri.app/fr/distribute/sign/macos/
- Tauri CLI reference/search result for `signer generate`: https://tauri.app/fr/reference/cli/
- Apple app code signing overview: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web

## Plan Impact

- Tauri updater signing requires a private/public key pair and the CLI provides `signer generate`.
- Tauri CLI output documents `TAURI_SIGNING_PRIVATE_KEY_PATH` as a path-based signing input, so local readiness should not force private key content into `TAURI_SIGNING_PRIVATE_KEY`.
- Apple Developer ID signing and notarization remain real public distribution blockers and must not be faked by a developer scaffold.

## Public Summary

- The patch should improve developer diagnosis by generating a local updater env scaffold while preserving strict public release gates.
