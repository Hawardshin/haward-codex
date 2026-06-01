# Requirement Change: Agent Creation And Orchestration Platform

## Change ID

- `REQ-CHANGE-2026-06-02-015`

## Summary

The user clarified that the platform should make it easy to create many agents and orchestrate many agents. This was added as shared requirement `REQ-WS-060`.

## Added Requirement

- `REQ-WS-060`: reusable agent creation and multi-agent orchestration are managed through a registry with an agent spec contract, blueprints, creation pipeline, orchestration patterns, controls, lifecycle gates, and validation commands, then checked with `check-agent-orchestration`.

## Rationale

- User request: `UR-2026-06-02-015`
- External references: official LangGraph, Microsoft AutoGen, CrewAI, and OpenAI Agents SDK docs separate agent units, handoffs, state, workflows, tracing, and evaluation in multi-agent systems.
- Internal reference: the platform already had agent specs plus CLI/parallel pipelines, but lacked a distinct source of truth for easy agent creation and multi-agent orchestration.

## Impact

- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/src/agent_platform/orchestration/agent_orchestration.py`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `_ops/workflows/72-agent-creation-orchestration.md`
- `_ops/prompts/102-agent-creation-orchestration.md`

## Verification

- `check-agent-orchestration`
- `list-agents`
- `inspect-agent`
- `python3 -m unittest discover -s tests`
- `check-config-contract`
- `check-memory-bootstrap`
