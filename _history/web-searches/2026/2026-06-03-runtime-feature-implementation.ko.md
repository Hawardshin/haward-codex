# Web Search: Runtime Data Feature Implementation

## 쿼리

- `Tauri v2 AppHandle path app_data_dir app_log_dir official docs`
- `Tauri v2 resource_dir AppHandle official docs`
- `Rust std fs read_dir canonicalize official docs`
- `Microsoft Windows app data folders LocalAppData RoamingAppData official docs`

## 확인한 출처

- Tauri v2 official docs: `https://v2.tauri.app/develop/resources/`
- Tauri v2 Rust API/source cache: local Cargo source for `tauri-2.11.2` path resolver methods.
- Rust standard library docs: `https://doc.rust-lang.org/std/fs/`, `https://doc.rust-lang.org/std/path/`
- Microsoft Learn app data guidance: `https://learn.microsoft.com/windows/apps/design/app-settings/store-and-retrieve-app-data`

## 계획 영향

- runtime data root는 Tauri `AppHandle` path resolver에서 app config/data/local data/cache/log/resource 위치를 계산한다.
- payload audit은 installed bundle resource directory를 기준으로 삼고, development workspace 전체를 임의 scan하지 않는다.
- directory traversal, canonical path, recursive read/remove는 Rust std fs/path API를 사용한다.

## 불확실성

- 공개 배포용 macOS notarization과 Windows installer smoke는 이번 구현 검증 범위 밖이다.
- Tauri dev mode resource directory는 release bundle과 다를 수 있으므로, audit command는 scan path와 skipped dir을 report에 남긴다.
