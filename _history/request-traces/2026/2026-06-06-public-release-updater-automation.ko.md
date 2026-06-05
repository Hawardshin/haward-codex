# 2026-06-06 Request Trace: Public Release Updater Automation

## 요청

- 사용자의 “다해” 후속 지시.

## 산출물

- `platform-desktop-app/scripts/public-release-config.mjs`
- `platform-desktop-app/scripts/public-release-build.mjs`
- `platform-desktop-app/scripts/create-updater-manifest.mjs`
- `platform-desktop-app/src-tauri/Entitlements.plist`
- `platform-desktop-app/src-tauri/Cargo.toml`, `Cargo.lock`
- `platform-desktop-app/scripts/desktop-pipeline/definitions.mjs`
- release/readiness/docs/tests/history/spec files

## 검증

- `node scripts/public-release-config.mjs --report-only`: 통과.
- `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: 통과.
- `cargo check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --filter platform-desktop-app run package:internal`: 통과.

## 남은 외부 조건

- Apple Developer signing identity/certificate.
- Apple notarization credential.
- Tauri updater private key/public key pair and HTTPS endpoint.
- Uploaded release assets and clean-machine install/open/update smoke.
