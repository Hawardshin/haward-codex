# Plan: Overview UX Navigation Improvements

## Work Sequence

1. Use web search to check dashboard, macOS, Fluent, and visibility/status UX guidance.
2. Inspect the existing `MonitorShell` Overview structure and `globals.css` responsive rules.
3. Implement tab badges and an operator strip using existing snapshot data only.
4. Update requirements, spec, trace, and validation records.
5. Run TypeScript, tests, Next build, customer bundle, and Tauri/Rust validation.
6. Confirm rendering tokens through browser or static smoke checks.

## Decisions

- Defer data model changes. This improvement exposes existing snapshot and collaboration board data more clearly.
- Keep the dense `superadmin_developer` operating surface and avoid marketing hero or instructional text blocks.
