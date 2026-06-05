# 웹 검색 기록: Desktop Package Readiness Repair

## 검색

- 날짜: 2026-06-05
- 목적: 패키징 실패 원인이 외부 최신 정보보다 로컬 테스트/계약 불일치인지 확인

## 질의

- `software regression tests align tests with requirements official docs`
- `Node.js assert deepStrictEqual official documentation node:test`
- `pnpm Node.js version requirements official documentation`

## 판단

- 검색 결과는 구현 방향을 바꾸지 않았다.
- 이번 실패는 로컬 `readiness.test.mjs`, `check-readiness.mjs`, view-mode registry, product feature registry, Workspace Monitor CSS/test 계약의 불일치였다.
- 외부 사실보다 저장소의 최신 요구사항 `platform-desktop-app/docs/requirements/2026-06-04-core-feature-priority.*.md`와 실제 검증 출력이 더 강한 근거였다.

## 계획 반영

- user 기본 navigation은 활성 요구사항에 맞춰 `overview`, `agents`, `desktop`, `source`, `intent`로 정렬한다.
- `tools`는 기능/개발 표면으로 유지하되 user 기본 pinned/navigation에는 강제 삽입하지 않는다.
- customer/developer snapshot은 검증 파이프라인이 기대하는 형태로 재생성한다.

