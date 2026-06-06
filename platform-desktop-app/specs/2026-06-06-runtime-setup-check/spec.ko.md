# Spec: Runtime Setup Check

## 범위

- 설정의 `CLI 어댑터` 섹션에 “설정 점검” 액션과 결과 패널을 추가한다.
- 기존 `run_cli_adapter_health`를 선택된 adapter 점검에 재사용한다.
- 새 Tauri command `check_runtime_terminal_setup`을 추가해 현재 terminal shell command, fallback shell, cwd 해석 결과를 반환한다.
- renderer는 CLI health와 terminal check를 함께 실행하고 결과를 settings panel에 표시한다.

## 수용 기준

- `data-runtime-setup-check="settings"`를 가진 결과 영역이 존재한다.
- `check_runtime_terminal_setup` command가 Rust invoke handler에 등록된다.
- terminal check report에는 `status`, `command`, `resolvedPath`, `workingDir`, `error`가 포함된다.
- selected CLI check는 `run_cli_adapter_health` 결과를 사용하고 adapter 상태 목록도 refresh한다.
- startup command는 실행하지 않는다.

## 비범위

- CLI 설치/로그인 자동화.
- 장기 native PTY session 생성.
- public release updater/signing gate.

## 결정 기록

- 언어 선택: 기존 제품 경계가 Tauri Rust runtime + React renderer이므로 Rust command와 TypeScript UI를 선택한다. Node-only 검사는 packaged Tauri 런타임 PATH를 대표하지 못한다.
- 대안 1: 기존 `run_all_cli_adapter_health`만 노출. CLI는 확인되지만 terminal shell 설정을 검증하지 못해 기각.
- 대안 2: native PTY를 실제로 열어 셸을 점검. 장기 세션과 리소스 누수 위험이 있어 기각.
- 선택안: Rust에서 command/cwd 해석만 수행하는 lightweight terminal check와 기존 CLI health를 함께 실행한다.

## 참고 근거

- Node.js child process documentation: command lookup uses `PATH`, and shell execution has injection considerations.
- Tauri macOS bundle docs: GUI apps on macOS/Linux may not inherit shell dotfile `PATH`.
- 로컬 코드 참조: `run_cli_adapter_health`, `run_all_cli_adapter_health`, `resolve_command`, `start_native_pty_terminal`, `RuntimeCustomizationPanel`.
