# 웹 검색 기록: 핵심 기능 탭 구조

## 질의

- `official design system tabs navigation information architecture primary secondary tabs guidelines`
- `site:designsystem.digital.gov tabs component navigation related content same hierarchy`
- `site:atlassian.design tabs component navigation guidelines`

## 확인한 출처

- USWDS Tabs component: https://designsystem.digital.gov/components/tabs/
- VA.gov Design System, Tabs: https://design.va.gov/components/tabs
- Red Hat Design System, Navigation: https://ux.redhat.com/elements/navigation/
- Equinor Design System, Tabs: https://eds.equinor.com/0b0c666ab/p/06c38d-tabs/b/8804f2

## 판단 요약

- Tabs는 서로 관련 있고 같은 위계의 콘텐츠를 나누는 데 적합하다.
- 핵심 행동과 상위 구조는 flat tabs에 섞기보다 먼저 보이는 primary navigation 성격의 surface로 분리하는 편이 사용자가 현재 위치와 다음 이동 경로를 이해하기 쉽다.
- 탭은 짧은 label과 명확한 grouping을 가져야 하고, 모바일에서 label이 사라지면 핵심 기능 위치 파악이 어려워진다.

## 계획 영향

- Workspace Monitor 상단에 `core-feature-rail`을 추가해 핵심 기능 위치를 먼저 노출했다.
- 기존 flat section tabs를 기능군별 `section-tab-groups`로 나눴다.
- Overview에 `Core Functions` 패널을 추가해 첫 화면 자체가 기능 지도 역할을 하게 했다.
