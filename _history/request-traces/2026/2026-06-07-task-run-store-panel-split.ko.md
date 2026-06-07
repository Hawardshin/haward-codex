# 2026-06-07 요청-결과 추적: Task Run Store panel split

## 요청

- 이어서 구현.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/TaskRunStorePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 결과

- workspace monitor check 통과.
- workspace monitor test 통과.
- desktop app test 통과.
- desktop app check 통과.

## 판단

- 큰 UI 파일 축소와 기능 보존을 동시에 달성했다.
- public release gate는 외부 배포 설정이 필요하므로 그대로 남겼다.
