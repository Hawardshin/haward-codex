# 스펙: Single Purpose Home UI

## 목표

- Workspace Monitor 홈에서 사용자가 한 번에 하나의 기능 목적만 인지하고 선택하게 한다.
- 버튼 하나가 여러 결과를 암시하거나, 패널 하나가 상태/결정/지표/기록을 동시에 담는 구조를 줄인다.
- 기존 전체 화면 reflow와 버튼 크기 개선을 유지하면서 UI 의미 단위를 더 작고 명확하게 나눈다.

## 요구사항

- 핵심 기능 탭의 active detail은 primary action 하나만 제공한다.
- 홈의 빠른 action 버튼은 서로 다른 한 가지 행동만 수행해야 하며 같은 목적의 중복 버튼을 두지 않는다.
- 보조 disclosure는 한 패널당 한 정보 역할만 가진다.
- 운영 strip 버튼은 숫자 조합 대신 사용자가 인지 가능한 목적 라벨을 가져야 한다.
- 정책 문서에는 단일 목적 UI 원칙과 검증 기준을 기록한다.

## 제외

- 각 기능 화면 내부의 전체 정보구조 재설계
- runtime, source editor, terminal drawer처럼 작업 특성상 복합 워크벤치가 필요한 영역
- backend snapshot schema 변경
