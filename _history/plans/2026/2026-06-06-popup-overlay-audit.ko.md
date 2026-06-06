# Plan: Popup Overlay Audit

날짜: 2026-06-06

## 실행 계획
1. 웹 기준을 확인해 modal focus, menu keyboard, portal/collision, top-layer 개념을 정리한다.
2. 현재 overlay inventory를 확인한다: command palette, settings dialog, operator center, app choice/source picker, Tool Studio menus, terminal drawer.
3. 공통 focus containment hook과 root portal 구조를 적용한다.
4. z-index token을 overlay 종류별로 분리한다.
5. Browser smoke로 1280x720 뷰포트에서 clipping, focus, backdrop coverage를 확인한다.
6. workspace monitor test/check, renderer build, internal package, internal app open을 검증한다.

## 결정
- 새 dependency는 추가하지 않는다.
- native Popover API 전환은 보류한다. 현재 React/Radix stack에서는 root portal과 focus hook이 더 작은 변경으로 요구를 만족한다.
- portal target은 `body`가 아니라 `.desktop-app-root`로 한다. theme token 상속을 유지하면서 `desktop-viewport` animation containing block에서는 벗어나기 위해서다.
