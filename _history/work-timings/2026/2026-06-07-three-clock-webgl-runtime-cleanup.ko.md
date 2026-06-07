# Three Clock WebGL Runtime Cleanup Timing

- 날짜: 2026-06-07
- 대략 단계:
  - web-first 확인 및 로컬 원인 추적: 약 10분.
  - 코드 수정 및 테스트 계약 보강: 약 10분.
  - Playwright runtime smoke 및 WebGL 옵션 조정: 약 10분.
  - 빌드와 기록 작성: 약 10분.
- 병목:
  - 최신 `@react-three/fiber` 내부 Clock 사용이 앱 코드 검색만으로는 바로 보이지 않아 node_modules 배포 파일 추적이 필요했다.
  - headless Chromium WebGL driver performance warning과 앱 경고를 분리해 해석해야 했다.

