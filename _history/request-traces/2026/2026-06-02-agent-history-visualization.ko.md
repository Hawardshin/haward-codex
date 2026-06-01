# 요청-결과 추적: 에이전트와 히스토리 시각화

## 요청

- ID: `UR-2026-06-02-005`
- 요약: 에이전트들이 무엇이 있는지와 히스토리를 시각화해달라는 요청.

## 결과

- Workspace Monitor snapshot에 `agentCatalog`를 추가했다.
- Agents 섹션에 에이전트 인벤토리, runtime/status 막대, task status lane을 추가했다.
- Overview/History에 히스토리 밀도와 유형별 분포 시각화를 추가했다.
- 새 chart dependency는 설치하지 않았다.

## 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/specs/2026-06-02-agent-history-visualization/`

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-02-agent-history-visualization.ko.md`

## 커밋

- 예정: 검증 후 기록
