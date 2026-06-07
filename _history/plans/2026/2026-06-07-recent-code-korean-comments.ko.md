# 2026-06-07 최근 구현 코드 한국어 주석 계획

## 요청 해석

사용자는 지금까지 구현된 코드에 한국어 주석을 달라고 요청했다. 전체 저장소의 모든 코드에 라인별 주석을 다는 것은 유지보수성과 검증 가능성을 떨어뜨리므로, 최근 분리/복구 구현 코드의 의도와 안전 경계에 주석을 추가하는 범위로 실행했다.

## 범위

- `platform-desktop-app/src-tauri/src/features/app_shell.rs`
- `platform-desktop-app/src-tauri/src/features/app_update.rs`
- `platform-desktop-app/scripts/tauri-build-with-dmg-recovery.mjs`
- `platform-desktop-app/scripts/cleanup-macos-dmg-intermediates.mjs`
- `platform-desktop-app/scripts/desktop-pipeline/steps.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 주석 기준

- 한국어로 작성한다.
- 구현의 이유, 실패 방지 조건, 사용자 흐름 경계, package/recovery 안전 조건을 설명한다.
- 코드가 이미 명확히 말하는 단순 동작은 반복 설명하지 않는다.

## 검증 계획

- Node script syntax check
- Rust format/check/test
- desktop readiness/runtime contract tests
- Workspace Monitor collect/check
- final internal package/run
