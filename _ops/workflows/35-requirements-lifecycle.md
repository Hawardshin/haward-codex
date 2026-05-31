# Requirements Lifecycle Workflow

## Purpose

사용자 요청에서 요구사항을 정의하고, 계속 검토/변경하면서 구현과 평가의 기준으로 사용한다.

## Sequence

1. Read the latest user request summary under `_history/user-requests/YYYY/`.
2. Read the latest request-to-outcome trace under `_history/request-traces/YYYY/`.
3. Identify requirement candidates from the current request, prior requests, research, and implementation gaps.
4. Decide whether the requirement is shared workspace scope or project-specific scope.
5. For shared requirements, update `_requirements/baselines/`.
6. For project-specific requirements, update `project-name/docs/requirements/`.
7. Record requirement changes under `_requirements/changes/` or the project-specific change record.
8. Review conflicts, duplicates, testability, scope, and downstream impact.
9. Record the review under `_requirements/reviews/` or the project-specific review record.
10. Link requirement IDs from plans, work summaries, request traces, and evaluation reports.
11. Include `requirements_targets` in `work-evaluator-agent` input.

## Rule

Do not implement meaningful work from a request alone when it changes expected behavior, operating rules, project structure, or platform capability. First define or update the relevant requirement, then build against it.
