# Public Release Updater Automation Traceability

| Requirement | Implementation | Validation |
| --- | --- | --- |
| PRU-REQ-001 | `tauri-plugin-updater`, `tauri_plugin_updater::Builder`, `public-release-build.mjs` | `cargo check`, desktop tests |
| PRU-REQ-002 | `public-release-config.mjs` secret boundary, generated marker metadata only | public config report, code review |
| PRU-REQ-003 | `validatePublicReleaseEnv`, `release:preflight:public` | public preflight report |
| PRU-REQ-004 | unchanged internal package pipeline, base ad-hoc `signingIdentity` | `package:internal` |
| PRU-REQ-005 | `package-public`, `create-updater-manifest.mjs`, macOS verification steps | desktop tests/check, public dry/report |
| PRU-REQ-006 | `src-tauri/Entitlements.plist`, `tauri.conf.json` macOS entitlements | readiness tests/check |
| PRU-REQ-007 | `package-public` preflight before `commonVerifySteps` | readiness test/order check, failed retry output |
