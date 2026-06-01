# Capability Promotion Workflow

## Purpose

Use this workflow when the platform should automatically discover and promote useful capabilities while doing other work. This is the bounded black-box path: discovery and bookkeeping can be automatic, but the decisions and risks stay auditable.

## Inputs

- User request or observed repeated work
- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `_docs/governance/capability-governance.md`
- `_history/work-timings/`
- `_history/evaluations/`
- `_history/request-traces/`
- `_history/web-searches/`
- `_ops/coordination/status.json`

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when rules, agents, registries, or reusable capability gates change.
4. Collect observation signals from timings, evaluations, traces, web searches, coordination state, backlog, and relevant project docs.
5. Cluster related signals and decide whether this is real repetition, a one-off request, or a deferred idea.
6. Check existing prompts, workflows, templates, tools, skills, agents, and project features before adding anything.
7. Select the smallest suitable capability type:
   - `prompt`
   - `workflow`
   - `template`
   - `tool`
   - `skill`
   - `agent`
   - `project_feature`
8. Classify risk as `low`, `medium`, or `high`.
9. For high-risk work, create a human checkpoint record before execution.
10. For medium/high work, create or update requirements and spec artifacts before implementation.
11. Implement or queue the candidate.
12. Validate using the capability-specific checks in the registry.
13. Save evaluation, timing, request trace, work summary, and capability promotion notes.
14. Commit and push completed meaningful changes.

## Output Contract

- Capability candidate ID
- Observed signals and source records
- Existing assets checked
- Selected capability type and rejected lighter options
- Risk tier and human checkpoint decision
- Validation plan and result
- Rollback or disablement path
- Implementation targets or deferred backlog target
- Evaluation and commit/push trace

## Rule

Do not make self-improvement invisible. A black-box-like user experience is acceptable only when the internal promotion trail remains inspectable.
