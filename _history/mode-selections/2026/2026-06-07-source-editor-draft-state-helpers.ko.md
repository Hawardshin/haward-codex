# 2026-06-07 소스 에디터 draft 상태 helper 분리 모드 선택

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 사용자가 지속적인 소스 구조 분리와 기능적 이슈 제거를 요청했다.
- 변경은 기존 desktop app developer surface의 source workbench 내부 refactor이며, end-user public release 정책 변경은 아니다.

## 게이트

- 좁은 계약 테스트를 먼저 실행한다.
- Workspace Monitor `check`와 전체 test를 통과시킨다.
- 내부 Tauri package/run 명령으로 TypeScript와 Rust/Tauri 경로를 함께 확인한다.
