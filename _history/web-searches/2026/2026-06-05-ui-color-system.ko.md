# 웹 검색 기록: Workspace Monitor UI color system

- 날짜: 2026-06-05
- 요청: UI 색상을 더 잘 적용하고 좋은 디자인 레퍼런스와 이론을 참고해 개선한다.

## 검색

- `Material Design 3 color system roles contrast official`
- `Apple Human Interface Guidelines color official UI`
- `WCAG 2.2 contrast minimum success criterion official`
- `IBM Carbon Design System color tokens official`

## 확인한 출처

- IBM Carbon Design System Color: https://v10.carbondesignsystem.com/guidelines/color/overview/
- Apple Human Interface Guidelines Color: https://developer.apple.com/design/human-interface-guidelines/color
- W3C WCAG 2.2 Contrast Minimum: https://www.w3.org/TR/WCAG22/#contrast-minimum
- Material Design color system: https://m3.material.io/styles/color/system/overview

## 계획 영향

- Carbon의 role-based token/theme 원칙을 따라 색상을 값 이름이 아니라 `text`, `surface`, `accent`, `status`, `control`, `terminal` 역할 token으로 나눈다.
- Apple HIG의 제한된 palette와 의미 있는 관계/중요도 표시 원칙을 따라 주 행동 색과 상태 색을 분리한다.
- WCAG 2.2 대비 기준을 토대로 light/dark 주요 foreground/background 조합을 자동 테스트로 고정한다.
- Material color role 방향을 참고해 primary action, selected state, status surface, dark surface foreground를 별도 역할로 둔다.

## 무시한 약한 출처

- Reddit/일반 블로그 검색 결과는 디자인 채택 신호나 논점 확인에는 유용할 수 있지만 이번 구현 근거로는 사용하지 않았다.
- Material 3 공식 페이지는 브라우저 텍스트 추출이 제한적이어서 role-based color system 방향 확인용으로만 사용했다.
- Apple HIG 페이지는 JavaScript 필요 페이지였으므로 공식 URL과 검색 결과 요약을 참고하고, 구체 구현 근거는 Carbon/WCAG의 텍스트 접근 가능한 문서로 보강했다.

## 공개 판단 요약

- Workspace Monitor 색상은 neutral surface가 대부분을 차지하고 accent는 주요 행동과 선택 상태에 제한적으로 써야 한다.
- 성공/경고/위험/info 상태 색은 주 행동 색과 섞이지 않아야 한다.
- dark theme과 terminal/source/code surface는 회색 반투명 text 대신 명시적 밝은 foreground token을 사용해야 한다.
- 색상 회귀는 스크린샷만으로 보지 않고 token contrast test와 정적 export smoke로 함께 확인한다.
