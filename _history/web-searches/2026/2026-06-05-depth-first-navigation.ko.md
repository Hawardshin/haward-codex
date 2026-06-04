# 웹 검색 기록: Depth First Navigation

## 요청 요약

- 한 탭에 여러 기능을 넣지 말고, 필요한 경우 더 깊은 navigation/drill-down으로 나눠야 한다.

## 검색어

- `W3C cognitive accessibility step by step navigation one task at a time clear steps`
- `Nielsen Norman Group information architecture deep navigation progressive disclosure one task per page`
- `design system one thing per page progressive disclosure tabs multiple tasks`

## 확인한 출처

- W3C WAI, Cognitive Accessibility Design Pattern: Make the Purpose of Your Page Clear: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p01-clear-purpose/
- W3C WAI, Cognitive Accessibility Design Pattern: Break Content into Manageable Pieces: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p01-chunk/
- W3C WAI, Cognitive Accessibility Design Pattern: Clearly Identify Controls and Their Use: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p05-clear-controls/
- VA.gov Design System, Ask Users for a Single Response: https://dev-design.va.gov/5931/patterns/ask-users-for/a-single-response
- GOV.UK Design System, One thing per page: https://www.gov.uk/service-manual/design/form-structure#start-with-one-thing-per-page

## 적용 인사이트

- 화면 목적과 컨트롤 목적은 명확해야 하며, 사용자가 한 번에 이해해야 하는 내용을 관리 가능한 조각으로 나누는 것이 인지 접근성에 맞다.
- 한 번에 하나의 논리적 항목을 다루는 패턴은 집중과 이해를 돕는다.
- 따라서 Workspace Monitor Overview 탭은 여러 기능 패널을 동시에 보여주는 얕은 dashboard가 아니라 선택 메뉴 역할만 하고, 실제 기능 내용은 drill-down child view에서 하나씩 보여주는 구조가 더 적합하다.

## 제외하거나 약하게 본 출처

- 일반 블로그형 정보구조 글은 방향 참고로만 사용했다.
- 탭 UI 자체의 구체 구현 가이드는 제품 맥락과 상충할 수 있어 W3C/WAI와 공공 디자인 시스템의 task 분리 원칙을 우선했다.

## 불확실성

- 이번 변경은 Overview 홈 탭에 우선 적용했다. Desktop/Source/Agents 같은 대형 workbench 탭은 작업 특성상 다중 패널이 필요할 수 있어 별도 설계 검토가 필요하다.
