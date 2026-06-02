# 요청 추적: Unified Ops Timeline

## 요청

- 히스토리 구조들과 모니터링 표면을 모두 하나로 합친다.

## 결과

- `workspace-monitor` snapshot에 `unifiedOps` 추가.
- Overview와 History에 `Unified Ops` 패널 추가.
- collector/readiness 테스트 보강.
- `REQ-WM-018`과 `workspace-monitor/specs/2026-06-02-unified-ops-timeline/` 추가.

## 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/specs/2026-06-02-unified-ops-timeline/`

## 검증

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- static server smoke
