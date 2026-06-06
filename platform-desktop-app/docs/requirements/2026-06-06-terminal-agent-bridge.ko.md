# 요구사항: Terminal Agent Bridge

## 사용자 요구

터미널 연결 기능과 에이전트 실행 기능이 분리되어 보이지 않도록 제대로 연결한다.

## 기능 요구사항

- Desktop Runtime 첫 화면에서 native PTY 연결, CLI 어댑터 준비, 에이전트 세션 상태를 한 흐름으로 보여준다.
- 사용자는 한 버튼으로 PTY를 먼저 연결하고, 연결이 쓰기 가능한 상태가 된 뒤 선택된 에이전트/CLI 세션을 시작할 수 있어야 한다.
- PTY 연결이 실패하면 에이전트 세션을 시작하지 않고 실패 상태를 남긴다.
- 기존 선택 실행 버튼도 Desktop action feedback에서 실패를 성공으로 오인하지 않도록 실패를 전파한다.
- Browser preview처럼 Tauri runtime이 없는 환경에서는 연결 실행 버튼이 비활성화되어야 한다.

## 비기능 요구사항

- 새 long-running daemon, 새 dependency, 새 secret-bearing login 흐름을 만들지 않는다.
- 기존 Rust `start_native_pty_terminal`, `start_cli_adapter_session`, task-run 기록, terminal drawer를 재사용한다.
- 버튼과 상태 카드는 기존 desktop workbench 톤과 responsive grid 정책을 따른다.

## 제외

- 이번 slice는 새 Rust supervisor나 stdout/stdin pipe 연결을 추가하지 않는다.
- 1280px desktop shell 최소 폭 정책은 변경하지 않는다.
