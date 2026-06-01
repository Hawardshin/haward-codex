# Web Search Record: Non-Blocking Clarification

## Request Summary

The user pointed out that when a clarification question is unanswered, AI often stops every other task, creating a major AI-era bottleneck.

## Search Date

- 2026-06-02

## Queries

- `human in the loop workflow avoid blocking entire process pending user input async decision gates`
- `workflow management blocked task dependencies continue unaffected tasks pending approval`
- `software project management dependency blocked tasks continue independent work WIP bottleneck`
- `AI agent human in the loop asynchronous clarification continue non-blocking work`

## Sources Checked

| Source | Type | Checked Point | Plan Impact |
| --- | --- | --- | --- |
| Elastic, Human-in-the-loop workflows, https://www.elastic.co/docs/explore-analyze/workflows/authoring-techniques/human-in-the-loop | Official docs | HITL review can be placed at critical decision points with structured findings. | Treat clarification as a decision point, not a global stop. |
| GitHub Docs, Creating issue dependencies, https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies | Official docs | `blocked by` and `blocking` relationships make dependencies and bottlenecks visible. | Model `blocked_decision` as an explicit dependency record. |
| Zapier Help, Special step run statuses in Human in the Loop actions, https://help.zapier.com/hc/en-us/articles/38838306755981-Special-step-run-statuses-in-Human-in-the-Loop-actions | Official docs | Some HITL states allow the rest of the workflow to continue. | Add `unblocked_work` continuation to the policy. |
| Atlassian Jira Service Management, Mark issues as blocked, https://support.atlassian.com/jira-service-management-cloud/docs/mark-issues-as-blocked/ | Official docs | Blocked markers expose work that needs resolution. | Keep blocked items small and visible. |

## Weak Sources Ignored

- General productivity blog posts were useful for intuition but not used as primary evidence.
- HITL explainers without dependency visibility or non-blocking continuation were treated only as background.

## Plan Impact

- A pending answer should be modeled as a dependency on a specific decision point, not as a whole-workflow pause.
- The blocked item must be visible as `blocked_decision`.
- Independent work should continue as `unblocked_work`, with assumptions and `resume_action` recorded so later rework stays small.

## Remaining Uncertainty

- Determining true dependency still needs local judgment by domain and risk.
- The policy permits safe progress, but irreversible or high-risk work must still wait.
