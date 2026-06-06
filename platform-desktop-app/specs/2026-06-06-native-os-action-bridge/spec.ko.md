# Spec: Native OS Action Bridge

## 목표

플랫폼 데스크톱 앱이 선택된 작업공간을 대상으로 OS 파일 관리자, 기본 앱, 외부 터미널을 직접 열 수 있게 한다.

## 범위

- Rust Tauri command: `run_native_os_action`
- Renderer Quick Start 버튼: Finder/파일 관리자, 기본 앱, 외부 터미널
- Runtime contract/check/readiness/test 업데이트

## 비범위

- 파일 삭제, 권한 변경, 시스템 설정 변경, shutdown/restart 같은 파괴적 OS 조작
- 전역 CLI 설치
- 작업공간 밖 절대경로 조작

## 설계

- action allowlist: `open_path`, `reveal_path`, `open_external_terminal`
- target path default: 현재 작업공간 root
- path guard: `workspace_root_for_app`, `canonicalize`, `ensure_workspace_path`
- open/reveal: `tauri_plugin_opener::OpenerExt`
- external terminal: macOS `open -a Terminal <dir>`, Windows `cmd /C start ...`, Linux known terminal launcher 후보
- process guard: timeout 5초, output 8KB, stdin null, stdout/stderr bounded capture, child cleanup
