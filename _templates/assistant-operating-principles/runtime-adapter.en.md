# Runtime Adapter Template

## Use When

Use this when a new AI coding assistant requires its own instruction file, rule folder, or workflow format.

## Checklist

- Official documentation URL:
- Instruction file path:
- Rule/workflow path:
- Always-loaded behavior:
- Path scope or glob support:
- Memory/compaction reload behavior:
- Command execution permission model:
- Sandbox or project boundary:
- Secret/local file protection:
- Shared principles file for this repository:
- Verification commands:

## Adapter Body

Write the actual adapter body in English. Do not copy the full shared policy; reference it.

```md
# Runtime Adapter

Use the shared operating principles in <shared-principles-path>.
Use the repository rules in <canonical-instructions-path>.
This file is a thin adapter for <runtime-name>; do not fork durable policy here.

Before substantial work:
- run web-first intake
- load durable memory anchors
- select the work mode
- verify project boundaries
- update requirements/specs/history/evaluation when required
- run verification before close-out

Runtime caveats:
- <permission/sandbox/memory limitation>
```

