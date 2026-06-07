# 2026-06-07 평가: 앱 셸 Rust 모듈 분리

## 평가 대상

앱 셸 read-only Rust command 구현을 `features/app_shell.rs`로 이동하고 readiness/test 검사를 runtime source aggregate 기준으로 바꾼 변경. 반복 패키징에서 DMG bundling이 깨질 때 자동 복구하는 prepared build wrapper도 함께 평가했다.

## 결과

통과.

## 실행한 검증

- `cargo fmt`
- `cargo check` in `platform-desktop-app/src-tauri`
- `cargo test` in `platform-desktop-app/src-tauri`
- `node scripts/check-runtime-contract.mjs`
- `node scripts/check-readiness.mjs`
- `node tests/readiness.test.mjs`
- `node --test tests/tool-studio.test.mjs` in Workspace Monitor
- `node scripts/check-service-readiness.mjs --mode internal`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm run desktop:package:run:internal`
- `corepack pnpm --filter platform-desktop-app run tauri:build:prepared`
- `codesign --verify --deep --strict platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `hdiutil verify platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 확인된 동작

- Rust compile/test 통과.
- runtime contract/readiness 통과.
- platform tests 30개 통과.
- Workspace Monitor check/test 통과.
- internal `.app`와 `.dmg` 생성 및 검증 통과.
- internal app open 성공.
- 반복 prepared build에서 기존 final DMG가 자동 cleanup되고 동일 `.app`/`.dmg`가 다시 생성됐다.
- Tauri DMG 단계 실패 시 기존 `.app`, generated `bundle_dmg.sh`, `icon.icns`가 있으면 `--skip-jenkins` 복구 경로로 동일 DMG 파일을 재생성한다.

## 남은 경고

공개 배포는 여전히 Developer ID signing, notarization, updater signing/public key, HTTPS endpoint, clean-machine smoke가 필요하다.
