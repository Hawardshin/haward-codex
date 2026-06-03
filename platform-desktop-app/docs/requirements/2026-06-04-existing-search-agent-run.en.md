# Existing Search Agent Run Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-066 | The desktop app shall let users run the existing `research-insight-planner-agent` without finding config files or typing shell commands manually. | must | Agents screen `SearchAgentQuickRunPanel`, command palette |
| REQ-PDA-067 | The run form shall structure objective, search questions, search channels, capture targets, and notes into an initial input compatible with `research-insight-plan-template`. | must | `renderSearchAgentPrompt` |
| REQ-PDA-068 | Runs shall start in a platform-owned bottom terminal lane, with output and questions accumulated in the task-run store and decision inbox. | must | `start_cli_adapter_session`, `taskKind=research_insight_agent` |
| REQ-PDA-069 | Existing search-agent execution shall appear before new-agent creation so users can run what already exists before creating another agent. | should | Agents screen order, readiness token |
| REQ-PDA-070 | Search-agent execution shall also be reachable from desktop quick start and the command palette. | should | Desktop quick start, `run-search-agent` command item |

## Decision

- Reuse the existing guest adapter session path instead of adding a separate runtime.
- Add `taskKind=research_insight_agent` and `research_insight_agent_pipe` so accumulated run records are easy to identify.
- Preserve `capability_missing` behavior for optional CLI adapters.
