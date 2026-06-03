# PTY Terminal Decision

## 결정

현재 설치형 데스크톱 앱은 interactive PTY/xterm을 기본 주 기능으로 채택하지 않는다. 기본 터미널 표면은 pipe-first CLI supervisor, task-run store, decision inbox, bounded stdout/stderr preview, stdin/defer/cancel command를 유지한다.

## 이유

- 플랫폼의 목적은 단순 터미널 에뮬레이터가 아니라 agent orchestration, 작업 기록 축적, 결정 보류, 검증, rollback 추적이다.
- 현재 pipe-first 구조는 task-run `record.json`, `stdout.log`, `stderr.log`, decision inbox, auto-defer, support diagnostic export와 이미 연결되어 있다.
- xterm.js와 native PTY는 더 자연스러운 터미널 UX를 줄 수 있지만 process lifecycle, file descriptor cleanup, terminal escape sequence, clipboard, scrollback, security boundary, dependency audit가 별도 제품 범위다.
- 사용자가 요구한 “하단에서 올라오는 다중 CLI 터미널”은 현재 drawer/workbench 형태로 구현되어 있으며, true PTY는 필수 조건이 아니라 optional extension이다.

## 정책

- external CLI는 계속 guest adapter로 취급한다.
- 질문, 승인, source-affecting 작업은 decision inbox와 merge gate를 우선한다.
- PTY 도입은 `xterm.js`, `@xterm/addon-fit`, Rust PTY crate, lifecycle/resource guard, install audit, rollback plan, clean smoke test가 준비될 때 별도 slice로 진행한다.

## 검증

- `RuntimeTerminalDrawer`가 다중 CLI session start/list/output/events view를 제공한다.
- `start_cli_adapter_session`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, `cancel_cli_adapter_session` command가 유지된다.
- task-run store와 support diagnostic이 bounded output을 계속 보존한다.
