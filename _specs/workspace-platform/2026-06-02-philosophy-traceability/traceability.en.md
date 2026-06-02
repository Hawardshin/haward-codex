# Traceability

| Requirement | Artifact | Verification |
| --- | --- | --- |
| REQ-WS-076 | `agent-platform/configs/governance/philosophy-traceability.json` | `check-philosophy-trace`, `check-config-contract` |
| REQ-WS-076 | `agent-platform/src/agent_platform/governance/philosophy_trace.py` | `test_philosophy_trace.py` |
| REQ-WS-076 | `_docs/governance/philosophy-governance.en.md` | docs audit |
| REQ-WS-076 | `_ops/workflows/78-philosophy-alignment.md`, `_ops/prompts/108-philosophy-alignment.md` | workspace index, prompt map |
| REQ-WS-076 | `_tools/workspace-health/src/workspace_health/checks.py` | workspace-health |
