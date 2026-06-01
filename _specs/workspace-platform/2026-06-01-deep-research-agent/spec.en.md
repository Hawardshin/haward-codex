# Spec: Deep Research Agent

## Goal

Add `deep-research-agent` so specific situations can trigger deep web/document/source investigation and produce highly detailed reports after multi-step evidence collection.

## Non-Goals

- Do not install or run an external search API crawler in this change.
- Do not remove or replace `research-insight-planner-agent`.
- Do not write a final deep research report on a specific topic. This work creates the agent structure and validation criteria.

## Requirement

- `REQ-WS-040`

## Functional Requirements

- The deep research input model accepts research question, report goal, intended audience, trigger situation, and depth level.
- Require at least three search channels, including web or internet.
- Require at least four non-`other` source types, including authoritative and practical/context sources.
- Require all mandatory deep research stages.
- Require at least two research iterations and enough evidence items.
- Require source quality notes, contradiction notes, synthesis notes, citation audit notes, and unsupported/weak claim notes.
- Require report outline and report targets.
- Internal knowledge-base evidence requires `knowledge_validation_status=ready_to_reference`.
- CLI command: `complete-deep-research <input.json>`.

## Design Decisions

- Language/runtime: Python. Existing `agent-platform` planning/evaluation agents use Python dataclasses and deterministic CLI checks, so this is the maintainable path.
- Alternative: TypeScript/Node would align with Workspace Monitor, but it would create an unnecessary runtime boundary for shared agent logic.
- Architecture options:
  - Extend `research_insight_planner.py`.
  - Add separate `deep_research.py` module and CLI.
- Decision: separate module. The existing planner should stay focused on planning readiness; deep research should focus on long-form report readiness and citation audit.

## Outputs

- `agent-platform/src/agent_platform/planning/deep_research.py`
- `agent-platform/tests/test_deep_research.py`
- `agent-platform/configs/research/deep-research-profile.json`
- `agent-platform/configs/planning/deep-research-template.json`
- `agent-platform/configs/agents/deep-research-agent.json`
- `agent-platform/docs/deep-research-agent.ko.md`
- `_ops/workflows/57-deep-research.md`
- `_ops/prompts/87-deep-research.md`

