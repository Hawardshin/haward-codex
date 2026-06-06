# Spec: Native Pipe Runtime Tools

## 범위

- `platform-desktop-app/src-tauri`에 `os_pipe@1.2.3`을 추가한다.
- Rust/Tauri에 `run_native_pipe_probe` command를 추가한다.
- command는 `{ producerCommand, producerArgs, consumerCommand, consumerArgs, workingDir, timeoutMs, maxOutputBytes }` 입력을 받고, producer stdout을 consumer stdin에 OS pipe로 직접 연결한다.
- command는 stdout/stderr를 bounded capture로 반환하고, timeout 시 두 프로세스를 정리한다.
- runtime contract/check tests는 새 command와 dependency를 필수 surface로 본다.

## 실행 계약

- shell execution은 사용하지 않는다.
- command는 PATH에서 resolve된 executable이어야 한다.
- args는 배열로만 받는다.
- cwd는 workspace boundary resolver를 통과해야 한다.
- timeout과 output bound는 상한 clamp를 적용한다.
- producer stdout pipe writer는 parent에서 drop해 consumer EOF를 막지 않는다.

## 결정 기록

- 언어 선택: 기존 desktop runtime은 Rust/Tauri가 OS 권한과 packaged runtime을 소유하므로 Rust를 선택한다. Node renderer는 packaged app의 process ownership과 cleanup boundary가 약하다.
- 런타임 옵션 A: `os_pipe` + `std::process::Command`. 직접 OS pipe를 만들고 현재 코드의 bounded reader/thread pattern을 재사용할 수 있어 선택한다.
- 런타임 옵션 B: Tauri shell plugin. 단일 command spawn에는 적합하지만 앱 내부 process graph와 pipe edge를 Rust data structure로 검증하기 어렵다.
- 런타임 옵션 C: shell pipeline string. 구현은 빠르지만 injection, quoting, cancellation, provenance가 약해 기각한다.
- 구조 옵션 A: 기존 `lib.rs` command surface에 작게 추가. 현재 Tauri command가 단일 파일에 모여 있어 선택한다.
- 구조 옵션 B: 새 Rust module 분리. 장기적으로는 좋지만 현재 파일 구조가 아직 모듈화되어 있지 않아 이번 slice에서는 과한 이동이다.

## 참고 근거

- `os_pipe` docs: Rust standard `Stdio::piped()`보다 직접 pipe creation이 필요한 use case가 있다.
- Rust `std::process::Stdio` docs: stdin write와 stdout/stderr read를 동시에 관리하지 않으면 deadlock 위험이 있다.
- Tauri shell plugin docs: command spawn capability는 있지만 이번 요구의 핵심은 플랫폼이 pipe graph를 직접 소유하는 것이다.
