# Traceability

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PPL-001 | `dispose_cli_session_runtime`, `kill_and_wait_child`, `impl Drop for CliSession` | `platform-desktop-app test`, `cargo check`, readiness token |
| REQ-PPL-002 | `SESSION_READER_JOIN_GRACE_MS`, `join_reader_with_grace`, `finalize_finished_cli_session_runtime` | `platform-desktop-app test`, readiness token |
| REQ-PPL-003 | `configure_process_group`, `kill_child_process_tree`, `libc::kill` | `cargo check`, readiness token |
| REQ-PPL-004 | `NativePtySession.master: Option`, `dispose_native_pty_session_runtime`, `finalize_finished_native_pty_runtime` | `platform-desktop-app test`, `cargo check`, readiness token |
| REQ-PPL-005 | validation, resource check, package build gate | `desktop:package:internal`, `git diff --check` |

## 사용자 요청 연결

- "프로세스 관리 파이프 관리 메모리 누수 없도록" -> process/pipe/session lifecycle guard.
- 이전 "터미널 기능 다시 살펴봐줘" -> native PTY cleanup 강화.
- 이전 "매번 내가 빌드 안하게 구현 다 끝나면 빌드까지 자동으로 해줘" -> 내부 패키징 빌드 close-out gate.
