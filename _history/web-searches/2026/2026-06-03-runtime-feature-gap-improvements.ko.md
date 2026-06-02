# Web Search: Runtime Feature Gap Improvements

## 쿼리

- `Tauri v2 frontendDist assets embedded resource_dir official docs`
- `Tauri v2 protocol asset frontendDist resource_dir official documentation`
- `Tauri v2 custom commands invoke testing official docs`
- `Apple notarization hardened runtime Developer ID official docs macOS app distribution`

## 확인한 출처

- Tauri v2 resources docs: `https://v2.tauri.app/develop/resources/`
- Tauri v2 config docs: `https://v2.tauri.app/reference/config/`
- Tauri asset protocol docs: `https://v2.tauri.app/security/asset-protocol/`
- Apple Developer ID support: `https://developer.apple.com/support/developer-id/`
- Apple notarization docs: `https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution`
- Xcode help, hardened runtime and Developer ID distribution: `https://help.apple.com/xcode/mac/current/en.lproj/devf87a2ac8f.html`, `https://help.apple.com/xcode/mac/current/en.lproj/dev033e997ca.html`

## 계획 영향

- Tauri `frontendDist` assets can be embedded separately from `bundle.resources`, so runtime `resource_dir` scanning is not enough as the only customer snapshot guard.
- Added a build-time customer bundle audit that validates `workspace-monitor/public` and `workspace-monitor/out` before Tauri embeds the static output.
- Added release preflight because public macOS readiness must distinguish internal ad-hoc signed builds from Developer ID signed, hardened-runtime, notarized distribution.

## 불확실성

- Public notarization was not executed because Developer ID certificate and notarization credentials are not present.
- Windows installer smoke remains a separate host-specific validation slice.
