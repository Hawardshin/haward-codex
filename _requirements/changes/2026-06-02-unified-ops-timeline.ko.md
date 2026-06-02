# 요구사항 변경: Unified Ops Timeline

- 변경 ID: `REQ-CHANGE-2026-06-02-UNIFIED-OPS`
- 관련 요청: `UR-2026-06-02-060`
- 대상 프로젝트: `workspace-monitor/`

## 변경

- `REQ-WM-018` 추가: 분리된 히스토리 기록, 평가, 웹 검색, 작업 시간, 요청 추적, 협업 task/blocker/next action을 `unifiedOps` 이벤트 stream으로 합친다.

## 이유

- 사용자가 히스토리 구조와 모니터링 표면을 모두 하나로 합쳐야 한다고 지시했다.
- 기존 구조는 drill-down으로 유용하지만, 운영자가 현재 상태와 근거를 한 화면에서 상관관계화하기 어렵다.

## 검증

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
