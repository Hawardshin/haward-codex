# Plan: Date-Indexed History And Folder Structure Map

## Evidence

- The official Next.js static export docs explain that the app can be deployed as static HTML/CSS/JS output.
- The official React docs cover rendering and filtering array data with `map()` and `filter()`, plus conditional rendering.
- Diataxis and documentation information architecture research support separating document purpose and navigation paths.

## Implementation Steps

1. Add date extraction and `historyDays` generation to the collector.
2. Read root structure policy, docs registry, and project registry to build `folderStructure`.
3. Extend snapshot types.
4. Replace the History section with a date-indexed timeline and filters.
5. Add a Structure section for root folders, docs categories, project homes, and history roots.
6. Run tests, TypeScript check, static build, and snapshot smoke checks.

## Risks

- History files without dates remain in the document list but are excluded from the date-indexed timeline.
- Snapshot size can grow. The collector caps documents at `1200`, and `historyDays` uses lightweight summaries without HTML bodies.
