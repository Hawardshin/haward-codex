# Search Insight Planning Policy

## Purpose

Every new instruction starts with web search. Important plans should not be created from the model's internal probabilistic guess alone. Gather evidence through web search, repository search, official docs, papers, code/package references, and other search channels, then convert that evidence into insights before creating the execution plan.

The philosophical basis lives in [_philosophy/agent-operating-philosophy.en.md](../_philosophy/agent-operating-philosophy.en.md). This document turns that philosophy into an execution policy.

## Principles

- Start every new user instruction with web search.
- For current information or external facts, review source content and record the access date.
- Use web search plus at least one other search channel.
- Do not copy search results directly into a plan; turn evidence into decision-relevant insights.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Save reusable external references under `_research/`.
- Save the planning process under `_history/plans/YYYY/`.
- Include both execution steps and validation steps in the plan.
- For coding research, use `coding-research-agent` after general insight planning to answer implementation close-out questions before coding.

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
- plan history target

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

## Plan History

Save the planning process under:

```text
_history/plans/YYYY/YYYY-MM-DD-<slug>.ko.md
```

If the plan changes during execution, record the reason in the same file's change history.
