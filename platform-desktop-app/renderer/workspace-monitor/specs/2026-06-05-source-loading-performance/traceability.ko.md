# 추적성: Source Loading Performance

| Requirement | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-029 | `components/MonitorShell.tsx`: Source surface에서만 catalog refresh, deferred filter, 중복 browser 렌더 제거 | `pnpm run check`, `pnpm test`, `pnpm exec next build`, `pnpm run perf:budget` |
| REQ-WM-029 | `components/workbench/WorkspaceExplorerPane.tsx`: 하위 directory 기본 collapsed | localhost smoke |

## 기록

- web_search_record: `_history/web-searches/2026/2026-06-05-source-loading-performance.ko.md`
- user_request_summary: `_history/user-requests/2026/2026-06-05-source-loading-performance.ko.md`
- request_trace: `_history/request-traces/2026/2026-06-05-source-loading-performance.ko.md`
- evaluation_input: `_history/evaluations/2026/2026-06-05-source-loading-performance-evaluation-input.json`
