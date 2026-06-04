# 사용자 요청 요약: Depth First Navigation

## 요약

- 사용자는 한 탭 안에 여러 기능을 넣지 말고, 차라리 더 깊은 navigation 구조로 나누라고 요청했다.

## 해석

- 단일 목적 UI 원칙을 탭 정보구조까지 확장한다.
- Overview 홈은 여러 기능 패널을 한 화면에 넣는 곳이 아니라 기능 선택 메뉴가 되고, 각 기능은 child view로 들어가야 한다.

## 산출물

- depth-first tab/navigation 요구사항
- Workspace Monitor Overview home drill-down 구현
- 영속 지침, UI 정책, memory bootstrap 갱신
- 검증 및 요청 추적 기록
