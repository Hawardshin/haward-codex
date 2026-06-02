# Research Note: Desktop CLI Supervisor MVP

## 요약

이번 구현은 Tauri shell plugin이나 PTY dependency를 설치하지 않고도 실제 CLI subprocess 실행 경로를 시작하는 최소 MVP다. 안전한 시작점은 allowlist된 command의 PATH 탐지와 stdin 없는 bounded `--version` probe다.

## 근거

- Tauri config 공식 문서는 `withGlobalTauri`로 `window.__TAURI__` 주입을 제어한다고 설명한다.
- Tauri command 문서는 frontend가 Rust command를 `invoke`로 호출할 수 있음을 보여준다.
- Tauri shell plugin 문서는 shell execute/spawn/stdin-write 권한 scope가 필요하므로, 이번 MVP에서 바로 쓰기에는 권한과 설치 감사가 필요하다.
- xterm.js와 Monaco는 후속 interactive terminal/source editor 구현 후보지만 이번 변경에는 설치하지 않았다.

## 구현 결정

- Rust backend: `list_cli_adapters`, `run_cli_adapter_health`, `run_all_cli_adapter_health`.
- UI: `workspace-monitor`의 `Desktop` 탭.
- 실행 제한: command allowlist, PATH 탐지, timeout, max output, stdin null, decision prompt 후보 감지.
- fallback: Tauri runtime이 없는 브라우저에서는 unavailable 상태로 degrade.

## 한계

- Rust toolchain 부재로 Rust compile/smoke test는 실행하지 못했다.
- 실제 long-running CLI task, PTY, stdin write, cancellation UI, persisted run artifact는 후속 구현이다.
