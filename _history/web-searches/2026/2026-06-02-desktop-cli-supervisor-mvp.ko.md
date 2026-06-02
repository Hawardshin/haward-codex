# 웹 검색 기록: Desktop CLI Supervisor MVP

## 검색 목적

설치형 데스크톱 앱에 실제 CLI adapter 탐지와 bounded health check 실행을 넣기 전에 Tauri global API, Tauri command 호출, xterm.js/Monaco 후보의 공식 문서를 확인했다.

## 검색 쿼리

- `Tauri v2 shell plugin Command spawn official documentation JavaScript`
- `Tauri v2 invoke command Rust frontend official documentation`
- `Tauri v2 withGlobalTauri config official invoke window __TAURI__`
- `xterm.js terminal emulator official documentation FitAddon`
- `Monaco Editor React Vite official npm package documentation GitHub`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| `https://v2.tauri.app/reference/config/` | 공식 문서 | `app.withGlobalTauri`가 `window.__TAURI__` 주입을 제어한다. | 정적 `workspace-monitor`가 Tauri invoke를 쓰게 `withGlobalTauri=true`를 선택했다. |
| `https://v2.tauri.app/es/develop/calling-rust/` | 공식 문서 | frontend가 `invoke()`로 Rust command를 호출할 수 있다. | Rust backend command를 만들고 monitor UI에서 invoke bridge로 호출한다. |
| `https://v2.tauri.app/plugin/shell/` | 공식 문서 | shell plugin은 spawn/execute/stdin-write 권한 scope가 필요하다. | 이번 MVP는 shell plugin 없이 Rust `std::process` allowlist health check로 제한한다. |
| `https://xtermjs.org/docs/guides/using-addons/` | 공식 문서 | xterm.js terminal과 FitAddon 사용 흐름을 확인했다. | PTY/interactive terminal은 후속 dependency audit 이후로 둔다. |
| `https://github.com/microsoft/monaco-editor` | 공식 repo | Monaco Editor 설치와 browser editor surface를 확인했다. | source editing은 이번 MVP에서 readiness 표시만 하고 설치는 보류한다. |

## 계획 반영

- `@tauri-apps/api`를 추가 설치하지 않고 `withGlobalTauri` 기반 runtime bridge를 쓴다.
- 첫 실제 실행은 stdin 없는 `--version` bounded probe로 제한한다.
- shell plugin, xterm.js, Monaco, PTY는 설치하지 않는다.
- browser-only 실행에서는 Desktop 탭이 unavailable fallback을 보여준다.

## 불확실성

- Rust toolchain이 현재 환경에 없어 Tauri/Rust 컴파일 검증은 하지 못했다.
- 실제 Claude/Gemini/Codex/OpenCode의 auth 상태와 interactive prompt 패턴은 각 CLI 설치 후 smoke test가 필요하다.
