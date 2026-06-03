# Web Search: Native-first Renderer Reduction

## 검색 시각

- 2026-06-03 KST

## Queries

- `Tauri v2 official architecture frontend backend Rust commands state mobile desktop docs`
- `Tauri v2 official commands state managed state plugins docs`
- `Tauri v2 official security capabilities permissions docs`
- `Tauri v2 official window menu tray native APIs docs`
- `Tauri official app config directory AppHandle path app_config_dir Rust docs`
- `Tauri official calling Rust from frontend command state serde docs`
- `Tauri GitHub examples state commands Rust frontend`
- `Tauri official security capabilities command permissions docs`

## 확인한 강한 출처

- Tauri v2, Calling Rust from the Frontend: `https://v2.tauri.app/develop/calling-rust/`
- Tauri v2, Capabilities: `https://v2.tauri.app/security/capabilities/`
- Tauri v2, Window Menu: `https://v2.tauri.app/learn/window-menu/`
- Tauri GitHub repository: `https://github.com/tauri-apps/tauri`
- Tauri/Rust path resolver reference: `https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html`

## 계획 영향

- 완전한 renderer 제거가 아니라 Tauri/Rust가 설정, OS path, filesystem, process, workspace state를 소유하고 renderer는 UI composition과 Monaco 같은 전문 UI를 맡는 방향을 선택했다.
- desktop preference persistence는 브라우저 `localStorage`가 아니라 app config path와 Rust command로 이동한다.
- command surface는 runtime contract/readiness에 등록해 installer shell 구조와 일치시킨다.
- native menu/shortcut/window-level action은 다음 slice 후보로 둔다.

## 약한 출처 처리

- Reddit, 일반 블로그, 비공식 guide는 구현 근거로 사용하지 않았다.
- Tauri v1 command 문서는 보조 확인으로만 보았고, 구현 근거는 Tauri v2 문서와 현재 프로젝트의 v2 Tauri 구조를 우선했다.
