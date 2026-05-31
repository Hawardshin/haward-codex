# Plan History - Plan History Policy

## Initial Request

> The process by which an agent creates a plan should also be saved well in history.

## Planning Objective

Create a repository-tracked structure and operating rule so an agent's planning process does not remain only in chat or temporary files.

## Search Questions

- Does the repository already have a location for planning process records?
- Can `research-insight-planner-agent` enforce saved plan history?
- How should plan history differ from work logs, evaluation reports, and research notes?

## Search Channels

- repository search
- operations documentation search
- Python implementation and test search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Repository instructions | `AGENTS.md` | Checked operating rules and evaluation/history requirements |
| Workspace README | `README.md` | Checked history, evaluation, and search-backed planning policy |
| History README | `_history/README.md` | Checked existing history structure |
| Search insight workflow | `_ops/workflows/55-research-insight-planning.md` | Found where to add the save step |
| Planner implementation | `agent-platform/src/agent_platform/planning/research_insight_planner.py` | Found where to strengthen `ready_to_plan` |
| Planner tests | `agent-platform/tests/test_research_insight_planner.py` | Found where to lock the missing-target behavior |

## Knowledge Base Validation

- Internal docs were used as evidence, so they were validated with `knowledge-skeptic-agent`.
- Validation input targets: `AGENTS.md`, `README.md`, `_history/README.md`, `_ops/workflows/55-research-insight-planning.md`, `agent-platform/src/agent_platform/planning/research_insight_planner.py`, `agent-platform/tests/test_research_insight_planner.py`
- Result: `ready_to_reference`
- Contrary signals: none

## Derived Insights

- Work logs are result-oriented and evaluation reports are close-out quality-oriented, so planning process records need a distinct location.
- A documentation-only rule is easy to miss. The `plan-from-research` input schema and validation logic should require the target.
- Plans can change during execution, so the same file should keep a change history.

## Plan Steps

1. Add `_history/plans/` README files and a dated plan record.
2. Add Korean and English plan history templates under `_templates/plan-history/`.
3. Add `plan_history_targets` to `ResearchInsightPlanInput`.
4. Make `create_research_insight_plan` return a gap when the plan history target is missing.
5. Update the planning template, agent docs, prompt, workflow, persistent instructions, and workspace rules.
6. Save this work's plan history and evaluation report as files.
7. Run tests, CLI checks, maps, evaluation, then commit and push.

## Rejected Or Deferred Options

- A separate `plan-history-agent` is deferred. Extending `research-insight-planner-agent` is smaller and fits the existing responsibility.
- An HTML dashboard for plan history is deferred until enough plan records accumulate.

## Risks And Uncertainty

- Recording every tiny plan can create noise. Start with important plans and work using `research-insight-planner-agent`.
- If a plan changes during execution but the file is not updated, the recorded history will drift from the actual work.

## Validation Method

- `agent-platform` unit tests
- `plan-from-research` CLI
- `knowledge-skeptic-agent` internal doc validation
- workspace index/task board checks
- work evaluator
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Decided to add a plan history folder and templates | User explicitly requested saving the planning process in history |
| 2026-05-31 | Added `plan_history_targets` to CLI readiness criteria | A documentation-only rule could be missed |
| 2026-05-31 | Extended the existing planner instead of adding a new agent | Saved plan history is a required output of search-backed planning |
| 2026-05-31 | Recorded internal knowledge validation result in this plan file | The repository docs used as planning evidence should remain traceable |
