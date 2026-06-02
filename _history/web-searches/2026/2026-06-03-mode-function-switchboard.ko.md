# 웹 검색 기록: 모드와 기능 선택 위치 스위치보드

## 요청

- 다양한 기능과 모드를 명시적으로 선택할 수 있는 위치를 찾아주고 UI에 반영한다.

## 검색

- `Apple Human Interface Guidelines sidebars navigation modes segmented controls official`
- `Microsoft Fluent 2 navigation command bar tabs modes official design guidelines`
- `WAI ARIA tabs pattern navigation landmark official`

## 확인한 출처

- Apple Human Interface Guidelines, Navigation and Search: https://developer.apple.com/design/human-interface-guidelines/navigation-and-search
- Apple Human Interface Guidelines, Segmented Controls: https://developer.apple.com/design/human-interface-guidelines/segmented-controls
- Microsoft Fluent 2, Navigation: https://fluent2.microsoft.design/components/web/react/core/navigation
- WAI-ARIA Authoring Practices, Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WAI-ARIA Authoring Practices, Landmarks Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/

## 반영

- 모드 선택은 흩어진 UI에만 두지 않고 Overview의 명시적 switchboard로 모았다.
- 현재 위치와 선택 위치를 함께 보여주기 위해 group, option, selector location, source path를 snapshot에 구조화했다.
- view/language/section처럼 즉시 선택 가능한 항목은 UI 동작에 연결하고, work/install처럼 task/setup 절차에 속한 항목은 registry 출처와 선택 위치를 표시했다.

## 불확실성

- 공개 배포 수준 접근성 검증은 별도 브라우저 스크린샷/키보드 테스트가 필요하다.
