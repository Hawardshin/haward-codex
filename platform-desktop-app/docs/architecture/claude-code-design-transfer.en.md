# Claude Code Public Design Transfer

## Purpose

This document records public Claude Code design patterns that are worth adapting into this platform. Leaked material, private system prompts, internal design documents, and unverifiable screenshots are not accepted as design evidence.

## Adoption Principles

- The platform does not clone Claude Code CLI. The installable app remains the platform-first host runtime, while Claude Code CLI is one optional guest adapter.
- Memory and instructions guide behavior but do not enforce boundaries. File access, tool execution, hooks, connectors, and destructive actions need policy, allowlists, the decision inbox, and validation.
- Patterns such as plan-before-edit, subagent isolation, skills, MCP, and hooks should first transfer into the smallest durable asset: registry, workflow, tool, skill, or task pipe.
- Parallel agents or CLI lanes need worktree isolation, touch-path locks, merge gates, and contradiction resolution before concurrent source edits.

## Implemented Now

- Added `platform-desktop-app/configs/claude-code-design-transfer-registry.json` with public sources, transfer principles, implementation targets, and risk controls.
- Added `claudeCodeDesignTransfer` to the `workspace-monitor` snapshot.
- Added a `Claude Code Design Transfer` panel in Overview so source boundaries and pattern status are visible.

## Next Candidates

- Show Plan Gate status in Desktop task pipes.
- Add permission summaries to CLI adapter and connector cards.
- Design a disabled-by-default hook registry with resource guard and rollback controls.
- Add touch-path conflict warnings before implementing worktree-aware parallel lane launches.

## Validation

- The registry must pass `check-config-contract`.
- Workspace Monitor collector/test/build must generate the `claudeCodeDesignTransfer` snapshot.
- Readiness checks should verify `public_sources_only`, `Permissioned Tool Execution`, `Plan Before Edit`, `Subagent Context Isolation`, and `Skill On-Demand Packaging`.
