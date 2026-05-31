# 2026-05-31 Plan Record: User Request Summaries

## Initial Instruction Summary

The user asked to save summaries of their varied prompts and requests in files, without needing to preserve the full original text.

## Research

- Ran web search first.
- Confirmed that long-term agent memory benefits from memory type separation, persistent context, and human-readable change records.
- Saved the search record in `_history/web-searches/2026/2026-05-31-user-request-summaries.en.md` and the reusable note in `_research/topics/agent-memory/2026-05-31-user-request-summaries.en.md`.

## Plan

1. Add `_history/user-requests/` as the dedicated user request summary layer.
2. Save the accumulated 2026-05-31 user requests as meaning summaries instead of full originals.
3. Add bilingual README files, templates, and policy docs for the recording rules.
4. Add `user_request_summary_targets` to close-out evaluation and treat omissions as blocking gaps.
5. Add the request summary policy to the memory bootstrap manifest as a warm anchor.
6. Link the change from work summaries, daily history, workflows, coordination board, and evaluation reports.

## Public Decision

Request summaries are different from work summaries. Work summaries describe the result; request summaries preserve what the user wanted and which instructions should persist. They should therefore live in a separate layer.

## Done Criteria

- `_history/user-requests/2026/2026-05-31.ko.md` and `.en.md` exist.
- Policy, templates, and README files exist.
- `work-evaluator-agent` checks `user_request_summary_targets`.
- Tests and evaluation pass.
- The change is committed and pushed.
