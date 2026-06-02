# Task Pipe Init Requirements Change

- 날짜: 2026-06-02
- 요청 ID: `UR-2026-06-02-059`
- 요청: 다양한 작업을 pipe 기준으로 다양한 CLI에 init하는 구조로 진행한다.

## Added

- `PDA-REQ-027`: Desktop supervisor는 하나의 task intake로 여러 optional CLI lane을 pipe graph 기준으로 초기화해야 한다.
- `PDA-UX-020`: Desktop 탭은 task pipe preset, lane 수, adapter 목록, pipe edge, merge gate, missing lane 상태를 보여야 한다.

## Non-Scope

- 실제 외부 CLI 설치 또는 자동 설치.
- PTY, xterm.js, Tauri shell plugin 설치.
