# 2026-06-06 Web Search: Public Release Repeat Retry

## Queries

- `Tauri v2 updater createUpdaterArtifacts TAURI_SIGNING_PRIVATE_KEY official docs 2026`
- `Tauri v2 macOS signing notarization environment variables APPLE_API_KEY_PATH official docs 2026`
- `Apple notarytool Developer ID notarization official documentation 2026`

## Checked Sources

- Tauri Updater: https://v2.tauri.app/plugin/updater/
- Tauri Environment Variables: https://v2.tauri.app/ko/reference/environment-variables/
- Apple Notary API: https://developer.apple.com/documentation/notaryapi
- Apple notarizing macOS software before distribution: https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution

## Plan Impact

- Tauri updater artifact generation still requires updater signing key material and updater configuration.
- macOS public distribution still requires Developer ID signing and notarization credentials.
- No code migration was needed for this retry because the previous fail-fast pipeline already blocks before expensive verification.

## Public Summary

- Official-source check confirmed that the remaining blockers are external credential and endpoint inputs, not a missing local implementation step.
