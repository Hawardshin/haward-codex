# 2026-06-07 설정 동기화 공통 훅 리팩터 웹 검색

- 작업: `platform-desktop-app`의 설정/런타임 동기화 로직을 공통 훅으로 분리.
- 검색 시각: 2026-06-07 KST.
- 검색 쿼리:
  - `React custom hook extracting shared side effect logic official docs`
  - `React reuse logic with custom hooks official docs`
  - `Tauri v2 React invoke state refresh official docs`
- 확인한 주요 출처:
  - React 공식 문서 `Reusing Logic with Custom Hooks`: https://react.dev/learn/reusing-logic-with-custom-hooks
- 계획 영향:
  - UI 이벤트 핸들러별로 반복되던 설정 동기화 옵션과 side effect를 `useSettingsRuntimeSync` 훅으로 분리한다.
  - `MonitorShell.tsx`는 동기화의 사용 지점만 유지하고, in-flight 병합, debounce queue, busy/notice 상태, reason label은 훅에서 소유한다.
- 불확실성:
  - Tauri 런타임 command 자체를 바꾼 작업은 아니므로 Tauri 공식 문서 확인은 구현 방향에 직접 영향을 주지 않았다.
  - 공개 배포 readiness는 서명, 공증, updater 채널 입력값에 여전히 의존한다.

