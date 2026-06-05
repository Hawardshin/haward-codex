# 2026-06-06 UI 이론 기반 디자인 파운데이션 리팩토링 웹 검색

## 질의

- `Nielsen Norman Group visual hierarchy usability UI design principles`
- `Apple Human Interface Guidelines desktop app layout controls feedback`
- `Material Design 3 interaction states visual hierarchy accessibility`
- `WCAG 2.2 visual presentation focus appearance target size status messages`
- `site:nngroup.com/articles ten usability heuristics user interface design`
- `site:nngroup.com/articles principles visual design hierarchy UI`
- `IBM Carbon Design System content hierarchy spacing accessibility`
- `Microsoft Fluent 2 design system visual hierarchy density focus`

## 확인한 출처

- Nielsen Norman Group, 10 Usability Heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- Nielsen Norman Group, visual hierarchy 관련 자료: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
- Material Design 3 interaction states: https://m3.material.io/foundations/interaction/states
- Material Design 3 accessible design: https://m3.material.io/foundations/accessible-design
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Microsoft Fluent 2: https://fluent2.microsoft.design/
- IBM Carbon 2x grid: https://carbondesignsystem.com/guidelines/2x-grid/overview/

## 계획 영향

- 시각 위계는 새로운 장식보다 spacing, contrast, grouping, state feedback token으로 구현한다.
- desktop UI는 4px 기반 spacing과 반복 가능한 surface depth를 우선한다.
- focus 상태는 키보드 사용자가 놓치지 않도록 outline과 halo를 함께 둔다.
- Material/Fluent/Carbon식 foundation token 접근을 현재 CSS에 맞게 최소 침습으로 반영한다.

## 불확실성

- 이번 작업은 전체 디자인 시스템 문서화를 끝내는 작업이 아니라 실행 가능한 foundation slice다.
- source별 세부 수치가 앱 맥락과 다를 수 있어, 실제 렌더 검증으로 local fit을 확인했다.
