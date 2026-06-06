# 추적: EVAL report catalog structure

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-ERCS-001 catalog 분리 | `evaluationReportCatalog.ts` | contract, tests |
| REQ-ERCS-002 model 계산 집중 | `evaluationReportModel.ts` imports catalog | TypeScript check, tests |
| REQ-ERCS-003 panel rendering 경계 | `EvaluationReportPanel.tsx` imports catalog/model separately | tests, Browser smoke |
| REQ-ERCS-004 boundary contract | check script, tool-studio test, readiness test | targeted tests |
| REQ-ERCS-005 자동 build/package | package pipeline | validation |

## 연결 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-eval-report-catalog-structure.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-eval-report-catalog-structure.ko.md`
- 연구 노트: `_research/topics/platform-desktop-app/2026-06-06-eval-report-catalog-structure.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-eval-report-catalog-structure.ko.md`
