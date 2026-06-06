# 2026-06-06 설치 기록: os_pipe

## 상태

- 상태: installed
- 설치 대상: `os_pipe@1.2.3`
- 소유 프로젝트/도구: `platform-desktop-app`
- 설치 범위: project
- 환경 경로: `platform-desktop-app/src-tauri/`

## 설치 이유

- Rust/Tauri 런타임이 여러 CLI 프로세스를 shell string 없이 명시적 OS pipe로 연결할 수 있어야 한다.
- 기존 `portable-pty`는 interactive terminal 기반이고, 이번 요구의 핵심인 producer stdout to consumer stdin pipe graph 실행에는 직접 pipe 생성 API가 필요하다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| https://docs.rs/os_pipe/latest/os_pipe/ | 2026-06-06 | cross-platform OS pipe API 확인 |
| https://crates.io/crates/os_pipe/1.2.3 | 2026-06-06 | version, provenance, license 확인 |
| `cargo info os_pipe` | 2026-06-06 | license `MIT`, rust-version `1.63`, repository 확인 |
| https://doc.rust-lang.org/std/process/struct.Stdio.html | 2026-06-06 | pipe/deadlock 위험과 stdio 동시 처리 필요성 확인 |

## 설치 계획

- 정확한 설치 명령: `cargo add os_pipe@1.2.3`
- dependency 기록 파일:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`
- lock/SBOM 상태: Cargo.lock에 exact resolved package가 기록된다.
- 예상 변경 파일: Cargo manifest/lock, Rust runtime command, tests, history/spec/evaluation records.
- 권한 승인 필요 여부: project-local dependency install이며 global install이 아니므로 별도 권한 승인은 필요하지 않다.

## 보안/라이선스 검토

- 보안 검토: OS pipe file descriptor 생성 권한을 런타임 내부에서 사용한다. shell string 실행을 추가하지 않고 command resolution, argv args, cwd boundary, timeout, output bound, cleanup을 구현 범위에 포함한다.
- 라이선스 검토: `cargo info os_pipe` 기준 MIT.
- 유지보수/커뮤니티 신호: crates.io와 docs.rs에 문서화되어 있고 repository가 공개되어 있다.
- 알려진 위험: pipe writer를 parent에서 닫지 않으면 consumer EOF가 지연될 수 있고, stdout/stderr를 동시에 읽지 않으면 deadlock 위험이 있다.

## 설치 후 실제 결과

- 실행한 명령: `cargo add os_pipe@1.2.3`
- 설치된 버전: `os_pipe v1.2.3`
- 변경된 파일:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`
- 생성/갱신된 lock 파일: `platform-desktop-app/src-tauri/Cargo.lock`
- 검증 명령과 결과:
  - `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i os_pipe@1.2.3`: direct dependency 확인.
  - `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml native_pipe_probe_connects_producer_stdout_to_consumer_stdin`: 통과.
  - `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
  - `pnpm --dir platform-desktop-app test`: 통과.
  - `pnpm --dir platform-desktop-app check`: 통과.
  - `pnpm --dir platform-desktop-app package:internal`: 통과.

## Rollback

- 제거 명령: `cargo remove os_pipe`
- 되돌릴 파일: `platform-desktop-app/src-tauri/Cargo.toml`, `platform-desktop-app/src-tauri/Cargo.lock`, `platform-desktop-app/src-tauri/src/lib.rs`, 관련 tests/records.
- 복구 검증: `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`, `pnpm --dir platform-desktop-app test`.

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-06-native-pipe-runtime-tools.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools.ko.md`
- 커밋: pending
