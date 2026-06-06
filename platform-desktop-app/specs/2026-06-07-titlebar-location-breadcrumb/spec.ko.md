# Spec: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 목표

사용자가 현재 보고 있는 화면의 위치를 기억하지 않아도 titlebar에서 바로 인식하게 한다.

## 동작

- `titlebar-section` 안에 `titlebar-location`을 둔다.
- 보기 모드는 `titlebar-mode-label`로 유지한다.
- 현재 위치 trail은 `titlebar-breadcrumb` nav와 ordered list로 표시한다.
- 첫 항목은 `홈` button이며 `primeSectionActivation("overview")`와 `openSection("overview")`를 재사용한다.
- 두 번째 항목은 현재 `currentFeatureGroup.label`을 표시한다.
- 세 번째 항목은 현재 `currentSectionLabel`이며 `aria-current="page"`를 가진다.

## UI 계약

- breadcrumb nav는 `data-current-location-trail`을 가진다.
- breadcrumb 항목은 `data-titlebar-breadcrumb="home"`, `"group"`, `"section"`을 가진다.
- 현재 섹션 항목은 `.titlebar-current-label`과 `aria-current="page"`를 가진다.
- breadcrumb 버튼은 최소 24px 조작 높이를 유지한다.
- 모바일 폭에서 `.titlebar-breadcrumb`, `.titlebar-current-label`, breadcrumb button이 viewport를 넘지 않아야 한다.
- `@media (max-width: 960px)`에서 `main`, `.desktop-app-root`, `.desktop-app-shell`은 `min-width: 0`을 가져야 한다.

## 안전 경계

- 기존 section state와 `openSection` lifecycle만 사용한다.
- 새 long-running resource, CLI pipeline, native permission을 만들지 않는다.
- Browser smoke는 renderer fallback DOM/interaction을 검증한다.
