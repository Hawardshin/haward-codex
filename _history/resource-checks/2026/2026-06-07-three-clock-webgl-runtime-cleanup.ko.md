# Three Clock WebGL Runtime Cleanup Resource Check

- 날짜: 2026-06-07
- 리소스 위험:
  - 로컬 Next dev server.
  - Playwright Chromium process.
  - WebGL canvas runtime.
- 조치:
  - dev server는 `http://localhost:3022`에서만 임시 실행했다.
  - Playwright browser는 스크립트 종료 시 `browser.close()`로 닫았다.
  - dev server session은 검증 후 Ctrl-C로 종료했다.
  - Canvas `preserveDrawingBuffer`를 `false`로 변경해 기본 렌더링 비용을 낮췄다.
- 결과:
  - 남은 실행 중 dev server 없음.
  - JavaScript error 0건.
  - `THREE.Clock` 경고 0건.
  - headless Chromium WebGL driver `ReadPixels` performance warning은 환경성 메시지로 남음.

