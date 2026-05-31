# Work History

이 폴더는 날짜별 작업 히스토리, 한눈에 보는 작업 요약, 계획 기록, 평가 보고서를 관리한다.

## File Convention

Use:

```text
_history/YYYY/YYYY-MM-DD.md
```

Each daily file should record:

- task summary
- important decisions
- files or folders changed
- verification performed
- commit hash, after commit

Quick human-readable summaries live under `_history/work-summaries/YYYY/`.

Context archive resume packets live under `_history/context-archives/YYYY/`.

User request summaries live under `_history/user-requests/YYYY/`.

Shared requirements baselines, changes, and reviews live under `_requirements/`; project-specific requirements live under the owning project's `docs/requirements/`.

Request-to-outcome traces live under `_history/request-traces/YYYY/`.

Detailed installation audit records live under `_history/installations/YYYY/`.

Detailed work evaluation reports live under `_history/evaluations/YYYY/`.

Detailed plan process records live under `_history/plans/YYYY/`.

Use `_history/work-summaries/index.html` or the latest `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md` first when you only need to understand what happened.

Use `_history/context-archives/YYYY/` when a future session needs to resume from compressed context instead of chat history.

Use `_history/user-requests/YYYY/` when you need to understand what the user asked for without reading raw chat.

Use `_requirements/` when you need to understand the active requirements that should guide implementation and evaluation.

Use `_history/request-traces/YYYY/` when you need to understand what the user asked for, what happened, where the evidence is, and which commit closed it.

Use `_history/installations/YYYY/` when the work installed, upgraded, removed, or globally configured software.

This folder is not a replacement for git history. It explains why work happened, what changed, where to look next, and what context future sessions need.
