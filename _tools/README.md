# Tools

This folder contains reusable local tools and scripts shared across projects.

## Tool Criteria

Create a tool when a task needs deterministic, repeatable execution.

Examples:

- repository rule validation
- Markdown to HTML conversion
- artifact generation
- project scaffolding
- test or preview orchestration
- source collection normalization and scoring

## Tool Folder Shape

```text
_tools/tool-name/
  README.md
  src/
  tests/
```

## Current Tools

- `workspace-index/`: generate repository and prompt maps.
- `task-board/`: generate coordination boards.
- `source-collector/`: normalize, score, and report broad web/source research bundles.

Each tool README should document:

- purpose
- inputs
- outputs
- main command
- verification method
