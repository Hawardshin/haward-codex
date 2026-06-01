# Workspace Monitor History/Structure UI Web Search Record

## Search Information

- Date: 2026-06-01
- Related request: `UR-2026-06-01-015`
- Work mode: `standard`
- Purpose: Check evidence for date-indexed history display and static Next.js monitor implementation.

## Queries

- `documentation site changelog history timeline date archive UI best practices`
- `Next.js static site markdown documents timeline search filter best practices`
- `information architecture history archive date-based navigation documentation website`
- `Next.js static exports official docs App Router static export`
- `Next.js App Router data fetching static JSON import official docs`
- `React official docs conditional rendering lists rendering`

## Checked Sources

| Source | Type | What Was Checked | Applied To |
| --- | --- | --- | --- |
| https://nextjs.org/docs/app/guides/static-exports | official docs | `next build` static export and static hosting support | Keep `output: "export"` and extend the snapshot-based UI |
| https://react.dev/learn/rendering-lists | official docs | Rendering array data with `map()` and `filter()` | Date-indexed history lists and folder structure lists |
| https://react.dev/learn/conditional-rendering | official docs | Conditional UI rendering | Empty history results and section-based rendering |
| https://diataxis.fr/ | documentation framework | Separating documentation by purpose and navigation need | Separate History and Structure navigation sections |

## Weak Sources Ignored

- Generic blog posts about Next.js markdown search were not used as primary evidence because this project already has a custom static snapshot collector.
- Reddit discussions can reveal static export caveats, but were not used as authoritative feature evidence.

## Plan Impact

- Extend the build-time snapshot instead of adding a runtime database or API.
- Add `historyDays` to index `_history` documents by date and filter by date/type in the UI.
- Add `folderStructure` by reading `_ops/projects/root-structure-policy.json`, `_docs/registry.json`, and `_ops/projects/registry.json`.

## Uncertainty

- History documents without dates are excluded from the date timeline.
- The snapshot document cap is now `1200`, but public deployment still requires reviewing snapshot scope.

## Public Decision Summary

The history web view keeps the existing Next.js static export and snapshot model. Users can inspect dated work in the History tab and folder boundaries plus history source roots in the Structure tab.
