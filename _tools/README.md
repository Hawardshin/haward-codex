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

## Tool Folder Shape

```text
_tools/tool-name/
  README.md
  src/
  tests/
```

Each tool README should document:

- purpose
- inputs
- outputs
- main command
- verification method
