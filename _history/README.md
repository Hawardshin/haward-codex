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

Detailed work evaluation reports live under `_history/evaluations/YYYY/`.

Detailed plan process records live under `_history/plans/YYYY/`.

Use `_history/work-summaries/index.html` or the latest `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md` first when you only need to understand what happened.

This folder is not a replacement for git history. It explains why work happened, what changed, where to look next, and what context future sessions need.
