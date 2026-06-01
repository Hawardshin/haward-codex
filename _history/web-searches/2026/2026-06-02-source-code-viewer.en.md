# Source Code Viewer Web Search Record

## Request

The user asked to make source code viewable in the installable/monitoring program.

## Search Date

- 2026-06-02

## Queries

- `Next.js official documentation static files read local file system build time Node fs`
- `React official documentation rendering lists and conditional rendering code blocks`
- `Shiki official documentation syntax highlighting code blocks`
- `Monaco Editor official documentation browser code editor read only`

## Checked Sources

| Source | Type | What Was Checked | Impact |
| --- | --- | --- | --- |
| Node.js File system docs | Official docs | A build-time collector can use `fs` APIs to read files and file stats. | Implemented `collectSourceFiles` in the Node script |
| Next.js Static Exports docs | Official docs | A static export UI works well with build-time/generated data. | Added `sourceFiles` to the generated snapshot |
| Shiki install docs | Official docs | Checked as a syntax highlighting dependency candidate. | Deferred; no dependency added now |
| Monaco Editor docs | Official docs | Checked as a browser code editor/viewer candidate. | Deferred because the request is viewing, not editing |

## Plan Impact

- Implement a dependency-free read-only `<pre><code>` viewer first.
- Limit source roots to `src`, `tests`, `app`, `components`, `lib`, `scripts`, and `_tools/*/src|tests|scripts`.
- Exclude generated snapshots, build output, dependency folders, and large files.
- Expose the `source` section only in developer and superadmin development views.
- Require `sourceFiles` snapshot review before public deployment.

## Uncertainty

- Advanced syntax highlighting, symbol navigation, search index, and diff viewing were not implemented.
- A real desktop shell should separately design file opening/editing and OS permission behavior.
