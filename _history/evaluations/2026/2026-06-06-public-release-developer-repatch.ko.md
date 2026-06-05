# 2026-06-06 Evaluation: Public Release Developer Repatch

## 검증

- `corepack pnpm --filter platform-desktop-app test`: 통과, 24 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `node platform-desktop-app/scripts/public-release-dev-env.mjs --write --dir /tmp/codex-public-release-dev-env-check`: 통과. temporary dev key/env scaffold 생성.
- temporary generated env를 `source`한 뒤 `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: updater 관련 checks 통과, Apple signing/notarization blocker만 남음.
- `corepack pnpm run desktop:release:dev-env`: 통과. 실제 ignored target 위치에 dev env scaffold 생성.
- repo generated env를 `source`한 뒤 `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: updater 관련 checks 통과, Apple signing/notarization blocker만 남음.
- `corepack pnpm run desktop:package:internal`: 통과. Workspace Monitor check/test/build, customer bundle audit, desktop tests/check, Rust tests/build, Tauri internal package build, app signature verification, DMG verification까지 완료.
- repo generated env를 `source`한 뒤 `corepack pnpm run desktop:package:public`: 의도된 실패. updater 관련 checks는 통과하고 public preflight에서 Apple Developer ID signing/notarization blocker만 남은 상태로 즉시 실패.

## 평가

- 개발자 관점의 “막힘”은 개선됐다. 이제 updater release gate는 로컬에서 재현 가능하다.
- 실제 공개 배포 gate는 약화하지 않았다.
- private updater key content와 Apple credential은 repository에 저장하지 않았다.
- 내부 테스트용 `.app`와 DMG 빌드 경로는 유지됐다.
