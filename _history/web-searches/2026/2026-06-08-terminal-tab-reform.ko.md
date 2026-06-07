# 웹 검색 기록: 터미널 탭 개혁

## 쿼리

- `terminal UI UX tabs command palette terminal panes best practices official docs`
- `xterm.js documentation terminal addon fit attach web links official`
- `Tauri v2 shell plugin command sidecar pty terminal documentation`
- `node-pty terminal emulator pseudoterminal best practices official GitHub`

## 확인한 출처

- xterm.js Documentation: https://xtermjs.org/docs/
- xterm.js Using addons: https://xtermjs.org/docs/guides/using-addons/
- xterm.js Link Handling: https://xtermjs.org/docs/guides/link-handling/
- Tauri v2 shell plugin reference: https://v2.tauri.app/reference/javascript/shell/
- xterm.js GitHub: https://github.com/xtermjs/xterm.js/

## 계획 반영

- 터미널 surface는 search, fit, web-links, clipboard 같은 terminal affordance를 유지해야 한다.
- 사용자가 보는 기본 화면은 raw PTY/CLI 세부 명칭보다 실행 가능 상태와 다음 행동을 먼저 보여야 한다.
- Tauri/CLI 실행은 런타임 경계이므로 연결 점검, PATH/권한 상태, 실패 복구 액션이 화면에 남아야 한다.

## 약한 출처 처리

- Reddit/커뮤니티 글은 문제 발견과 설계 신호로만 보았고 구현 근거로 직접 사용하지 않았다.
