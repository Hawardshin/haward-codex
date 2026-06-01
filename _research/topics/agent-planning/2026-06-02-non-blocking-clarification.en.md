# Research Note: Non-Blocking Clarification

## Core Conclusion

When an AI agent asks a question and then stops all work because the answer is missing, that is a workflow design problem. A better pattern isolates the question as a decision dependency and continues work that does not depend on it.

## Reusable Rule

- `blocked_decision`: a choice that cannot be safely made without the answer.
- `unblocked_work`: research, drafting, comparison, validation, and documentation that can continue without the answer.
- `assumptions`: defaults or assumptions used while waiting.
- `resume_action`: what to compare and patch after the answer arrives.

## Sources

- Elastic HITL workflows: https://www.elastic.co/docs/explore-analyze/workflows/authoring-techniques/human-in-the-loop
- GitHub issue dependencies: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies
- Zapier HITL statuses: https://help.zapier.com/hc/en-us/articles/38838306755981-Special-step-run-statuses-in-Human-in-the-Loop-actions
- Atlassian blocked issues: https://support.atlassian.com/jira-service-management-cloud/docs/mark-issues-as-blocked/

## Applicability

- AI usage gap coaching
- Spec/source reconciliation
- Pending human decision handling in long-running agent work
- Dependency visibility in parallel work

## Caution

This rule does not mean always proceed. High-risk, irreversible, or preference-critical work should still wait.
