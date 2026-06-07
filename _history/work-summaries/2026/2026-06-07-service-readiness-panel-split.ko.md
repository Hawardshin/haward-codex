# 2026-06-07 Service Readiness panel split 작업 요약

## 완료

- `ServiceReadinessPanel.tsx`를 추가해 Service Readiness 화면 렌더링을 feature 컴포넌트로 분리했다.
- `MonitorShell.tsx`는 상태와 액션 callback만 넘기도록 줄였다.
- `check-readiness.mjs`와 `readiness.test.mjs`의 source aggregation에 새 컴포넌트를 포함했다.
- `workspace-monitor` check, `workspace-monitor` test, `platform-desktop-app` test, `platform-desktop-app` check를 통과했다.

## 결과

- Service Readiness UI 기능은 유지되며, 대형 `MonitorShell.tsx`에서 약 190라인의 화면 상세 책임이 빠졌다.
- update channel 카드 토큰은 새 컴포넌트에서도 readiness 계약으로 계속 검사된다.
