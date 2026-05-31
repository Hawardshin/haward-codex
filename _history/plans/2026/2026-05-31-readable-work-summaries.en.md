# Readable Work Summary Plan Record

## Initial Instruction

The user asked Codex to make it easy to understand later, through documents, what Codex did.

## Research First

- Searched for changelog, ADR, and documentation information architecture references.
- Keep a Changelog reinforced that human-readable change records should not be raw git logs.
- ADR references reinforced recording decisions, rationale, and consequences for later understanding.
- Diataxis reinforced separating documentation layers by reader need.

## Local Review

- `_history/README.md` described detailed daily history only.
- `_ops/workflows/30-close-and-index.md` and `_ops/prompts/60-close-work.md` required summaries, but there was no quick-summary folder.
- `work-evaluator-agent` checked evaluation reports and references, but did not require a user-readable work summary target.

## Plan

1. Add `_history/work-summaries/` as the quick-summary layer.
2. Add Korean/English README files, dated summaries, an HTML index, and templates.
3. Update operating docs and persistent instructions to require work summary updates.
4. Add `work_summary_targets` to `work-evaluator-agent` inputs and tests.
5. Add the summary policy as a memory bootstrap anchor.
6. Save research, evaluation, and detailed history records, then verify, commit, and push.

## Decisions

- The summary is a router, not a replacement for detailed history.
- HTML is included for quick dashboard-style review, while Markdown remains the source of truth.
- The evaluator should require summary target paths so future work does not skip the readable summary layer.
