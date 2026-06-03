# Local Agent Execution Boundary Requirements

Date: 2026-06-04
Owning project: `platform-desktop-app/`

## Context

The user clarified that the AgentCore-inspired implementation must not run agents in Lambda. Actual agent and Python execution happen locally. Gateway/tool wording must therefore not imply a remote function host; the desktop runtime owns the agent loop and Python process.

## Requirements

| ID | Requirement | Acceptance Criteria |
| --- | --- | --- |
| REQ-PDA-097 | The agent execution host must be the local Python/process runtime. | AgentCore proposals include `local_python_agent_runtime` and `local_process_execution` capabilities. |
| REQ-PDA-098 | Lambda, cloud functions, and remote APIs must be represented as optional tool connectors, not execution hosts. | UI and registries describe remote APIs/cloud functions only as tool connectors. |
| REQ-PDA-099 | Readiness must catch regressions that remove the local execution boundary. | Service readiness validates `local_python_agent_runtime`, `local_process_execution`, and registry local Python execution language. |

## Non-Goals

- Do not make AWS AgentCore deploy the default execution path.
- Do not use Lambda as the agent runtime host.
- Do not ban remote APIs or tool connectors.

