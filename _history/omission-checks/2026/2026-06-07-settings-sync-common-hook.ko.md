# 2026-06-07 누락 방지 점검: 설정 동기화 공통 훅

- 요청 반영:
  - 공통 로직 분리: 완료.
  - 수동 동기화 버튼 반복 옵션 제거: 완료.
  - settings/provider/source/workspace 변경 후 동기화 경로 유지: 완료.
  - TypeScript 검증: 완료.
  - desktop app 검증: 완료.
- 확인한 회귀 방지:
  - `MonitorShell.tsx`에 `settingsSyncInFlightRef`가 남지 않도록 테스트 추가.
  - `syncSettingsAndRuntimeState({ reason: "manual"... })` 반복 호출이 남지 않도록 테스트 추가.
  - readiness 소스 묶음에 `useSettingsRuntimeSync.ts` 포함.
- 제외 또는 미처리:
  - 공개 배포 서명, 공증, updater secret 입력값 구성은 이번 공통 로직 리팩터 범위가 아니다.

