# 웹 검색 기록: Agents Detail Single Workspace

- 날짜: 2026-06-05
- 요청 요지: UI 개선을 끝까지 계속 진행한다. 특히 한 화면에 너무 많은 기능이 쌓이는 문제를 줄인다.

## 검색어

- `2026 agent dashboard UI progressive disclosure single task workspace design pattern official design system tabs disclosure`
- `Nielsen Norman Group progressive disclosure complex interfaces cognitive load user interface design`
- `Carbon Design System tabs progressive disclosure dashboard UI guidance`
- `Material Design tabs navigation disclosure complex workflows`

## 확인한 출처

- Material Design Tabs: `https://m2.material.io/components/tabs`
- Material Design Navigation: `https://m1.material.io/patterns/navigation.html`
- Carbon Tabs usage: `https://carbondesignsystem.com/components/tabs/usage/`
- Carbon Disclosure pattern: `https://carbondesignsystem.com/patterns/disclosures-pattern/`
- UXPin progressive disclosure article: `https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/`

## 판단

- 세부 기능들은 같은 위계의 관련 content group이므로 tablist/segmented switcher가 적합하다.
- disclosure 안에 많은 panel을 쌓거나 disclosure를 중첩하면 사용자의 초점이 흐려질 수 있다.
- Agents 기본 화면은 채팅으로 유지하고, 세부 disclosure 내부는 한 번에 하나의 active workspace만 렌더링하는 구조가 사용자 요구와 맞다.
