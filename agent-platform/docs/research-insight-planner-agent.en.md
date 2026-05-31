# Research Insight Planner Agent

## Purpose

`research-insight-planner-agent` avoids planning from the model's internal probabilistic guess alone. It gathers evidence through web search, repository search, official docs, papers, code/package references, and other search channels, then turns that evidence into insights and an execution plan.

## Trigger

Run it before:

- plans that require current information
- open-source or tool selection
- agent or platform design decisions
- work that relies on prior repository knowledge
- tasks that require comparing multiple references

## Input

Input template:

```text
agent-platform/configs/planning/research-insight-plan-template.json
```

Required fields:

- objective
- search questions
- search channels
- sources checked
- insights
- plan steps
- validation steps
- knowledge validation status
- risks or unknowns
- capture targets
- plan history targets

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
```

## Rules

- Use web search plus at least one other search channel.
- Do not turn search results directly into a plan; first state how the evidence changes the plan as insights.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Capture reusable findings under `_research/`.
- Include both execution steps and validation steps in the plan.
- Save the planning process under `_history/plans/YYYY/` and record that path in `plan_history_targets`.
- If the plan changes during execution, update the same plan history file with the reason.
