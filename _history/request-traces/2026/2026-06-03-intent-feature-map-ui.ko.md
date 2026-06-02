# 요청-결과 추적: Intent Feature Map UI

## 요청

- 요청 ID: `UR-2026-06-03-016`
- 요약: “계속해서 작업해줘”에 따라 이전 사용자 의도 기반 기능 지도에서 제안한 `Intent Feature Map UI`를 실제 Workspace Monitor 기능으로 구현했다.

## 결과

- `workspace-monitor` snapshot에 `intentFeatureMap`을 추가했다.
- Overview에 압축 `Intent Feature Map` 패널을 추가했다.
- developer/superadmin view에 `Intent Map` 탭을 추가했다.
- 고객용 customer snapshot에서는 내부 의도 맵을 제거했다.
- 요구사항 `REQ-WM-021`과 project spec을 추가했다.

## 주요 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/specs/2026-06-03-intent-feature-map-ui/`
- `agent-platform/configs/access/view-mode-registry.json`

## 검증

- `npm --prefix workspace-monitor test`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`: 통과
- `npm --prefix workspace-monitor run collect`: 통과
- `npm --prefix workspace-monitor run check`: 통과
- `npm --prefix workspace-monitor run build`: 통과
- `npm --prefix workspace-monitor run build:customer`: 통과
- `npm --prefix workspace-monitor run perf:budget`: 통과
- dev server HTTP smoke: `/` 200, snapshot `themes=12`, `now=4`, developer view `intent=true`

## 남은 한계

- in-app Browser MCP 도구가 노출되지 않아 클릭/스크린샷 검증은 하지 못했다.
- 다음 제품 후보는 persistent workspace chooser, capability candidate inbox, CLI adapter setup wizard, data quality dashboard다.

