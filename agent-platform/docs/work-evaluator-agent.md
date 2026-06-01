# Work Evaluator Agent

## Purpose

`work-evaluator-agent` checks completed work against the user's initial instruction before final close-out. If it finds gaps, the result must be reflected into a follow-up task and reworked before the final response.

## Trigger

Run this evaluator after implementation and normal verification, before final commit or final response for meaningful work.

The evaluator supports selectable work modes so small or urgent tasks do not need to run the full governance loop every time:

- `quick`: low-risk, reversible work; governance targets become non-blocking improvements.
- `standard`: default; preserves the existing full target set.
- `ship_first`: ship or repair first; requires reference and web-search records, and requires deferred improvement targets when improvement ideas are postponed.
- `research`: research and planning work; requires source provenance, plan evidence, references, and web-search records.
- `governance`: durable repository/platform/rule changes; uses the full target set.

## Inputs

Use `agent-platform/configs/evaluation/work-evaluation-template.json` as the shape:

- `initial_instruction`: the user's starting request or durable instruction
- `result_summary`: what was actually changed or produced
- `work_mode`: one of `quick`, `standard`, `ship_first`, `research`, or `governance`; defaults to `standard`
- `changed_files`: files or artifacts changed
- `verification`: commands, checks, or manual review performed
- `references_checked`: internal prior work, previous examples, official docs, or strong external references checked before evaluation
- `grounding_checks`: hallucination-guard-agent results or grounding checks for factual final outputs
- `source_provenance_targets`: files that record where material values, source data, claims, assumptions, or config inputs came from
- `plan_evidence_targets`: files that record the evidence behind the executed plan
- `web_search_record_targets`: public search reasoning record files under `_history/web-searches/YYYY/`
- `user_request_summary_targets`: user request summary files under `_history/user-requests/YYYY/`
- `requirements_targets`: workspace or project requirements files under `_requirements/` or `project/docs/requirements/`
- `spec_targets`: spec-driven artifacts under `_specs/` or the owning project's `specs/`
- `skill_work_occurred`: whether custom skill source was created, updated, validated, installed, or improved
- `skill_targets`: created or updated skill source paths when skill work occurred
- `skill_validation_targets`: skill validation inputs, reports, or evaluation files when skill work occurred
- `request_trace_targets`: request-to-outcome trace files under `_history/request-traces/YYYY/`
- `work_summary_targets`: user-readable work summary files under `_history/work-summaries/YYYY/`
- `timing_summary_targets`: phase-level work timing records under `_history/work-timings/YYYY/`
- `context_archiving_occurred`: whether the agent compressed long context into a durable resume packet
- `context_archive_targets`: context archive packet files under `_history/context-archives/YYYY/`
- `installation_occurred`: whether the work actually installed, upgraded, removed, or globally configured software
- `installation_record_targets`: installation audit records under `_history/installations/YYYY/`
- `deferred_improvement_targets`: backlog files that hold postponed non-blocking improvements
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
- Missing targets are blocking according to the selected `work_mode`, defined in `agent-platform/configs/workflows/work-mode-registry.json`.
- In `standard` and `governance`, missing reference research, source provenance, plan evidence, web search records, user request summaries, requirements targets, spec targets, request traces, work summaries, and timing summaries are blocking.
- In `quick`, those governance targets are non-blocking improvements unless the user explicitly requested them or another rule makes them mandatory.
- In `ship_first`, missing `references_checked` and `web_search_record_targets` are blocking, and missing `deferred_improvement_targets` is blocking when `improvement_ideas` are present.
- In `research`, missing `references_checked`, `source_provenance_targets`, `plan_evidence_targets`, `web_search_record_targets`, and `timing_summary_targets` are blocking.
- Missing skill targets or skill validation targets are blocking gaps when `skill_work_occurred=true`.
- If `context_archiving_occurred` is true, missing context archive targets are a blocking gap.
- If `installation_occurred` is true, missing installation record targets are a blocking gap.
- If factual final outputs are present, run `hallucination-guard-agent` and record the result in `grounding_checks`.
- Improvements that are not required can be logged in history or project docs.

## Agent Config

The declarative agent config lives at:

```text
agent-platform/configs/agents/work-evaluator-agent.json
```
