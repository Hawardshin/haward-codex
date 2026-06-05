# 2026-06-05 Overview Focus Command Surface 웹 검색

## 질의

- `Apple Human Interface Guidelines layout navigation progressive disclosure official`
- `Material Design 3 navigation layout adaptive official`
- `Nielsen Norman Group progressive disclosure usability cognitive load`
- `Carbon Design System Shell navigation content layout IBM official`

## 확인한 출처

- Apple Human Interface Guidelines: 명확한 visual hierarchy와 content를 구분하는 원칙을 확인했다.
- Material Design layout guidance: 예측 가능하고 일관된 region, adaptive layout, app bar/navigation/body 같은 구역 구조를 확인했다.
- NN/g progressive disclosure: 복잡도를 낮추기 위해 정보와 행동을 순차적으로 노출하는 원칙을 확인했다.
- Carbon UI shell guidance: 제품 shell에서 header/navigation/content/system action을 구분하는 패턴을 확인했다.

## 계획 영향

- Overview 첫 화면을 카드 목록이 아니라 추천 작업 중심 command surface로 바꾼다.
- 다른 목표와 운영 상태는 별도 dock/strip으로 낮춰 첫 판단을 방해하지 않게 한다.
- 모바일/작은 창에서는 모든 region이 한 열로 접혀야 한다.

## 불확실성

- 전체 Workspace Monitor UI를 한 번에 전면 교체하지 않았다.
- 이번 변경은 UI 혁신의 첫 slice이며, 운영 섹션과 Source/Agents/Tools 내부 구조는 후속 slice로 남는다.
