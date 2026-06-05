# 웹 검색 기록: Scroll Scope Color Speed

## 검색

- 날짜: 2026-06-05
- 목적: 범위별 스크롤, 절제된 색상 역할, 상호작용 속도 개선 기준 확인

## 질의

- `WCAG 2.2 reflow scrollable regions horizontal scrolling official`
- `Material Design 3 color system roles surface primary secondary official`
- `web.dev INP optimize interaction latency avoid long tasks official`
- `MDN CSS overflow scroll container overscroll-behavior official`

## 확인한 강한 출처

- MDN `overscroll-behavior`: scroll container 경계에서 scroll chaining을 제어하는 기준. URL: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
- MDN CSS overscroll behavior guide: 중첩 scroll area가 부모 page scroll을 유발하는 상황과 제어 방법. URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overscroll_behavior
- web.dev Optimize INP: interaction latency는 input delay, event handler, presentation delay가 합쳐지며 long task와 layout thrashing을 줄여야 한다는 기준. URL: https://web.dev/articles/optimize-inp
- W3C WAI WCAG Reflow: 작은 viewport에서도 정보/기능 손실과 불필요한 2차원 스크롤 없이 reflow되어야 한다는 기준. URL: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- Material Design 3 Color Roles: 역할 기반 color system 참고. URL: https://m3.material.io/styles/color/roles

## 약한 출처 처리

- Reddit, 일반 블로그, 비공식 snippet은 adoption/문제 발견 신호로만 보고 구현 근거로 사용하지 않았다.

## 계획 반영

- 각 scroll scope에 `overscroll-behavior: contain`과 stable gutter를 적용한다.
- scrollbar 색상은 surface/line token과 연결해 조용하게 보이도록 한다.
- 페인트 containment는 sticky를 깨지 않는 리스트/터미널/소스/Tool Studio 내부 영역에만 적용한다.
- offscreen 3D animation은 pause해 interaction latency와 scroll 부하를 줄인다.
