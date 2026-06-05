# 프로세스/파이프 누수 방지 요구사항

## 배경

사용자는 데스크톱 앱이 터미널과 CLI 작업을 운영체제 자원으로 적극 활용하되, 프로세스 관리, pipe 관리, 메모리 누수가 없도록 다시 점검하고 구현해 달라고 요청했다. 기존 네이티브 PTY와 pipe-first CLI supervisor는 장기 실행 child process, stdin/stdout/stderr pipe, reader thread, PTY master/writer를 소유하므로 세션 종료 경로가 하나라도 빠지면 탭 이동과 터미널 반복 사용 중 리소스가 누적될 수 있다.

## 요구사항

| ID | 요구사항 | 우선순위 | 판정 기준 |
| --- | --- | --- | --- |
| REQ-PPL-001 | CLI 세션은 cancel, timeout, error, store cleanup, drop 경로에서 child process를 wait 또는 kill/wait해야 한다. | must | `CliSession`에 Drop guard와 dispose/finalize 함수가 있고, 직접 `kill`만 호출하는 cleanup 경로가 남지 않는다. |
| REQ-PPL-002 | pipe 기반 CLI 실행은 stdout/stderr reader thread가 끝날 수 있도록 stdin을 먼저 닫고 reader join grace를 적용해야 한다. | must | `SESSION_READER_JOIN_GRACE_MS`, `join_reader_with_grace`, bounded output retention이 있다. |
| REQ-PPL-003 | Unix/macOS에서는 CLI adapter child를 별도 process group으로 시작하고 timeout/cleanup 시 process group kill을 수행해야 한다. | must | `CommandExt::process_group(0)`와 `libc::kill(-pid, SIGKILL)` 기반 cleanup이 있다. |
| REQ-PPL-004 | PTY 세션은 finished/cancel/drop 경로에서 writer와 master를 drop하고 reader thread를 grace join해야 한다. | must | `NativePtySession.master`는 `Option`으로 소유권 해제 가능하고 `dispose_native_pty_session_runtime`이 있다. |
| REQ-PPL-005 | 구현은 readiness/static tests와 Rust compile/test, 내부 패키징 빌드로 검증해야 한다. | must | validation record에 `platform-desktop-app test`, `cargo check/test`, `desktop:package:internal` 결과가 남는다. |

## 범위 제외

- Windows job object 기반 process tree cleanup은 이번 macOS 중심 slice의 직접 구현 범위가 아니다.
- 실행 중인 사용자 터미널을 선제적으로 종료하는 global reap policy는 이번 범위가 아니다.
- 장기 세션별 실제 RSS/FD count telemetry는 후속 resource diagnostic slice로 남긴다.
