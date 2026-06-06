# Plan: Terminal Agent Bridge

1. 공식 문서로 xterm.js, portable-pty, Tauri command/invoke, VS Code terminal integration 경계를 확인한다.
2. 기존 `RuntimeTerminalDrawer`, native PTY, CLI session 시작 경로를 확인한다.
3. PTY/CLI 시작 helper를 실패 전파 가능하게 분리한다.
4. Desktop Runtime에 terminal-agent bridge 상태 카드와 actions를 추가한다.
5. CSS와 문자열 계약 테스트를 추가한다.
6. Browser smoke로 bridge 표시와 terminal drawer open action을 확인한다.
7. resource, CLI pipeline, omission, evaluation 기록을 남긴다.
8. check/test/build/collect/check를 실행하고 commit/push한다.

## 모드 선택

- work_mode: `standard`
- 이유: UI와 runtime process flow가 함께 바뀌는 의미 있는 구현이지만 새 dependency나 공개 release 변경은 없다.

## 계획 근거

- `platform-desktop-app/specs/2026-06-06-native-pty-terminal-runtime/`
- `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/`
- `platform-desktop-app/specs/2026-06-06-terminal-command-center-usability/`
- 공식 xterm.js/Tauri/portable-pty/VS Code terminal documentation.
