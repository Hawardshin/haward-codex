# CLI Pipeline File/Artifact Handoff Web Search Record

## Search Time

- Date: 2026-06-02
- Work mode: `governance`

## Queries

- `Python tempfile official documentation NamedTemporaryFile TemporaryDirectory cleanup`
- `Node.js fs official documentation streams file system`
- `OWASP Path Traversal file path validation guide`
- `CWE-22 Improper Limitation of a Pathname to a Restricted Directory path traversal`

## Checked Sources

- Python `tempfile`: https://docs.python.org/3/library/tempfile.html
- Node.js `fs`: https://nodejs.org/api/fs.html
- OWASP Path Traversal: https://owasp.org/www-community/attacks/Path_Traversal
- CWE-22: https://cwe.mitre.org/data/definitions/22

## Weak Sources Ignored

- Generic blogs, SEO-oriented security pages, old mirrored PDFs, and Reddit Q&A were not used as primary evidence for this requirement.

## Plan Impact

- Temporary artifacts require cleanup policy.
- File stream/write handoffs require size bounds and validation.
- Artifact paths are limited to workspace-relative paths and reject absolute paths, drive prefixes, backslashes, `~`, and `..`.
- `mode=file` or `mode=artifact` pipe edges must explicitly reference `artifact_id`.

## Uncertainty

- No actual runner exists yet, so file open/close, deletion, and stream backpressure measurement are out of scope for this change. A future runner must add real lifecycle and measurement checks through `resource-guard-agent`.

## Public Decision Summary

File handoff is not just a path string. It should be part of the process graph as an artifact record with path boundary, size, producer/consumer, cleanup/retention, provenance, and validation so a future installable platform or local daemon can enforce the same rule.
