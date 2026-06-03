# Traceability: Manager Tool Orchestration Planner

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WS-060` | `agent-platform/src/agent_platform/orchestration/manager_tool.py` | `test_manager_tool_orchestration.py`, `plan-agent-orchestration` |
| `REQ-WS-060` | `agent-platform/src/agent_platform/cli.py` | `plan-agent-orchestration` CLI |
| `REQ-WS-060` | `agent-platform/configs/orchestration/manager-tool-plan-template.json` | `check-config-contract`, `plan-agent-orchestration` |
| `REQ-WS-060` | `agent-platform/configs/orchestration/agent-orchestration-registry.json` | `check-agent-orchestration` |
| `REQ-WS-060` | `agent-platform/configs/agents/agent-orchestrator-agent.json` | `inspect-agent` |
| `REQ-WS-060` | `agent-platform/docs/agent-orchestration-platform.ko.md`, `agent-platform/docs/agent-orchestration-platform.en.md` | documentation review |
| `REQ-CHANGE-2026-06-04-001` | `_requirements/baselines/2026-05-31-workspace-platform.ko.md` | requirements review |
