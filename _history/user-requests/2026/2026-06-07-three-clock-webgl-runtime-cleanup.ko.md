# Three Clock WebGL Runtime Cleanup User Request

- 날짜: 2026-06-07
- 사용자 요청 요약: 이전 구현을 계속 진행하고, 남은 기능적 이슈와 사용자 경험 문제를 알아서 넓게 고친다.
- 이번 슬라이스 범위:
  - 3D 에이전트 화면에서 확인된 `THREE.Clock` deprecation 경고 제거.
  - React Three Fiber 내부 경고가 사용자 콘솔에 새지 않도록 좁은 Three 콘솔 경계 추가.
  - WebGL Canvas 기본 설정에서 불필요한 `preserveDrawingBuffer` 사용 제거.
- 제외:
  - React Three Fiber 패키지 자체 패치 또는 fork.
  - public macOS signing/notarization/updater 문제.

