# 리소스 누수 방지 Traceability

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | UR-2026-06-02-012 |
| 요구사항 | `REQ-WS-057` |
| Spec | `_specs/workspace-platform/2026-06-02-resource-leak-prevention/spec.ko.md` |
| 구현 | `agent-platform/src/agent_platform/evaluation/resource_guard.py`, `agent-platform/src/agent_platform/cli.py`, `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |
| 설정 | `agent-platform/configs/evaluation/resource-guard-template.json`, `agent-platform/configs/agents/resource-guard-agent.json`, `agent-platform/configs/workflows/work-mode-registry.json` |
| 운영 문서 | `_docs/policies/resource-leak-prevention-policy.ko.md`, `_ops/workflows/69-resource-leak-prevention.md`, `_ops/prompts/100-resource-leak-prevention.md` |
| 메모리 | `agent-platform/configs/memory/bootstrap-manifest.json`, `_docs/instructions/persistent-instructions.ko.md` |
| 테스트 | `agent-platform/tests/test_resource_guard.py`, `agent-platform/tests/test_work_evaluator.py` |
| 평가 | `_history/evaluations/2026/2026-06-02-resource-leak-prevention.ko.md` |
