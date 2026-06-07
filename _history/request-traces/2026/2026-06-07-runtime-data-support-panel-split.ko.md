# 2026-06-07 요청-결과 추적: Runtime Data Support panel split

## 요청

- 이어서 구현.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/RuntimeDataSupportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 검증 결과

- workspace monitor check/test 통과.
- desktop app test/check 통과.

## 판단

- 대형 UI 파일 축소와 런타임 데이터/지원 진단 기능 보존을 동시에 달성했다.
