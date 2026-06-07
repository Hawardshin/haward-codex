# Three Clock WebGL Runtime Cleanup Omission Check

- 날짜: 2026-06-07
- 요청 범위 확인:
  - 이전 작업 계속 구현: 충족.
  - 기능적 이슈 제거: 3D 런타임 Clock 경고 제거로 한 슬라이스 충족.
  - 사용자 경험/성능 개선: WebGL 보존 버퍼 기본값 제거로 일부 충족.
- 누락 방지 체크:
  - 앱 직접 `clock.getElapsedTime()` 사용 제거 확인.
  - React Three Fiber 내부 Clock 경고 원인 확인.
  - 과도한 전체 console suppression 대신 정확한 메시지 필터만 적용.
  - Three 다른 로그/경고/오류 forwarding 유지.
  - 테스트 계약 업데이트.
  - 타입 체크, 테스트, 빌드, 브라우저 smoke 실행.
- 남은 별도 작업:
  - public release signing/notarization/updater/clean-machine smoke.
  - broader UI/feature simplification continuation queue.

