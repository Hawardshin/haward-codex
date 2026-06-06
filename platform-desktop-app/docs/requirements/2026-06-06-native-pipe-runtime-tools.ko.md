# Requirement: Native Pipe Runtime Tools

## 배경

설치형 데스크톱 앱이 CLI 설정 확인을 넘어 여러 CLI를 직접 제어하려면 renderer의 문자열 명령 실행이 아니라 Rust/Tauri 런타임이 프로세스, stdin/stdout/stderr, OS pipe, timeout, cleanup을 소유해야 한다. 기존 `portable-pty` 기반 native terminal은 대화형 터미널에 적합하지만, 여러 프로세스를 명시적 pipe graph로 연결하는 실행 계층은 부족하다.

## 요구사항

- `REQ-NPRT-001`: 플랫폼 데스크톱 런타임은 프로젝트 로컬 Rust 의존성으로 OS pipe 생성 기능을 확보해야 한다.
- `REQ-NPRT-002`: 새 기능은 전역 CLI 설치 없이 `platform-desktop-app/src-tauri`의 Cargo manifest와 lock 파일로 추적되어야 한다.
- `REQ-NPRT-003`: Rust/Tauri는 shell string이 아니라 argv 기반 프로세스 두 개를 stdout-to-stdin OS pipe로 연결하는 bounded native command를 제공해야 한다.
- `REQ-NPRT-004`: 파이프 실행은 cwd boundary, command resolution, timeout, output byte bound, stderr/stdout 분리, process cleanup을 포함해야 한다.
- `REQ-NPRT-005`: 설치 감사, CLI pipeline record, resource check, verification 기록이 남아야 한다.

## 비범위

- 임의 사용자 명령을 unrestricted shell로 실행하는 기능.
- 장기 multi-process supervisor UI 완성.
- CLI 자동 설치, 로그인 자동화, public release signing/notarization 해결.

## 수용 기준

- `os_pipe` 또는 동등한 Rust OS pipe crate가 project-local dependency로 설치된다.
- `run_native_pipe_probe` Tauri command가 두 프로세스를 실제 OS pipe로 연결해 결과 report를 반환한다.
- readiness/runtime contract test가 새 dependency와 command surface를 확인한다.
- `cargo check`, desktop tests, package pipeline이 통과한다.
