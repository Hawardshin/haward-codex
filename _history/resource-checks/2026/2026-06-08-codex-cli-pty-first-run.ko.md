# 2026-06-08 Codex CLI PTY first-run 리소스 점검

## 리소스 영향

- 새 long-running PTY process 경로를 추가했다.
- 기존 `PTY_PROCESS_TABLE` 관리, cancel, resize, poll, output drain 경로를 재사용한다.
- provider env는 launch 시 command env에만 주입한다.
- 새 timer, worker, subscription은 추가하지 않았다.

## 누수 방지

- PTY 세션 생성은 기존 `create_native_pty_session` lifecycle을 따른다.
- 기존 cancel command와 session output drain thread를 유지한다.
- pipe session은 자동화/기록용으로 남기고 TUI CLI만 PTY 경로로 라우팅한다.

## 검증

- `cargo check/test` 통과.
- renderer check/test 통과.
- desktop check/test 통과.
- renderer customer build 통과.
