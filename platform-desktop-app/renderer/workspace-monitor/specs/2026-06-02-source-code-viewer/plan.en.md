# Implementation Plan

## Steps

1. Use web search to check build-time file reading, static export, and code viewer options.
2. Compare a dependency-free plain source viewer against Monaco/Shiki candidates.
3. Add a safe source-root-based `sourceFiles` catalog to `collect-workspace.mjs`.
4. Add `WorkspaceSourceFile` to snapshot types.
5. Add Source tab filters and read-only code viewer to `MonitorShell`.
6. Allow the `source` section only in developer and superadmin view modes.
7. Update README, requirements, and installable app user-flow docs.
8. Verify with tests, typecheck, build, workspace health, and evaluator.

## Option Comparison

| Option | Strengths | Weaknesses | Decision |
| --- | --- | --- | --- |
| Plain `<pre><code>` viewer | No dependency, static-export friendly, quick to implement, smaller security surface | No advanced highlighting | Selected now |
| Shiki | Good static highlighting quality | Adds dependency and build cost | Future candidate |
| Monaco Editor | Strong code browsing/editing UX | Heavy, requires editing/security/bundle decisions | Out of scope |

## Source Collection Criteria

- Include: root project `src`, `tests`, `app`, `components`, `lib`, `scripts`; `_tools/*/src`, `_tools/*/tests`, `_tools/*/scripts`
- Exclude: `.git`, `.next`, `node_modules`, `out`, `src/generated`, `public`, lock/build cache, and large files
