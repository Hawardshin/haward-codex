# 2026-06-07 누락 방지 점검: 설정 동기화 단일 소비자

- 확인한 요구:
  - 일관된 동작: top-level settings/provider request가 화면 활성 여부에 묶이지 않도록 조치.
  - 중복 방지: desktop panel만 top-level request 소비.
  - source 기능 유지: source save/workspace queue는 `useSettingsRuntimeSync` local queue로 유지.
  - 테스트 계약: `settingsSyncRequestConsumer` 토큰과 effect 조건을 검사.
- 검증 상태:
  - TypeScript 통과.
  - workspace-monitor check/test 통과.
  - platform-desktop-app check/test 통과.
- 미처리:
  - 공개 배포 signing/notarization/updater secret 구성은 이번 요청 범위가 아니다.

