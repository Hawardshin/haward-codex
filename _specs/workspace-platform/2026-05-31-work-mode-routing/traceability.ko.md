# 작업 모드 라우팅 추적성

| 요구사항 | 스펙 | 구현/문서 | 검증 |
| --- | --- | --- | --- |
| REQ-WS-020 | `spec.ko.md` | `agent-platform/configs/workflows/work-mode-registry.json` | `check-config-contract` |
| REQ-WS-020 | `spec.ko.md` | `agent-platform/src/agent_platform/evaluation/work_evaluator.py` | `agent-platform/tests/test_work_evaluator.py` |
| REQ-WS-020 | `plan.ko.md` | `_ops/workflows/02-select-work-mode.md`, `_ops/prompts/02-select-work-mode.md` | 문서 검토, workspace index |
| REQ-WS-020 | `plan.ko.md` | `_ops/backlog/deferred-improvements.ko.md` | evaluator `deferred_improvement_targets` |
| REQ-WS-020 | `validation.ko.md` | `_docs/persistent-instructions.md`, `AGENTS.md`, `README.md` | memory bootstrap, final evaluation |

## 요청 연결

- 사용자 요청: `UR-2026-05-31-045`
- 요청-결과 추적: `_history/request-traces/2026/2026-05-31.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-work-mode-routing.ko.md`
