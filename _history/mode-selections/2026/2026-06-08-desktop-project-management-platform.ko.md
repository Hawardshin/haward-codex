# 작업 모드 선택: desktop project management platform

- 날짜: 2026-06-08
- 선택 모드: `standard`
- view_mode: `superadmin_developer`
- install_mode: `developer`

## 선택 이유

이번 작업은 기존 제품 분리 결정을 바탕으로 데스크톱 UI, snapshot model, collector, generated artifacts, tests, readiness를 변경하는 의미 있는 구현 작업이다. 공개 릴리스나 설치 패키징 자체를 변경하지 않으므로 `governance`보다는 `standard`가 적합하다.

## 필수 게이트

- web-first intake 기록
- requirements/spec/trace 기록
- omission/resource/evaluation close-out
- renderer check/test/build
- platform desktop test/check
- Browser smoke
