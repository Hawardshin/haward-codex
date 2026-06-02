# 계획: Unified Ops Timeline

- 작업 모드: `governance`
- 소유 프로젝트: `workspace-monitor/`
- view_mode: `superadmin_developer`

## 계획

1. web-first intake와 memory bootstrap을 수행한다.
2. current snapshot collector, snapshot type, Overview/History UI를 읽는다.
3. 큰 범위 요청을 `unifiedOps` snapshot + Overview/History UI + tests로 축소한다.
4. 요구사항 `REQ-WM-018`과 project spec을 추가한다.
5. collect/test/check/build/perf/static smoke로 검증한다.
6. omission/resource/grounding/evaluation 기록 후 commit/push한다.

## 큰 범위 분해

- 포함: `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/lib/snapshot.ts`, `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css`, 관련 테스트와 스펙.
- 제외: 실시간 telemetry backend, OpenTelemetry SDK, 외부 observability SaaS, 기존 탭 제거.
- merge gate: test/check/build/perf/static smoke 통과.
