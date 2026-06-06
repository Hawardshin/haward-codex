# Request Trace: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 요청

사용자는 사용자가 헷갈리지 않게 직관성을 개선하라고 요청했다.

## 결정

상단 titlebar에 현재 위치 breadcrumb를 추가하는 slice로 처리했다. 사용자가 새로운 설명을 읽지 않아도 현재 위치를 바로 인식하게 하는 변경이기 때문이다.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-07-titlebar-location-breadcrumb.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/spec.ko.md`
- 구현: `MonitorShell.tsx`, `globals.css`, `tool-studio.test.mjs`
- 검증: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/validation.ko.md`
- 평가: `_history/evaluations/2026/2026-06-07-titlebar-location-breadcrumb.ko.md`
- 요약: `_history/work-summaries/2026/2026-06-07-titlebar-location-breadcrumb.ko.md`

## 결과

titlebar는 홈, 기능 그룹, 현재 섹션을 표시하고 현재 섹션을 `aria-current="page"`로 표시한다. Browser smoke에서 section 이동, home 복귀, 모바일 overflow 없음도 확인했다.
