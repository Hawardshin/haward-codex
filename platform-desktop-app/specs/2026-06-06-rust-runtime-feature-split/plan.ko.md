# 구현 계획

날짜: 2026-06-06

1. Rust/Tauri 공식 문서로 module hierarchy와 command registration 경계를 확인한다.
2. 현재 `src-tauri/src/lib.rs` 크기와 command surface를 확인한다.
3. `src-tauri/src/features/` 기능별 module 폴더를 만든다.
4. 기능별 command inventory report schema를 추가한다.
5. `get_rust_runtime_feature_map` Tauri command를 등록한다.
6. Desktop Runtime UI에 Rust module/command count를 표시한다.
7. runtime contract, readiness, renderer tests를 갱신한다.
8. Rust/Node 검증, snapshot collect, package build를 실행한다.
9. 기록, 평가, commit, push로 닫는다.
