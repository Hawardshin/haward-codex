# 웹 검색 기록: Unified Action Group UI

## 검색

- 날짜: 2026-06-05
- 목적: 반복 버튼/액션 묶음을 통일하기 전 UI 일관성, 친숙한 컨트롤, 상태 표현, 접근 가능한 primitive 기준 확인

## 질의

- `Nielsen Norman Group consistency standards usability heuristics official`
- `Material Design 3 interaction states buttons navigation official guidelines`
- `Apple Human Interface Guidelines consistency familiar UI controls official`
- `Radix UI Themes Button component official docs`

## 확인한 강한 출처

- Nielsen Norman Group, 10 Usability Heuristics: Consistency and standards 기준. URL: https://www.nngroup.com/articles/ten-usability-heuristics/
- Apple Human Interface Guidelines: system-defined components와 familiar/consistent experience 기준. URL: https://developer.apple.com/design/human-interface-guidelines
- Material Design 3 interaction states: controls가 interaction state를 일관되게 표시해야 한다는 기준. URL: https://m3.material.io/foundations/interaction/states
- Radix Themes Button: open-source button primitive와 상태/레이아웃 behavior 기준. URL: https://www.radix-ui.com/themes/docs/components/button

## 약한 출처 처리

- 일반 블로그, 비공식 컴포넌트 예시, 커뮤니티 글은 이번 구현 기준으로 사용하지 않았다.

## 계획 반영

- 반복 action cluster를 화면별 ad hoc flex 구조 대신 shared primitive로 통일한다.
- 대표 action cluster는 `role`, `aria-label`, spacing density, wrap behavior를 공유한다.
- 좁은 화면에서는 action group 자체가 stretch되고 버튼은 44px 이상 타깃을 유지한다.
