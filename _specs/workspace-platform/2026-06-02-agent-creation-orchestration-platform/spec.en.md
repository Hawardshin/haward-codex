# Spec: Agent Creation And Orchestration Platform

## Goal

Add a shared registry, validation CLI, workflow, prompt, and docs so the platform can create reusable agents easily and orchestrate many agents safely.

## Requirement

- `REQ-WS-060`

## Scope

- Included:
  - agent orchestration registry
  - validation logic for agent spec, blueprints, patterns, controls, and lifecycle gates
  - CLI command `check-agent-orchestration`
  - `agent-orchestrator-agent` spec
  - workflow, prompt, navigation, memory, requirements, and history links
- Excluded:
  - installing LangGraph, AutoGen, CrewAI, or the OpenAI Agents SDK
  - implementing a runtime multi-agent scheduler
  - building a UI agent graph editor

## Success Criteria

- The registry passes the self-documenting config contract.
- `check-agent-orchestration` catches missing required blueprints, patterns, controls, gates, and validation commands.
- New agent creation and orchestration work is discoverable from `_ops` navigation.
- Memory bootstrap checks the registry anchor.
