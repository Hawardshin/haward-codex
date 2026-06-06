# Evaluation: Native OS Action Bridge

날짜: 2026-06-06

## 사용자 요구 대비

요구: 운영체제 기능을 직접 조작하도록 도움.

결과: `run_native_os_action`을 추가해 작업공간을 Finder/파일 관리자에서 표시, 기본 앱으로 열기, 외부 터미널로 열기 기능을 제공했다. Quick Start에 직접 실행 버튼을 추가했다.

## 안전 경계

- 허용 액션은 3개로 제한했다.
- 작업공간 밖 경로, `_private/`, `outputs/` 대상은 기존 path guard로 차단한다.
- 외부 터미널은 shell string이 아니라 executable + args로 실행한다.
- 자동 검증에서 실제 OS 창을 띄우는 smoke는 제외했다.

## 검증

- Rust tests, desktop Node tests, workspace-monitor tests, desktop check, renderer check 통과.
- `pnpm --dir platform-desktop-app package:internal` 통과. macOS `.app` 서명 검증 및 `.dmg` verify 통과.
