# 2026-06-02 macOS Execution Structure Web Search Record

## Search Goal

Confirm official execution and distribution requirements for making the platform a macOS-runnable installable app.

## Queries

- `Apple Developer macOS app distribution notarization hardened runtime official`
- `Apple Developer Notarizing macOS software before distribution official`
- `Tauri v2 macOS code signing notarization distribute official`
- `Tauri v2 macOS updater official docs`
- `Electron macOS code signing notarization auto updater official documentation`

## Sources Checked

| Source | Type | Checked | Applied To |
| --- | --- | --- | --- |
| Apple Developer: Notarizing macOS software before distribution | Official docs | Need for notarization in outside-App-Store distribution | Public distribution release gate |
| Apple Developer: Hardened Runtime | Official docs | Hardened runtime need before notarization | Release gate and entitlement minimization |
| Xcode Help: Distribute outside the Mac App Store | Official docs | Developer ID signing, notarization, Gatekeeper-enabled launch test | External distribution requirements |
| Tauri: Distribute | Official docs | App Bundle, DMG, platform-specific installer, signing/notarization paths | Tauri-first distribution structure |
| Tauri: macOS Code Signing | Official docs | Developer ID Application, notarization credentials, ad-hoc signing limits | Local/internal/public execution levels |
| Tauri: Updater | Official docs | Update signature/manifest planning | Update strategy gate |
| Electron: Code Signing | Official docs | Electron fallback macOS signing/notarization considerations | Fallback comparison |
| Electron: autoUpdater | Official docs | Separate update channel design | Fallback update comparison |

## Weak Sources Ignored

- Personal ad-hoc codesign blog posts were replaced by official docs.
- Older `altool`-centered tutorials were not used for the structure decision.
- Stack Overflow answers were not needed because this task defines a distribution structure rather than debugging implementation.

## Plan Impact

- Added `platform-desktop-app/configs/macos-execution-profile.json` as the source of truth for macOS execution structure.
- Split macOS execution levels into `developer_local_run`, `internal_test_app`, and `public_outside_app_store`.
- Prevented public macOS readiness claims without Developer ID signing, hardened runtime, notarization, stapling when applicable, and clean Mac smoke tests.
- Kept Tauri-first while retaining Electron only as fallback comparison.

## Uncertainty

- Actual signing/notarization requires Apple Developer account, certificates, credentials, and CI secrets.
- This task defines structure only; it does not build or notarize a `.app`.

