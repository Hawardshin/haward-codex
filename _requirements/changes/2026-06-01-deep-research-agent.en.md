# Requirement Change: Deep Research Agent

## Change ID

- `REQ-CHANGE-2026-06-01-DEEP-RESEARCH-AGENT`

## Background

The user requested a deep research agent that searches in specific situations, gathers material through multiple deep steps, and writes highly detailed reports.

## Change

- Add `REQ-WS-040`.
- Keep `deep-research-agent` separate from `research-insight-planner-agent`.
- Deep research input must record the research question, report goal, audience, depth level, multiple search channels, source types, research iterations, evidence items, contradiction notes, citation audit, report outline, and report targets.
- The agent returns `ready_to_write_report` or `more_research_required`.

## Evidence

- OpenAI, Exa, and LangChain deep research patterns all share planning, multi-source searching, extraction, synthesis, and cited report generation.
- Research on deep research evaluation warns that citations can appear valid while lacking source support, so citation audit and unsupported-claim review are required.

## Impacted Areas

- `agent-platform/src/agent_platform/planning/`
- `agent-platform/configs/research/`
- `agent-platform/configs/planning/`
- `agent-platform/configs/agents/`
- `agent-platform/docs/`
- `_ops/workflows/`
- `_ops/prompts/`
- `_history/`

## Verification

- `complete-deep-research` unit tests
- `complete-deep-research` CLI run
- deep research profile config contract
- memory bootstrap
- workspace health

