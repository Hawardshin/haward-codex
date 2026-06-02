# 웹 검색 기록: Desktop CLI Session / Source Editor MVP

## 검색 목적

health check만 있던 desktop supervisor를 pipe 기반 실행 세션, stdin/defer/cancel, scoped source editing으로 확장하기 전에 Tauri command scope, shell plugin 권한, xterm.js, Monaco Editor의 공식 자료를 확인했다.

## 검색 쿼리

- `Tauri v2 shell plugin spawn sidecar permissions official docs`
- `Tauri v2 shell plugin scope permissions official docs`
- `xterm.js React FitAddon official docs terminal emulator`
- `Monaco Editor React Next.js integration official docs`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| `https://v2.tauri.app/security/scope/` | 공식 문서 | Tauri command scope는 command 구현자가 직접 enforce해야 한다. | shell plugin 없이 직접 command를 구현하더라도 workspace path scope와 allowlist를 backend에서 강제해야 한다. |
| `https://v2.tauri.app/plugin/shell/` | 공식 문서 | shell plugin은 spawn/execute/stdin write 권한과 scope 설정이 필요하다. | 이번 slice는 plugin 설치/권한 확장을 하지 않고 Rust 표준 `Command` allowlist pipe로 제한한다. |
| `https://v2.tauri.app/develop/sidecar/` | 공식 문서 | sidecar 실행은 별도 permission과 packaging 판단이 필요하다. | long-running supervisor sidecar는 설치 감사 이후로 보류한다. |
| `https://xtermjs.org/docs/` | 공식 문서 | xterm.js는 web terminal emulator이며 PTY 자체는 아니다. | 현재는 native PTY 없이 pipe output UI로 구현하고, PTY/xterm은 후속 dependency audit에서 다룬다. |
| `https://xtermjs.org/docs/guides/using-addons/` | 공식 문서 | FitAddon 등 addon으로 terminal UI를 확장한다. | UI 후보로만 유지하고 설치하지 않는다. |
| `https://github.com/microsoft/monaco-editor` | 공식 repo | Monaco는 browser editor surface 후보이다. | 이번 slice는 dependency 없이 textarea scoped editor를 구현하고 Monaco는 후속 감사로 둔다. |

## 계획 반영

- shell plugin 권한을 추가하지 않는다.
- Tauri command 자체에서 adapter allowlist, cwd scope, output bound, timeout, stdin bound를 강제한다.
- source file write는 workspace-relative path만 허용하고 `_private/`, `outputs/`, workspace 밖 경로, symlink escape를 차단한다.
- 저장 전 backup을 남긴다.

## 불확실성

- Rust toolchain이 없어 Rust compile 검증은 아직 불가하다.
- pipe 기반 실행은 PTY가 필요한 CLI에서는 제한될 수 있다.
- 실제 adapter prompt/auth 동작은 각 CLI가 설치된 환경에서 smoke test가 필요하다.
