# Web Search: Clear Tab Discrimination

## 요청 요약

현재 화면에서 탭의 선택/비선택 상태가 명확히 구분되는지 확인하고 개선한다.

## 검색어

- `JetBrains IntelliJ Platform SDK Tabs UI guidelines active inactive tabs official`
- `WCAG 2.2 non-text contrast user interface component states active tab indicator official`
- `W3C WAI tabs pattern selected tab visual state official`

## 확인한 출처

- JetBrains IntelliJ Platform SDK, Tabs: https://plugins.jetbrains.com/docs/intellij/tabs.html
- W3C WAI-ARIA Authoring Practices, Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- W3C WCAG2ICT, Focus and active component contrast guidance: https://www.w3.org/TR/2023/DNOTE-wcag2ict-20230815/
- JetBrains IntelliJ Platform SDK, Theme UI Controls and EditorTabs examples: https://plugins.jetbrains.com/docs/intellij/themes-customize.html

## 반영한 인사이트

- 탭은 일반적으로 content 위쪽 edge에 배치하고, 탭 border가 영역 끝까지 명확히 닿아야 한다.
- 활성 탭은 `aria-selected=true`, 비활성 탭은 `aria-selected=false`를 가져야 한다.
- 시각 상태는 색상만 의존하지 말고 굵은 indicator, border, shadow, weight 차이를 함께 사용해야 한다.
- IntelliJ theme 예시도 selected background, underline color, underline height 같은 별도 selected indicator를 둔다.

## 약한 출처

- 커뮤니티 글은 “활성 탭이 약하면 사용자가 불편해한다”는 신호로만 보고 구현 근거로 삼지 않았다.
