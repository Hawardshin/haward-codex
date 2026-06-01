# Resource Leak Prevention Traceability

| Item | Link |
| --- | --- |
| User request | UR-2026-06-02-012 |
| Requirement | `REQ-WS-057` |
| Spec | `_specs/workspace-platform/2026-06-02-resource-leak-prevention/spec.en.md` |
| Implementation | `agent-platform/src/agent_platform/evaluation/resource_guard.py`, `agent-platform/src/agent_platform/cli.py`, `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |
| Config | `agent-platform/configs/evaluation/resource-guard-template.json`, `agent-platform/configs/agents/resource-guard-agent.json`, `agent-platform/configs/workflows/work-mode-registry.json` |
| Operating docs | `_docs/policies/resource-leak-prevention-policy.en.md`, `_ops/workflows/69-resource-leak-prevention.md`, `_ops/prompts/100-resource-leak-prevention.md` |
| Memory | `agent-platform/configs/memory/bootstrap-manifest.json`, `_docs/instructions/persistent-instructions.en.md` |
| Tests | `agent-platform/tests/test_resource_guard.py`, `agent-platform/tests/test_work_evaluator.py` |
| Evaluation | `_history/evaluations/2026/2026-06-02-resource-leak-prevention.en.md` |
