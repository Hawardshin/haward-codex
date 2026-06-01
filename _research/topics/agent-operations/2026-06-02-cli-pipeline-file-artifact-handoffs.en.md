# CLI Pipeline File/Artifact Handoff Research Note

## Core Insight

Pipes are not enough for every CLI pipeline. Large outputs, intermediate caches, converted artifacts, logs, and reports often become files. Without artifact validation, the platform can accumulate path traversal risk, missing cleanup, stale output, oversized data, and unprovenanced downstream input.

## Applied Rules

- Link pipe edges to artifact records with `artifact_id`.
- Restrict paths to workspace-relative paths.
- Require cleanup policy for temporary artifacts.
- Require retention policy for retained artifacts.
- Require size bounds and validation for required artifacts.
- Require provenance for input artifacts.

## Sources

- Python `tempfile`: https://docs.python.org/3/library/tempfile.html
- Node.js `fs`: https://nodejs.org/api/fs.html
- OWASP Path Traversal: https://owasp.org/www-community/attacks/Path_Traversal
- CWE-22: https://cwe.mitre.org/data/definitions/22
