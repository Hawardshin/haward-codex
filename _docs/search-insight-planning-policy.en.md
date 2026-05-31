# Search Insight Planning Policy

## Purpose

Do not create important plans from the model's internal probabilistic guess alone. Gather evidence through web search, repository search, official docs, papers, code/package references, and other search channels, then convert that evidence into insights before creating the execution plan.

## Principles

- Search first when the task depends on current information or external facts.
- Use web search plus at least one other search channel.
- Do not copy search results directly into a plan; turn evidence into decision-relevant insights.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Save reusable external references under `_research/`.
- Include both execution steps and validation steps in the plan.

## Search Channels

- Web search: current information, current docs, external examples
- Repository search: existing policy, history, project docs
- Official documentation search: APIs, libraries, product specs
- Paper or technical reference search: agent design and retrieval/reasoning patterns
- Code/package search: implementation examples, maintenance status, licenses

## Output

Before execution, record:

- objective
- search questions
- search channels used
- sources checked
- insights
- plan steps
- validation steps
- remaining uncertainty
- reusable research capture target

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
```
