# 요청-결과 Trace

- 요청: Agent 탭 첫 진입 지연을 시작 로딩으로 이동.
- 결과: 초기 ready를 약 4초대로 늘리고 Agent 탭 전환을 약 0.22-0.24초로 낮춤.
- 주요 구현:
  - `MonitorShell.tsx`
  - `SnapshotLoader.tsx`
  - `MonitorShellBoundary.tsx`
  - `SnapshotLoadingShell.tsx`
  - `next.config.mjs`
- 검증:
  - workspace-monitor check/test/build/perf
  - static/dev Playwright smoke
  - in-app Browser smoke
- 후속: internal package build와 commit/push.
