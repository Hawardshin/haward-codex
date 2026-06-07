# 2026-06-07 Runtime Data Support panel split 작업 요약

## 완료

- `RuntimeDataSupportPanel.tsx`를 추가했다.
- `MonitorShell.tsx`의 Runtime Data & Support 렌더링 블록을 컴포넌트 호출로 교체했다.
- `check-readiness.mjs`, `readiness.test.mjs`, `check-service-readiness.mjs`가 새 feature 파일을 source 검사에 포함하도록 수정했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`

## 결과

- `MonitorShell.tsx`가 추가로 약 115라인 줄었다.
- Support Diagnostic Bundle UI 계약은 service readiness 검사에서 계속 보장된다.
