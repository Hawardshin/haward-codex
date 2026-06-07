# 2026-06-07 요청-결과 추적: 설정 동기화 공통 훅

- 요청:
  - 공통되는 로직을 하나로 빼서 일관된 동작을 만들 것.
- 결과:
  - `useSettingsRuntimeSync.ts`를 추가했다.
  - `MonitorShell.tsx`는 훅의 `queueSettingsSync`, `runManualSettingsSync`, `syncSettingsAndRuntimeState`를 사용한다.
  - readiness와 test 계약에 `useSettingsRuntimeSync`, `createSettingsRuntimeSyncRequest`, `runManualSettingsSync` 토큰을 추가했다.
- 산출물:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/useSettingsRuntimeSync.ts`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
  - `platform-desktop-app/scripts/check-readiness.mjs`
- 검증:
  - workspace-monitor check/test 통과.
  - platform-desktop-app check/test 통과.
  - `corepack pnpm run desktop:package:run:internal` 통과.
  - 내부 `.app`와 `.dmg` 생성 및 앱 열기 완료.
