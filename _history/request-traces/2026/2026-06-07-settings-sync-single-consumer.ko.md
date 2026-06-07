# 2026-06-07 요청-결과 추적: 설정 동기화 단일 소비자

- 요청:
  - 일관된 동작이 되도록 도와달라는 요청.
- 결과:
  - `settingsSyncRequestConsumer` prop으로 request 소비 권한을 분리.
  - desktop panel만 top-level settings/provider sync request를 소비.
  - source panel은 top-level request 소비를 비활성화.
- 변경 파일:
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
  - `platform-desktop-app/scripts/check-readiness.mjs`
- 검증:
  - workspace-monitor check/test 통과.
  - platform-desktop-app check/test 통과.
  - `corepack pnpm run desktop:package:run:internal` 통과.
  - 내부 `.app`와 `.dmg` 생성 및 앱 열기 완료.
