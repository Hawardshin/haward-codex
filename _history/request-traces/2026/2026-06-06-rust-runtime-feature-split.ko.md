# 요청-결과 추적: Rust Runtime Feature Split

날짜: 2026-06-06

## 요청

Rust source와 folder structure를 기능별로 분리하고 기능별 추가 기능을 추가한다.

## 결과

- `src-tauri/src/features/` 기능별 module tree 추가
- `get_rust_runtime_feature_map` Tauri command 추가
- Desktop Runtime diagnostics에 Rust module/command metrics 추가
- runtime contract, readiness, tests 갱신
- generated snapshot collect 수행

## 주요 검증

- `cargo check`
- `cargo test`
- `platform-desktop-app test`
- `workspace-monitor test/check`
- `platform-desktop-app check`

## 후속

다음 slice에서 `lib.rs`의 command wrappers와 helper들을 기능 module 내부로 실제 이동한다.
