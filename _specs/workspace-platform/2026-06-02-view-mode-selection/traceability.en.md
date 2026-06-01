# Traceability: View Mode Selection

| Requirement | Implementation | Validation |
| --- | --- | --- |
| `REQ-WS-061` | `agent-platform/configs/access/view-mode-registry.json` | `check-view-modes` |
| `REQ-WS-061` | `agent-platform/src/agent_platform/view_modes.py`, `agent-platform/src/agent_platform/cli.py` | `python3 -m unittest discover -s tests` |
| `REQ-WS-061` | `_docs/policies/view-mode-policy.en.md`, `_ops/workflows/73-view-mode-selection.md`, `_ops/prompts/103-view-mode-selection.md` | docs audit, config contract, memory bootstrap |
| `REQ-WS-061` | `agent-platform/configs/agents/view-mode-router-agent.json` | `inspect-agent` |
