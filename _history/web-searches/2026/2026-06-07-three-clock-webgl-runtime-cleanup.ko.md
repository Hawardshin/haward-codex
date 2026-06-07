# Three Clock WebGL Runtime Cleanup Web Search

- 날짜: 2026-06-07
- 요청 요약: 3D 에이전트 구현 이후 남은 런타임 경고와 성능 경고를 줄여 사용자 경험을 안정화한다.
- 검색 쿼리:
  - `three.js Timer documentation Clock deprecated use Timer official`
  - `three.js Clock deprecated Timer official docs`
  - `three.js Timer API docs official`
- 확인한 출처:
  - Three.js 공식 문서: `https://threejs.org/docs/#api/en/core/Timer`
  - Three.js 공식 문서: `https://threejs.org/docs/#api/en/core/Clock`
  - 로컬 설치 패키지: `@react-three/fiber@9.6.1`, `three@0.184.0`
- 판단:
  - Three.js는 `Timer`를 `Clock` 대체 API로 제공한다.
  - 앱 코드의 직접 `clock.getElapsedTime()` 사용은 제거할 수 있다.
  - 남은 `THREE.Clock` 경고는 최신 `@react-three/fiber@9.6.1` 배포 파일 내부의 `new THREE.Clock()`에서 발생한다.
- 계획 영향:
  - 앱 애니메이션은 `useFrame((_, delta) => ...)` 누적 시간으로 변경한다.
  - 의존성 내부 경고는 Three의 `setConsoleFunction` 경계를 사용해 알려진 Clock deprecation 메시지만 필터링한다.
  - WebGL 기본 렌더링은 `preserveDrawingBuffer: false`로 두어 불필요한 보존 버퍼 비용을 피한다.
- 불확실성:
  - Playwright/headless Chromium의 `ReadPixels` GPU stall 메시지는 브라우저 드라이버 경고로 남을 수 있으며, 제품 코드의 JavaScript 예외나 Three 경고로 취급하지 않는다.

