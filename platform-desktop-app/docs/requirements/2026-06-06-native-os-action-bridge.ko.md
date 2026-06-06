# Requirement: Native OS Action Bridge

날짜: 2026-06-06

## 요구

사용자가 데스크톱 앱에서 운영체제 기능을 직접 조작할 수 있어야 한다. 조작은 작업공간 경계 안에서 안전하게 제한되어야 하며, CLI나 shell 문자열에 의존하지 않는 네이티브 경로를 우선 사용해야 한다.

## 수용 기준

- `run_native_os_action` Tauri 명령을 제공한다.
- 허용 액션은 `open_path`, `reveal_path`, `open_external_terminal`로 제한한다.
- 대상 경로는 선택된 작업공간 안으로 canonicalize하고 `_private/`, `outputs/`는 차단한다.
- 파일 관리자 표시와 기본 앱 열기는 Tauri opener API를 사용한다.
- 외부 터미널 열기는 OS별 executable + args로 실행하고 shell 문자열 조합을 피한다.
- Desktop Quick Start에서 Finder/파일 관리자, 기본 앱, 외부 터미널 액션을 직접 실행할 수 있어야 한다.
- 명령은 status, method, OS, target path, exit code, bounded 실행 정보를 보고한다.
