# Work Summary Index

This folder is the quick-reading layer for understanding what Codex did without reading the full conversation or every detailed report.

## Locations

- Detailed daily history: `_history/YYYY/YYYY-MM-DD.md`
- Quick summary: `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`
- English companion: `_history/work-summaries/YYYY/YYYY-MM-DD.en.md`
- Plan process records: `_history/plans/YYYY/`
- Close-out evaluations: `_history/evaluations/YYYY/`
- Browser summary: `_history/work-summaries/index.html`

## Rules

- Update the current date's work summary before closing meaningful work.
- Each entry should include the user's intent, actual result, key locations, verification, and evaluation report.
- Keep detailed context in daily history and evaluation reports; keep this layer optimized for scanning.
- For important operating rules or platform capabilities, maintain both Korean and English summaries.
- Before the commit exists, an entry may say "this change-set commit"; the final user response should report the real commit hash and push state.

## How To Read

1. Start with `index.html` or the latest dated summary.
2. Follow "key locations" for the files that matter.
3. Open plan and evaluation files to understand why the work was done that way.
4. Use the linked commit message or `git log` for the exact git history.
