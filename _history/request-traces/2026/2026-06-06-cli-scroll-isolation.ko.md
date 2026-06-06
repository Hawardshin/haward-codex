# 요청-결과 추적: CLI 스크롤 겹침 제거

- 날짜: 2026-06-06
- 요청: CLI 기능의 스크롤이 다른 스크롤과 겹쳐 불편하다는 지적
- 소유 프로젝트: `platform-desktop-app`

## 입력 해석

설정 모달 안에서 CLI 안내와 버튼 영역이 별도 스크롤처럼 보이거나 다른 스크롤바와 겹치지 않아야 한다.

## 결과

- 설정 backdrop은 `overflow: hidden`으로 바꾸고, 설정 본문은 `.settings-tab-panel`이 세로 스크롤을 소유하게 했다.
- subsection rail은 가로 스크롤만 가능하게 `overflow-y: hidden`을 명시했다.
- CLI setup guide, stepper, command copy row, Agent CLI command stack은 wrap grid와 `overflow: visible`로 고정했다.
- `check-scroll-containers.mjs`와 `tool-studio.test.mjs`에 새 계약을 추가했다.

## 연결 문서

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-cli-scroll-isolation.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-cli-scroll-isolation/`
- 웹 검색: `_history/web-searches/2026/2026-06-06-cli-scroll-isolation.ko.md`
- 누락 체크: `_history/omission-checks/2026/2026-06-06-cli-scroll-isolation.json`
- 리소스 체크: `_history/resource-checks/2026/2026-06-06-cli-scroll-isolation.json`
- 평가: `_history/evaluations/2026/2026-06-06-cli-scroll-isolation.ko.md`

## 검증

- renderer collect/check/test/build 통과
- Playwright smoke 통과
- internal package, codesign verify, DMG verify 통과
