# Work Evaluator Agent

## Purpose

`work-evaluator-agent` checks completed work against the user's initial instruction before final close-out. If it finds gaps, the result must be reflected into a follow-up task and reworked before the final response.

## Trigger

Run this evaluator after implementation and normal verification, before final commit or final response for meaningful work.

## Inputs

Use `agent-platform/configs/evaluation/work-evaluation-template.json` as the shape:

- `initial_instruction`: the user's starting request or durable instruction
- `result_summary`: what was actually changed or produced
- `changed_files`: files or artifacts changed
- `verification`: commands, checks, or manual review performed
- `known_gaps`: explicit mismatches or unfinished items
- `improvement_ideas`: non-blocking improvements worth considering

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Rework Rule

- `status=ready_to_close`: continue close-out.
- `status=rework_required`: convert each gap into a follow-up action, complete that work, then evaluate again.
- Improvements that are not required can be logged in history or project docs.

## Agent Config

The declarative agent config lives at:

```text
agent-platform/configs/agents/work-evaluator-agent.json
```
