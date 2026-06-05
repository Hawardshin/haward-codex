# 2026-06-06 Web Search: Public Release Updater Automation

## Query

- `Tauri v2 official updater plugin signing key public key endpoints configuration docs`
- `Tauri v2 official macOS code signing notarization DMG Developer ID docs`
- `Apple official notarizing macOS software notarytool Developer ID docs`
- `Tauri v2 macOS entitlements tauri.conf.json entitlements hardenedRuntime docs`

## 확인한 출처

- Tauri updater plugin: https://v2.tauri.app/plugin/updater/
- Tauri macOS code signing/notarization: https://v2.tauri.app/distribute/sign/macos/
- Tauri config MacConfig entitlements: https://v2.tauri.app/reference/config/#macconfig
- Apple code signing/notarization overview: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web
- `cargo info tauri-plugin-updater@2`: crates.io metadata, version `2.10.1`, license `Apache-2.0 OR MIT`.

## Plan Impact

- Tauri updater requires signed update artifacts and cannot disable signature verification, so `tauri-plugin-updater` is the implementation path.
- `TAURI_SIGNING_PRIVATE_KEY` must be environment-backed; `.env` files are insufficient for updater signing.
- macOS public distribution needs Developer ID signing and notarization credential; these remain external blockers.
- Public Tauri config should be generated only for public builds so internal ad-hoc builds remain fast and unchanged.
- Entitlements file path should be explicit in `tauri.conf.json > bundle > macOS > entitlements`.

## Weak Sources Ignored

- Reddit/community threads were treated only as risk signals for updater/entitlements setup friction, not as factual proof.

## Public Decision Summary

Implement a generated public build lane: base config stays internal, public config is generated from environment variables, private keys are never committed, and readiness gates fail clearly until external credentials exist.
