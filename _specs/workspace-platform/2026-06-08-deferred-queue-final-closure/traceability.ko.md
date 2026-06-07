# Traceability: deferred queue final closure

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| clarification 질문 표시 | `collectClarificationQueue`, `ClarificationQueuePanel` | `collector.test.mjs`, `tool-studio.test.mjs` |
| snapshot 계약 | `WorkspaceClarificationQueue`, `stats.clarificationQuestions` | `tsc --noEmit`, collector test |
| MonitorShell 분리 | `UnifiedOpsPanel.tsx`, `OpsEventRail` export | `tool-studio.test.mjs` |
| backlog 정리 | `_ops/backlog/deferred-improvements.*.md`, deferred JSON | omission/evaluation 기록 |
| 외부 release gate 분리 | `blocked_external_gate` 상태 | validation/evaluation 기록 |
