# Web Search: Runtime Terminal Module

## 검색 시각

- 2026-06-03 KST

## Queries

- `VS Code official integrated terminal docs panel terminal workbench`
- `Tauri v2 official shell plugin command subprocess docs`
- `xterm.js official docs terminal UI web terminal`
- `Eclipse Theia official terminal contribution docs`

## 확인한 강한 출처

- VS Code Getting Started with the Terminal: `https://code.visualstudio.com/docs/terminal/getting-started`
- xterm.js Documentation/API: `https://xtermjs.org/docs/`
- Tauri v2 Shell plugin reference: `https://v2.tauri.app/zh-cn/plugin/shell/`
- Tauri JavaScript shell API reference: `https://v2.tauri.app/fr/reference/javascript/shell/`
- Eclipse Theia terminal TypeDoc: `https://eclipse-theia.github.io/theia/docs/next/modules/terminal.html`

## 계획 영향

- 하단 터미널은 workbench 안에서 별도 panel surface로 유지한다.
- CLI subprocess 실행과 stdin/stdout/stderr 경계는 Tauri command/runtime state를 통해 유지하고 renderer component는 표시와 입력 전달만 맡긴다.
- 실제 xterm.js 기반 terminal emulator 도입은 다음 단계 후보로 두되, 이번 slice는 기존 bounded stdout/stderr terminal UI를 component module로 분리하는 안정화 작업으로 제한한다.

## 약한 출처 처리

- 일반 블로그, StackOverflow, Reddit 토론은 이번 구현 근거로 쓰지 않았다.
- Tauri shell plugin의 public API는 참고했지만, 현재 프로젝트의 Rust command 기반 세션 저장소를 즉시 교체하지 않았다.
