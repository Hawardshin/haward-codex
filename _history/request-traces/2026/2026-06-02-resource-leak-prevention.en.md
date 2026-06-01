# 2026-06-02 Resource Leak Prevention Request Trace

## Request

- The user said the platform must be careful about memory leaks.

## Interpretation

- Because the platform keeps adding long-running agents, browser automation, workers, caches, streams, and external CLI adapters, memory and resource leaks should be managed as durable operational risks.
- This should be a conditional close-out gate, not only a reminder.

## Result

- Added `REQ-WS-057`.
- Added `resource-guard-agent` and the `check-resources` CLI.
- Updated `work-evaluator-agent` to block when `resource_risk_occurred=true` but `resource_check_targets` is missing.
- Connected the rule from policy, workflow, prompt, router, index, persistent instructions, and memory bootstrap.

## Key Artifacts

- `agent-platform/src/agent_platform/evaluation/resource_guard.py`
- `agent-platform/configs/evaluation/resource-guard-template.json`
- `agent-platform/configs/agents/resource-guard-agent.json`
- `agent-platform/docs/resource-guard-agent.en.md`
- `_docs/policies/resource-leak-prevention-policy.en.md`
- `_ops/workflows/69-resource-leak-prevention.md`
- `_ops/prompts/100-resource-leak-prevention.md`
- `_specs/workspace-platform/2026-06-02-resource-leak-prevention/`

## Evaluation and Verification

- Resource check: `_history/evaluations/2026/2026-06-02-resource-leak-prevention-resource-check.json`
- Omission check: `_history/evaluations/2026/2026-06-02-resource-leak-prevention-omission-check.json`
- Work evaluation: `_history/evaluations/2026/2026-06-02-resource-leak-prevention.en.md`

## Commit

- Update after commit.
