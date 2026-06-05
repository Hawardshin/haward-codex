# 네이티브 PTY 터미널 요구사항

## 배경

사용자는 데스크톱 앱의 터미널 기능을 다시 점검하고, 단순 렌더링이나 pipe 기반 로그 패널이 아니라 운영체제 자원을 쓰는 실제 데스크톱 터미널에 가깝게 개선해 달라고 요청했다.

## 요구사항

| ID | 요구사항 | 우선순위 | 판정 기준 |
| --- | --- | --- | --- |
| REQ-PTY-001 | 앱은 OS pseudo terminal을 사용해 live shell session을 시작할 수 있어야 한다. | must | Rust runtime에 PTY start/list/poll/write/resize/cancel command가 있다. |
| REQ-PTY-002 | live terminal UI는 ANSI escape, cursor, raw input, scrollback을 처리할 수 있는 xterm.js surface를 사용해야 한다. | must | `RuntimeTerminalDrawer`에 xterm 기반 PTY view가 있다. |
| REQ-PTY-003 | 기존 pipe-first CLI supervisor는 task-run record, decision inbox, auto-defer 경로로 유지해야 한다. | must | 기존 CLI command와 task-run store 흐름이 제거되지 않는다. |
| REQ-PTY-004 | PTY 세션은 bounded output, resize, cancel, retention cleanup으로 리소스 누수 위험을 낮춰야 한다. | must | bounded scrollback, reader thread join, writer drop, resize command, cancel command가 있다. |
| REQ-PTY-005 | 구현 후 Rust/TypeScript 검사, readiness, 내부 패키징 빌드를 자동 실행해야 한다. | must | validation record에 검사와 빌드 결과를 남긴다. |

## 범위 제외

- PTY 세션을 task-run store에 저장하는 장기 로그 이관은 이번 범위가 아니다.
- 공개 배포용 signing/notarization/updater 검증은 기존 release gate로 남긴다.
