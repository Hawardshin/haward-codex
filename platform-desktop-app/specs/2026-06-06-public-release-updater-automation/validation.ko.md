# Public Release Updater Automation Validation

## 완료된 검증

- `node scripts/public-release-config.mjs --report-only`: 통과. 외부 env blocker를 정상 보고.
- fake non-secret env를 사용한 `node scripts/public-release-config.mjs --report-only`: 통과. generated public config validation이 blocker 없이 ready를 보고.
- `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: 통과. updater code path는 통과, 외부 credential/env blocker를 정상 보고.
- `cargo check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 22 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. developer snapshot 복구 후 stale public snapshot warning은 허용된 내부 check 경고.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`: 통과.
- `corepack pnpm --filter platform-desktop-app run package:internal`: 통과. `.app`/DMG 생성, codesign verify, hdiutil verify 포함.
- JSON parse check: 통과.
- 재시도 `corepack pnpm run desktop:package:public`: Workspace Monitor/Rust 검증은 통과했지만 public preflight에서 외부 signing/updater/notarization env blocker로 실패. 이 결과에 따라 `package-public` preflight를 expensive verification 앞으로 이동했다.
- fail-fast 재검증 `corepack pnpm run desktop:package:public`: 통과 기준 충족. public preflight에서 즉시 실패했고 Workspace Monitor/Rust/Tauri expensive verification은 실행되지 않았다.
- `corepack pnpm run desktop:package:internal`: 통과. 내부 `.app`/DMG 생성, app signature verification, DMG checksum verification 포함.

## 외부 blocker

- 실제 `desktop:package:public` 성공은 Apple Developer signing/notarization credential, Tauri updater signing private key, release asset base URL, clean-machine smoke 환경이 있어야 가능하다.
