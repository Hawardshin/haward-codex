# Requirements: Core Feature Priority

## Context

The user defined two primary platform capabilities: Agent Core for very easy custom agent and subagent creation, and CLI Orchestration for continuous Claude Code, Codex, Gemini, OpenCode, and similar guest CLI work with deferred decisions that can be answered later.

## Requirements

| ID | Requirement | Acceptance Criteria |
| --- | --- | --- |
| REQ-PDA-094 | The first screen shall foreground Agent Core and CLI Orchestration as the two primary capabilities. | Home and the product feature registry keep only `agent_factory` and `agent_orchestration` as primary features. |
| REQ-PDA-095 | Root tool management shall appear as a separate supporting layer shared by both core capabilities. | Home and settings expose provider accounts, CLI adapters, workspace files, and decision routing as root tool setup. |
| REQ-PDA-096 | Current work volume and blocked decisions shall be visible at a glance. | The Home workload strip shows active tasks, pending decisions, task runs, and ready agents. |
| REQ-PDA-097 | Non-core functions shall be de-emphasized while remaining accessible. | User default navigation is `overview`, `agents`, `desktop`, `source`, `intent`; operator sections move to Operator Center. |
| REQ-PDA-098 | Setup required for the two core capabilities shall be visible and intuitive. | Home and execution settings show provider account, Agent Core, CLI lane, and auto-defer question setup steps. |

## Out Of Scope

- Implementing a new guest CLI adapter
- Making cloud deployment mandatory
- Renaming every historical Agent Factory record

