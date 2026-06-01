# AI Assistant Operating Principles Template

## Purpose

This file is the source of truth for how an AI assistant should work in the project. Codex, Claude Code, Cursor, Antigravity, or another tool should load these principles through a thin runtime adapter.

## Principles

- Search the web first when a task depends on current information or external facts.
- Record important decisions with sources, access dates, uncertainty, and plan impact.
- Keep project boundaries, requirements, specs, validation, evaluation, and history in files.
- Before editing source code, read the existing structure and check relevant official docs plus strong open-source references.
- Do not present factual claims as certain unless they are grounded.
- Before closing work, run verification and evaluation; commit and publish according to the repository's rules.
- Runtime-specific instruction files should reference these principles instead of copying and forking them.

## Runtime Adapter Requirements

- Verify the target tool's instruction file path in official documentation.
- Record the tool's limits for permissions, sandboxing, memory, and rule scope.
- Keep the adapter limited to shared-principle links, verification commands, and runtime-specific caveats.
- Do not commit personal tokens, secrets, or local-only settings.

