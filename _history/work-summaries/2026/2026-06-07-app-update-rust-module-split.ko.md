# 2026-06-07 작업 요약: 앱 업데이트 Rust 모듈 분리

## 변경 요약

- `platform-desktop-app/src-tauri/src/features/app_update.rs`를 추가해 앱 업데이트 command/state/report 로직을 분리했다.
- `platform-desktop-app/src-tauri/src/lib.rs`에서 앱 업데이트 구현 본문을 제거하고 `features::app_update` command 경로를 등록하도록 바꿨다.
- `platform-desktop-app/src-tauri/src/features/mod.rs`에 `app-update-recovery` feature map 그룹을 추가했다.
- `platform-desktop-app/scripts/readiness/source-structure.mjs`에 새 Rust 모듈 경로를 등록했다.
- `platform-desktop-app/tests/readiness.test.mjs`와 `platform-desktop-app/scripts/check-service-readiness.mjs`가 `lib.rs`만이 아니라 앱 업데이트 모듈까지 확인하도록 조정했다.

## 기능 유지 포인트

- `PendingAppUpdate` shared state는 동일하게 Tauri builder에서 `manage`한다.
- `check_app_update`와 `install_app_update` command 이름은 유지하고 command registration 경로만 새 모듈로 이동했다.
- 서비스 준비도는 업데이트 런타임 액션이 새 모듈에 있어도 통과하도록 source map을 단일화했다.

## 검증 요약

전체 내부 패키징과 앱 실행까지 완료했다. 내부 release path는 통과했고, 공개 release path는 기존처럼 서명, notarization, updater endpoint/key가 없어 warning/blocker로 남는다.
