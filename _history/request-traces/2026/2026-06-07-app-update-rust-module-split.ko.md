# 2026-06-07 요청-결과 추적: 앱 업데이트 Rust 모듈 분리

## 요청

기능적 이슈 없이 계속 소스를 분리하고 공통 구조를 유지해 달라는 요청.

## 결정

앱 업데이트 런타임 로직을 Rust feature module로 분리하고, readiness/test source map을 함께 갱신해 구조 변경과 검증 기준이 같은 위치를 보도록 했다.

## 변경 파일

- `platform-desktop-app/src-tauri/src/features/app_update.rs`
- `platform-desktop-app/src-tauri/src/features/mod.rs`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 검증 파일

- `_history/web-searches/2026/2026-06-07-app-update-rust-module-split.ko.md`
- `_history/plans/2026/2026-06-07-app-update-rust-module-split.ko.md`
- `_history/evaluations/2026/2026-06-07-app-update-rust-module-split.ko.md`
- `_history/omission-checks/2026/2026-06-07-app-update-rust-module-split.ko.md`
- `_history/resource-checks/2026/2026-06-07-app-update-rust-module-split.ko.md`

## 결과

내부 패키징과 앱 실행까지 성공했다. 공개 업데이트 채널 구성은 별도 남은 작업으로 유지했다.
