# Runtime Run Timeline 오픈소스 직접 검토

## 목적

Work Visibility slice 구현 전에 task/run 상태를 사용자가 판단 가능한 timeline으로 묶는 패턴을 확인했다.

## 확인한 소스

| 소스 | 확인 방식 | 확인한 파일/패턴 | 적용 |
| --- | --- | --- | --- |
| `temporalio/ui` | `/tmp/codex-work-visibility-temporal-ui`에 shallow sparse clone | `event-groups`, `order-groups-by-pending`, `pending-activities`, workflow status utilities | pending/failed/open 상태를 일반 완료 기록보다 먼저 보여주는 우선순위 |
| `langfuse/langfuse` | `/tmp/codex-work-visibility-langfuse`에 shallow sparse clone | `trace-graph-view/buildStepData.ts`, `components/ui/timeline.tsx` | trace/observation을 작은 timeline item으로 정규화하고 clickable detail surface로 연결하는 구조 |

## 적용 결정

- 외부 코드는 복사하지 않았다.
- 새 dependency는 설치하지 않았다.
- 우리 앱은 existing `taskRunRecords`, `openInboxDecisions`, `sessions`, `pipelineReports`, `outputEvents`를 `RuntimeRunTimelineItem`으로 정규화한다.
- raw log와 record JSON은 유지하되, 그 앞에 판단용 timeline summary를 둔다.

## 한계

- 이번 slice는 UI grouping과 action wiring이다. 실제 task-run schema migration이나 persisted timeline store는 별도 slice가 필요하다.
