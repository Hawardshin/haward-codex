# Rust Runtime Feature Split 웹 우선 확인

날짜: 2026-06-06

## 쿼리

- `Rust official book modules file hierarchy mod.rs modules`
- `Tauri v2 official commands Rust module structure invoke handler`
- `Rust official cargo workspaces package layout modules`

## 확인한 소스

| 소스 | 유형 | 사용 |
| --- | --- | --- |
| https://doc.rust-lang.org/stable/reference/items/modules.html | 공식 Rust Reference | module file hierarchy와 `mod.rs`/file module 경계 |
| https://doc.rust-lang.org/cargo/reference/workspaces.html | 공식 Cargo Book | package/workspace 구조 판단 |
| https://v2.tauri.app/develop/calling-rust/ | 공식 Tauri v2 docs | command registration, unique command name, invoke handler single registration |

## 계획 영향

- 기능별 module file 구조를 Rust module tree로 만들었다.
- Tauri command는 여러 번 `invoke_handler`를 호출하지 않고 기존 handler list에 새 command만 추가했다.
- command 이름은 `get_rust_runtime_feature_map`으로 unique하게 잡았다.
