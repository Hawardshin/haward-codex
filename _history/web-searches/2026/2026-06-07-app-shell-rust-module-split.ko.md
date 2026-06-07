# 2026-06-07 앱 셸 Rust 모듈 분리 웹 검색 기록

## 목적

`lib.rs`에 남아 있는 앱 셸/헬스/런타임 계약 명령을 `features/app_shell.rs`로 옮길 때 Tauri command registration과 Rust module 분리 계약을 깨지 않는지 확인했다.

## 검색어

- `Tauri v2 command organization Rust modules generate_handler official docs`
- `Rust official book modules split separate files large source`
- `Tauri v2 DMG bundler bundle_dmg.sh skip-jenkins official docs`
- `Tauri v2 build bundles app dmg command official docs`

## 확인한 출처

- Tauri 공식 문서, Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
- Rust 공식 문서, Separating Modules into Different Files: https://doc.rust-lang.org/stable/book/ch07-05-separating-modules-into-different-files.html
- Tauri generate_handler Rust API 문서: https://docs.rs/tauri/latest/tauri/macro.generate_handler.html
- Tauri 공식 문서, DMG: https://v2.tauri.app/distribute/dmg/
- Tauri 공식 문서, CLI: https://v2.tauri.app/reference/cli/

## 판단 요약

- Tauri command 이름은 모듈 경로와 무관하게 고유해야 하므로 기존 command 이름은 유지했다.
- `generate_handler!`에는 새 모듈 경로를 직접 등록했다.
- Rust 모듈 분리는 기존 크레이트 안에서 별도 파일로 구현을 이동하는 방식이 적절하다.
- Tauri CLI는 macOS에서 `--bundles dmg` 또는 bundle target 설정으로 DMG를 생성하며, `--bundles app`/`app,dmg` 같은 명시 번들 구성이 가능하다.

## 계획 영향

`app_health`, `get_installer_shell_runtime_contract`, `get_rust_runtime_feature_map`을 `features/app_shell.rs`로 이동하고, readiness/test는 `lib.rs` 단일 파일 검사에서 runtime source aggregate 검사로 바꾸기로 했다.
반복 DMG 생성 실패는 public release signing/notarization 게이트와 섞지 않고 internal/prepared build wrapper에서 cleanup과 bounded recovery로 처리하기로 했다.
