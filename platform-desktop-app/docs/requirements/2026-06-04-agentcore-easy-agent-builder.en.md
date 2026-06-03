# AgentCore Easy Agent Builder Requirements

Date: 2026-06-04
Owning project: `platform-desktop-app/`

## Context

The user asked to use AgentCore technology so agents can be created easily. The previous AgentCore blueprint transfer filled runnable inputs, but users still had to inspect and save Agent Factory fields manually. This change translates AgentCore's create/add/dev/deploy mindset into a Korean-first desktop agent builder flow.

## Requirements

| ID | Requirement | Acceptance Criteria |
| --- | --- | --- |
| REQ-PDA-092 | The Agents screen must expose AgentCore-style blueprints as easy agent creation entry points. | `AgentCore Quick Builder` steps are visible and the user can choose a blueprint first. |
| REQ-PDA-093 | A selected blueprint must lead directly to Agent Factory proposal storage. | The `Create Agent Proposal` button calls the native `create_agent_factory_proposal` command. |
| REQ-PDA-094 | Blueprint-based proposals must include runtime, memory, gateway/tool, evaluation capabilities, and the local-first runtime boundary. | The proposal form includes blueprint capabilities, local task-run store, provider direct run, and optional AgentCore adapter capabilities. |
| REQ-PDA-095 | The app must clarify the difference between browser preview and installed-app behavior. | Preview state explains that native save is unavailable, while the installed app writes the proposal to app data. |
| REQ-PDA-096 | Readiness, tests, and registries must catch regressions that remove the quick builder. | Service readiness and renderer readiness tokens validate `AgentCore Quick Builder`, `createAgentCoreBlueprintProposal`, and `Create Agent Proposal`. |

## Non-Goals

- Do not auto-install AgentCore CLI or AWS credentials.
- Do not make AWS AgentCore deploy a required execution path.
- Do not copy awslabs sample source code into the product.

