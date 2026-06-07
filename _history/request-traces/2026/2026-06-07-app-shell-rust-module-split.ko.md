# 2026-06-07 요청-결과 추적: 앱 셸 Rust 모듈 분리

## 요청

남은 구조 분리를 전부 계속 구현해 달라는 요청.

## 결과

첫 실행 슬라이스로 앱 셸 Rust command 구현을 분리했다. `lib.rs`의 read-only app shell command 본문을 `features/app_shell.rs`로 이동했고, command registration과 검사 기준을 함께 갱신했다. 이어서 반복 패키징에서 깨지는 DMG 생성 문제를 자동 cleanup/recovery wrapper로 보강했다.

## 변경 파일

- `platform-desktop-app/src-tauri/src/features/app_shell.rs`
- `platform-desktop-app/src-tauri/src/features/mod.rs`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/scripts/cleanup-macos-dmg-intermediates.mjs`
- `platform-desktop-app/scripts/tauri-build-with-dmg-recovery.mjs`
- `platform-desktop-app/scripts/desktop-pipeline/steps.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

최종 `corepack pnpm run desktop:package:run:internal` 성공. 내부 앱과 DMG가 생성되고 검증되었으며 앱 실행까지 완료됐다. 추가로 `corepack pnpm --filter platform-desktop-app run tauri:build:prepared` 반복 실행, `.app` codesign verify, `.dmg` hdiutil verify를 확인했다.

## 다음 추적 대상

`workspace` path/cache/git 영역 또는 `cli` session/process 영역을 별도 feature module implementation으로 이동한다.
