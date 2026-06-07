# 2026-06-07 앱 업데이트 Rust 모듈 분리 웹 검색 기록

## 목적

앱 업데이트 명령과 상태를 `lib.rs`에서 별도 Rust 모듈로 분리해도 Tauri 명령 등록과 상태 관리 계약을 깨지 않는지 확인했다.

## 검색어

- `Tauri v2 commands Rust official docs generate_handler state updater`
- `Rust official book modules separate files crate module system`

## 확인한 출처

- Tauri 공식 문서, Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
- Tauri 공식 문서, State Management: https://v2.tauri.app/develop/state-management/
- Rust 공식 문서, Separating Modules into Different Files: https://doc.rust-lang.org/stable/book/ch07-05-separating-modules-into-different-files.html
- Rust Reference, Crates and source files: https://doc.rust-lang.org/stable/reference/crates-and-source-files.html

## 판단 요약

- Tauri 명령은 `#[tauri::command]`를 유지하고 `tauri::generate_handler!`에 새 모듈 경로로 등록해야 한다.
- 공유 상태는 `tauri::Builder::manage`와 `State<T>`로 유지할 수 있으므로 `PendingAppUpdate`를 모듈로 이동해도 동일 타입을 관리하면 동작 계약이 유지된다.
- Rust 공식 모듈 시스템은 크레이트 안 코드를 별도 파일로 분리하는 것을 지원한다. 이번 변경은 새 크레이트 생성이 아니라 `features::app_update` 모듈로 책임을 옮기는 방식이므로 현재 프로젝트 경계에 맞다.

## 계획 영향

분리 대상은 앱 업데이트 상태, 보고서 타입, `check_app_update`, `install_app_update`, 업데이트 보고서 헬퍼로 제한했다. `lib.rs`는 상태 관리와 command registration만 유지하고, readiness/test 스크립트는 새 소스 경로를 포함하도록 조정했다.
