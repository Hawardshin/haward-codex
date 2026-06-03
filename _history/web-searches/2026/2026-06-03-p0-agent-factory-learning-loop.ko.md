# Web Search: P0 Agent Factory and Learning Loop

## 검색 시각

- 2026-06-03 KST

## Queries

- `Tauri v2 shell plugin official documentation sidecar command`
- `Tauri v2 dialog plugin file system permissions official docs`
- `portable-pty Rust crate documentation pseudo terminal`
- `VS Code terminal source control explorer UX official docs`

## 확인한 강한 출처

- Tauri File System plugin: `https://v2.tauri.app/plugin/file-system/`
- Tauri Dialog plugin: `https://v2.tauri.app/plugin/dialog/`
- Tauri Shell JavaScript reference: `https://v2.tauri.app/reference/javascript/shell/`
- Rust `portable-pty`: `https://docs.rs/portable-pty`
- VS Code terminal/source control reference: `https://code.visualstudio.com/docs/terminal/basics`, `https://code.visualstudio.com/docs/sourcecontrol/overview`

## 계획 영향

- 새 Agent Factory와 Learning Loop 기능은 renderer state만 두지 않고 Tauri command가 app-data runtime store에 구조화 JSON을 쓰는 방식으로 구현한다.
- 현재 구현은 기존 pipe-first CLI supervisor와 app-data 축적 구조를 확장하며, PTY/xterm 도입은 별도 optional UX slice로 유지한다.
- Tauri plugin 문서는 app-specific directory와 permission-scoped filesystem을 우선하도록 해석했다. 이번 slice는 앱 내부 runtime store 쓰기라 별도 사용자의 workspace 파일 권한을 요구하지 않는다.

## 약한 출처 처리

- Reddit, Stack Overflow, 비공식 mirror 문서는 구현 근거로 쓰지 않았다.
- VS Code/IntelliJ/Discord UX는 방향성 참고이며, 법적/소스 재사용 근거로 사용하지 않았다.

## 불확실성

- public release readiness는 이 slice 범위가 아니며 Developer ID signing, notarization, updater, clean-machine smoke가 계속 필요하다.
- 실제 packaged app 클릭 smoke는 현재 도구 제약으로 수행하지 못했고, native smoke 기록은 후속 release validation에서 보완해야 한다.
