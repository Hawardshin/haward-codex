# 2026-06-07 소스 에디터 catalog helper 분리 모드 선택

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 변경은 developer source workbench 내부 구조 개선이다.
- 파일 catalog 필터와 표시 라벨을 공통 helper로 옮기는 refactor이며 공개 배포 정책 변경은 아니다.

## 게이트

- 좁은 구조 계약 테스트를 먼저 실행한다.
- Workspace Monitor `check`, 전체 test, 내부 package/run을 통과시킨다.
