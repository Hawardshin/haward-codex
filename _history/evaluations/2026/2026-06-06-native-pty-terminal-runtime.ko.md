# 최종 평가: 네이티브 PTY 터미널 런타임

## 판정

완료.

## 요구 충족

- 터미널 재검토: 기존 pipe-first 구현의 한계를 확인하고 문서화했다.
- OS 자원 활용: Rust `portable-pty` 기반 native PTY session을 추가했다.
- UI 개선: xterm.js 기반 PTY tab을 추가해 `<pre>` 로그 패널과 분리했다.
- 기존 기능 보존: pipe-first CLI supervisor와 decision inbox/task-run store는 유지했다.
- 자동 빌드: `package:internal`을 실행해 내부 `.app`와 `.dmg`를 생성했다.

## 검증 근거

- `cargo check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app test`
- `corepack pnpm --dir platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
- `git diff --check`

## 설치/리소스 플래그

- `installation_occurred=true`
- `installation_record_targets`: `_history/installations/2026/2026-06-06-native-pty-terminal-portable-pty.ko.md`
- `resource_risk_occurred=true`
- `resource_check_targets`: `_history/resource-checks/2026/2026-06-06-native-pty-terminal-runtime.ko.md`
- `omission_check_targets`: `_history/omission-checks/2026/2026-06-06-native-pty-terminal-runtime.ko.md`

## 남은 위험

- Playwright click smoke는 정적 snapshot에서 터미널 launcher rect가 0이라 DOM/CSS smoke로 대체했다.
- 실제 설치 앱에서 PTY shell prompt/input/resize를 눈으로 확인하는 clean-machine smoke는 후속 release validation에 남아 있다.
- 공개 배포는 signing/notarization/updater/clean-machine gate가 남아 있다.
