# 2026-06-07 평가: 앱 업데이트 Rust 모듈 분리

## 평가 대상

앱 업데이트 Rust 로직을 `lib.rs`에서 `features/app_update.rs`로 분리하면서 자동 업데이트 command와 service readiness 검사를 유지하는 변경.

## 결과

통과.

## 실행한 검증

- `cargo check` in `platform-desktop-app/src-tauri`
- `node platform-desktop-app/scripts/check-readiness.mjs`
- `node platform-desktop-app/tests/readiness.test.mjs`
- `cargo test` in `platform-desktop-app/src-tauri`
- `node platform-desktop-app/scripts/check-service-readiness.mjs --mode internal`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm run desktop:package:run:internal`

## 확인된 동작

- Workspace Monitor type check와 tests 통과.
- Rust tests와 build 통과.
- Tauri release build 통과.
- macOS app signature verification 통과.
- DMG verification 통과.
- internal app open command 성공.

## 경고

서비스 준비도 리포트는 공개 배포용 signing/notarization/updater 설정과 clean-machine smoke가 없음을 계속 경고한다. 이 경고는 이번 분리에서 새로 만든 회귀가 아니라 공개 배포 준비 미완료 상태다.
