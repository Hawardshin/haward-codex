# 2026-06-07 Task Run Store panel split 작업 요약

## 완료

- `TaskRunStorePanel.tsx`를 추가했다.
- `MonitorShell.tsx`의 Task Run Store 상세 JSX를 컴포넌트 호출로 바꾸고, task run 통계 계산을 새 컴포넌트 내부로 이동했다.
- `check-readiness.mjs`, `readiness.test.mjs`, `tool-studio.test.mjs`가 새 feature 파일을 source 검사에 포함하도록 수정했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`

## 결과

- `MonitorShell.tsx`가 추가로 약 130라인 줄었다.
- Task Run Store 기능과 한국어 copy 계약은 유지된다.
