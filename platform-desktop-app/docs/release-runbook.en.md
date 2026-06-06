# Desktop App Build/Test/Release Runbook

## Purpose

This document gives one-command paths for verifying `platform-desktop-app`, building an internal `.app`/DMG, and checking public release gates.

## Quick Commands

Run these from the repository root.

| Purpose | Command |
| --- | --- |
| First setup only | `corepack pnpm run desktop:setup` |
| First setup plus developer verification | `corepack pnpm run desktop:setup:verify` |
| Run in development mode | `corepack pnpm run desktop:dev` |
| Fast repeated verification | `corepack pnpm run desktop:verify:quick` |
| Full developer verification | `corepack pnpm run desktop:verify` |
| Customer renderer build/audit only | `corepack pnpm run desktop:renderer:build` |
| Quick setup/build diagnosis | `corepack pnpm run desktop:doctor` |
| Build local/internal `.app` and DMG | `corepack pnpm run desktop:package:internal` |
| Open the built internal `.app` | `corepack pnpm run desktop:run:internal` |
| Build local/internal `.app` and DMG, then open it | `corepack pnpm run desktop:package:run:internal` |
| Check public release gates in report-only mode | `corepack pnpm run desktop:release:report` |
| Create local developer updater env scaffold | `corepack pnpm run desktop:release:dev-env` |
| Build public signed updater artifacts | `corepack pnpm run desktop:package:public` |
| Preview the command sequence | `corepack pnpm --filter platform-desktop-app run pipeline:dry-run` |

## Internal Test Build

`desktop:package:internal` runs:

1. Workspace Monitor typecheck, tests, and customer build.
2. Customer bundle audit and developer/customer snapshot boundary checks.
3. Desktop app Node tests and readiness checks.
4. Rust `cargo test` and `cargo build`.
5. Prepared-renderer Tauri build for the internal `.app`/DMG, reusing the already audited renderer output.
6. On macOS, verify the `.app` signature with `codesign` and the DMG with `hdiutil verify`.

Direct `corepack pnpm --filter platform-desktop-app run tauri:build` still runs the Tauri `beforeBuildCommand`, which builds and audits the customer renderer first. `desktop:package:internal` re-audits and reuses the renderer output produced by `desktop:verify`, avoiding a duplicate Next.js build in the package pipeline.

Expected artifacts:

```text
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

These artifacts are for internal testing. The current macOS configuration uses ad-hoc signing, so do not describe them as public-ready.

## Public Distribution

Before public distribution, run:

```bash
corepack pnpm run desktop:release:report
```

To prepare the updater signing/env side locally before public credentials exist, run:

```bash
corepack pnpm run desktop:release:dev-env
source platform-desktop-app/src-tauri/target/public-release/dev/public-release-dev.env.sh
```

This developer env scaffold creates a dev updater key under ignored `src-tauri/target/public-release/dev/` and exports `TAURI_SIGNING_PRIVATE_KEY_PATH` instead of private key content. It does not create Apple Developer ID signing/notarization credentials, so it does not make the app public-ready.

Public distribution is ready only after these gates actually pass:

- Developer ID or equivalent OS signing identity.
- macOS hardened runtime, notarization, and stapling when applicable.
- `src-tauri/Entitlements.plist` explicitly records public distribution entitlements and is referenced by the Tauri config.
- Windows code signing and SmartScreen handling.
- Signed updater channel and update rollback plan.
- Clean-machine install/open/update/uninstall smoke tests.
- Privacy, dependency, and license review.
- Installer payload review proving tokens, webhook URLs, browser cookies, `_private/` content, and platform source payloads are not bundled.

`desktop:package:public` requires these environment variables.

| Scope | Environment variables |
| --- | --- |
| macOS signing | `APPLE_SIGNING_IDENTITY` or `APPLE_CERTIFICATE` + `APPLE_CERTIFICATE_PASSWORD` |
| notarization | `APPLE_ID` + `APPLE_PASSWORD` + `APPLE_TEAM_ID` or `APPLE_API_KEY` + `APPLE_API_ISSUER` + `APPLE_API_KEY_PATH` |
| updater verification | `TAURI_UPDATER_PUBLIC_KEY` |
| updater signing | `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`, optional `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` |
| updater endpoint | `TAURI_UPDATER_ENDPOINTS` |
| static manifest asset URL | `TAURI_RELEASE_ASSET_BASE_URL` |
| release notes | optional `TAURI_RELEASE_NOTES` |

The public build generates temporary `src-tauri/target/public-release/tauri.public.generated.json` and `service-update-channel.json` files. They contain only public key hash, endpoint, and signing identity presence metadata; the private updater key and Apple credentials are never written. After the build, Tauri updater artifacts `.app.tar.gz`, `.sig`, and static `latest.json` are produced under `src-tauri/target/release/bundle/`.

## External References

- Tauri v2 distribution docs: https://v2.tauri.app/distribute/
- Tauri v2 macOS signing/notarization docs: https://v2.tauri.app/distribute/sign/macos/
- Tauri updater docs: https://v2.tauri.app/plugin/updater/
- Apple macOS code signing/notarization overview: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web

## Failure Notes

- If `workspace-monitor` build fails, inspect TypeScript, snapshot, and customer boundary state under `platform-desktop-app/renderer/workspace-monitor/`.
- If `check-customer-bundle` fails, internal source/path/private content is leaking into the customer snapshot or `out/`.
- If `release:public:report` is blocked, public signing/notarization/updater/clean-machine gates are still open. That is expected until the release assets are ready.
- If `package:public` fails on environment blockers, set the variables above first. Developers can use `desktop:release:dev-env` for updater key path env, but Apple signing/notarization credentials must still be prepared separately.
- If `cargo` fails, inspect Rust toolchain and Tauri compile errors from `platform-desktop-app/src-tauri/`.

## Prohibited

- Do not claim public readiness without signing/notarization evidence.
- Do not store Apple signing keys, updater private keys, webhook tokens, or browser cookies in the repository or installer payload.
- Do not expose raw workspace paths in runtime data or support bundles unless they belong to the user's selected workspace and pass the redaction policy.
