# Assistant Operating Principles Template

## Purpose

Use this template when copying tool-agnostic AI coding assistant principles into another project or repository.

## Files

- `principles.ko.md`: Korean human-readable principles template
- `principles.en.md`: English instruction template suitable for assistant runtime context
- `runtime-adapter.ko.md`: Korean checklist for creating a tool-specific adapter
- `runtime-adapter.en.md`: English runtime adapter instruction template

## Sequence

1. Copy `principles.en.md` as the target repository's shared principles document.
2. Convert `runtime-adapter.en.md` into the filename and format required by the target tool.
3. Check the target tool's official documentation for instruction loading, rule scope, permissions, sandboxing, and memory behavior.
4. Keep shared principles in one place and make runtime adapters reference them.

