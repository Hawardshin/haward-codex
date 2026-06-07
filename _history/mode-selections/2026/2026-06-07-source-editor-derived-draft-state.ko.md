# 2026-06-07 소스 에디터 draft 파생 상태 분리 모드 선택

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 변경은 developer source workbench 내부 구조 개선이다.
- 기능 동작을 바꾸지 않고 공통 기준을 helper로 이동하는 refactor다.

## 게이트

- 좁은 구조 계약 테스트를 먼저 실행한다.
- Workspace Monitor `check`, 전체 test, 내부 package/run을 통과시킨다.
