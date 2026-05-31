# Coding Research Agent

`coding-research-agent` checks whether coding-focused research is complete before it becomes implementation work. It supports API documentation, library selection, bug root cause, architecture, performance, security, migration, testing strategy, open-source evaluation, and implementation-pattern research.

## Purpose

- Start every coding research task with web search.
- Pair web search with at least one other channel: repository search, official docs, code search, package registry, papers, or open-source repositories.
- Answer standard close-out questions before implementation starts.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Save planning history under `_history/plans/YYYY/` and capture reusable knowledge under `_research/`, `_templates/`, or `_tools/` when appropriate.

## Research Types

- `api_docs`: API, SDK, or framework documentation
- `library_selection`: library or framework choice
- `bug_root_cause`: bug investigation
- `architecture`: structure and boundary decisions
- `performance`: performance bottlenecks and improvements
- `security`: security risks and mitigations
- `migration`: version upgrades or technology moves
- `testing`: testing strategy and validation paths
- `open_source`: open-source candidate evaluation
- `implementation_pattern`: implementation patterns and examples

## Post-Research Questions

Research is not complete until every question is answered.

| ID | Question |
| --- | --- |
| `what_was_verified` | What exactly was verified? |
| `best_option` | What is the best option now? |
| `why_this_option` | Why is this option better than the alternatives? |
| `alternatives_rejected` | Which alternatives were rejected, and why? |
| `implementation_impact` | What files, modules, APIs, or workflows will change? |
| `risks_and_unknowns` | What remains risky, unknown, stale, or assumption-dependent? |
| `validation_plan` | How will the implementation be validated? |
| `reusable_knowledge` | What should be captured for future work? |
| `next_action` | What is the next concrete action? |

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

Proceed to implementation only when the status is `ready_to_implement`. If the status is `more_research_required`, resolve the listed `gaps` and run the command again.

## Related Files

- Agent config: `agent-platform/configs/agents/coding-research-agent.json`
- Input template: `agent-platform/configs/planning/coding-research-template.json`
- Python implementation: `agent-platform/src/agent_platform/planning/coding_research.py`
- Operations prompt: `_ops/prompts/86-coding-research.md`
- Operations workflow: `_ops/workflows/56-coding-research.md`
