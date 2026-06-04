# Desktop App Build/Test/Release Runbook

## Purpose

This document gives one-command paths for verifying `platform-desktop-app`, building an internal `.app`/DMG, and checking public release gates.

## Quick Commands

Run these from the repository root.

| Purpose | Command |
| --- | --- |
| First setup only | `corepack pnpm run desktop:setup` |
| First setup plus developer verification | `corepack pnpm run desktop:setup:verify` |
| Fast repeated verification | `corepack pnpm run desktop:verify:quick` |
| Full developer verification | `corepack pnpm run desktop:verify` |
| Customer renderer build/audit only | `corepack pnpm run desktop:renderer:build` |
| Quick setup/build diagnosis | `corepack pnpm run desktop:doctor` |
| Build local/internal `.app` and DMG | `corepack pnpm run desktop:package:internal` |
| Check public release gates in report-only mode | `corepack pnpm run desktop:release:report` |
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

Public distribution is ready only after these gates actually pass:

- Developer ID or equivalent OS signing identity.
- macOS hardened runtime, notarization, and stapling when applicable.
- Windows code signing and SmartScreen handling.
- Signed updater channel and update rollback plan.
- Clean-machine install/open/update/uninstall smoke tests.
- Privacy, dependency, and license review.
- Installer payload review proving tokens, webhook URLs, browser cookies, `_private/` content, and platform source payloads are not bundled.

## External References

- Tauri v2 distribution docs: https://v2.tauri.app/distribute/
- Tauri v2 macOS signing/notarization docs: https://v2.tauri.app/distribute/sign/macos/
- Tauri updater docs: https://v2.tauri.app/plugin/updater/
- Apple macOS code signing/notarization overview: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web

## Failure Notes

- If `workspace-monitor` build fails, inspect TypeScript, snapshot, and customer boundary state under `platform-desktop-app/renderer/workspace-monitor/`.
- If `check-customer-bundle` fails, internal source/path/private content is leaking into the customer snapshot or `out/`.
- If `release:public:report` is blocked, public signing/notarization/updater/clean-machine gates are still open. That is expected until the release assets are ready.
- If `cargo` fails, inspect Rust toolchain and Tauri compile errors from `platform-desktop-app/src-tauri/`.

## Prohibited

- Do not claim public readiness without signing/notarization evidence.
- Do not store Apple signing keys, updater private keys, webhook tokens, or browser cookies in the repository or installer payload.
- Do not expose raw workspace paths in runtime data or support bundles unless they belong to the user's selected workspace and pass the redaction policy.
