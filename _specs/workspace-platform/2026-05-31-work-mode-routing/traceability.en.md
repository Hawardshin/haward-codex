# Work Mode Routing Traceability

| Requirement | Spec | Implementation/Docs | Verification |
| --- | --- | --- | --- |
| REQ-WS-020 | `spec.en.md` | `agent-platform/configs/workflows/work-mode-registry.json` | `check-config-contract` |
| REQ-WS-020 | `spec.en.md` | `agent-platform/src/agent_platform/evaluation/work_evaluator.py` | `agent-platform/tests/test_work_evaluator.py` |
| REQ-WS-020 | `plan.en.md` | `_ops/workflows/02-select-work-mode.md`, `_ops/prompts/02-select-work-mode.md` | doc review, workspace index |
| REQ-WS-020 | `plan.en.md` | `_ops/backlog/deferred-improvements.en.md` | evaluator `deferred_improvement_targets` |
| REQ-WS-020 | `validation.en.md` | `_docs/persistent-instructions.md`, `AGENTS.md`, `README.md` | memory bootstrap, final evaluation |

## Request Link

- User request: `UR-2026-05-31-045`
- Request-to-outcome trace: `_history/request-traces/2026/2026-05-31.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-work-mode-routing.en.md`
