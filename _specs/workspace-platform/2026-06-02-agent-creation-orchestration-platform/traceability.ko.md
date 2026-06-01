# Traceability: Agent Creation And Orchestration Platform

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WS-060` | `agent-platform/configs/orchestration/agent-orchestration-registry.json` | `check-agent-orchestration` |
| `REQ-WS-060` | `agent-platform/src/agent_platform/orchestration/agent_orchestration.py` | `python3 -m unittest discover -s tests` |
| `REQ-WS-060` | `agent-platform/src/agent_platform/cli.py` | `check-agent-orchestration` CLI |
| `REQ-WS-060` | `agent-platform/configs/agents/agent-orchestrator-agent.json` | `inspect-agent` |
| `REQ-WS-060` | `_ops/workflows/72-agent-creation-orchestration.md`, `_ops/prompts/102-agent-creation-orchestration.md` | navigation and map update |
| `REQ-WS-060` | `agent-platform/configs/memory/bootstrap-manifest.json` | `check-memory-bootstrap` |
