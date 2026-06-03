# AgentCore Blueprint Transfer Requirements

Date: 2026-06-04
Owner project: `platform-desktop-app/`

## Context

The user provided `awslabs/agentcore-samples` as a reference. This is treated as a request to translate AgentCore's production-agent sample structure into actual desktop platform capability, not as a passive research note.

## Requirements

| ID | Requirement | Acceptance Criteria |
| --- | --- | --- |
| REQ-PDA-087 | The Agents screen must expose AgentCore-style production blueprints as selectable product UI. | A `Production Agent Blueprints` panel displays runtime, memory, gateway/tool, and evaluation-guarded blueprints. |
| REQ-PDA-088 | Selecting a blueprint must change runnable input, not only show documentation. | The selected blueprint fills Search Agent Work Chat input and Agent Factory proposal input. |
| REQ-PDA-089 | AWS AgentCore must remain an optional deployment adapter. | UI and registries describe AWS/AgentCore CLI as optional deployment readiness, not a required local runtime. |
| REQ-PDA-090 | AgentCore reference transfer must record public source and license boundaries. | Reference registry and web-search record capture AWS docs, the awslabs repo, Apache-2.0 boundary, and no source-copy policy. |
| REQ-PDA-091 | Readiness/tests must catch missing AgentCore blueprint UI and registry contracts. | Platform check and Node tests assert `AgentCoreBlueprintPanel`, `agentcore-blueprint-panel`, and `agentcore-style-production-agent-blueprints` tokens. |

## Out Of Scope

- Do not auto-install AgentCore CLI or configure AWS accounts.
- Do not copy AgentCore sample source code into the product.
- Do not claim AWS public deployment readiness.

