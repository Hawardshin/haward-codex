# Request Trace: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## 요청

스크롤은 code, 기능 목록, popup 같은 제한된 곳에서만 최대한 쓰고, 메인 화면/tab 전체를 scroll 영역으로 만드는 것을 자제해 달라는 UI 운영 지침.

## 결과

- durable instructions와 `AGENTS.md`에 main tab/page scroll ownership 제한을 추가했다.
- UI tone policy 한/영 문서에 근거, 원칙, 검증 항목을 추가했다.
- memory bootstrap manifest에 future session anchor를 갱신했다.
- `check-scroll-containers.mjs`에 `.desktop-viewport`, `.mounted-section-panel` scroll owner 회귀 방지 검사를 추가했다.

## 주요 산출물

- `_requirements/reviews/2026-06-06-main-tab-scroll-scope-policy.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-06-main-tab-scroll-scope-policy.ko.md`
- `platform-desktop-app/specs/2026-06-06-main-tab-scroll-scope-policy/spec.ko.md`
- `_history/evaluations/2026/2026-06-06-main-tab-scroll-scope-policy.ko.md`

## 검증 링크

- Validation: `platform-desktop-app/specs/2026-06-06-main-tab-scroll-scope-policy/validation.ko.md`
- Omission: `_history/omission-checks/2026/2026-06-06-main-tab-scroll-scope-policy.json`
