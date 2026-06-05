# 사용자 요청 요약: 프로세스/파이프 누수 방지

## 요약

사용자는 데스크톱 앱의 프로세스 관리, pipe 관리, 메모리 누수가 없도록 처리해 달라고 요청했다.

## 해석

- 터미널/CLI 세션의 child process cleanup을 강화한다.
- stdout/stderr/stdin pipe와 PTY writer/master가 세션 종료 후 남지 않게 한다.
- reader thread가 끝나지 않는 상태를 bounded하게 정리한다.
- 구현 후 빌드까지 자동 실행한다.

## 범위

- `platform-desktop-app` Rust/Tauri runtime.
- CLI adapter session, bounded command runner, native PTY terminal session.
- readiness/static tests와 internal package build.
