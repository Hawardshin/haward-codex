# 2026-06-07 source structure duplication removal user request

- 요약: 사용자가 "소스 구조 중복되는거 제거"라고 요청했다.
- 해석:
  - 앞선 데스크톱 앱 구조 리팩토링의 연속이다.
  - source file/module 목록과 readiness/test 구조 검사가 여러 곳에서 중복되는 부분을 제거해야 한다.
  - 동작 검증과 패키징 확인까지 이어서 수행해야 한다.
- 범위:
  - `platform-desktop-app/scripts/readiness/`
  - `platform-desktop-app/scripts/check-readiness.mjs`
  - `platform-desktop-app/scripts/check-service-readiness.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
- 제외:
  - `_private/` 열람.
  - 대형 런타임 코드 이동.
  - 공개 배포 credential 설정.
