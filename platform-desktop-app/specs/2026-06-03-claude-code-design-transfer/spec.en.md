# Claude Code Public Design Transfer Spec

## Scope

- `platform-desktop-app/configs/claude-code-design-transfer-registry.json`
- `platform-desktop-app/docs/architecture/claude-code-design-transfer.*.md`
- `workspace-monitor` snapshot collector, TypeScript type, and Overview UI
- readiness, test, and build validation

## Requirements

- Use only public official documentation-backed patterns.
- The registry satisfies the self-documenting config contract.
- The Workspace Monitor snapshot includes `claudeCodeDesignTransfer.summary.totalPatterns` and pattern records.
- Overview UI shows `Claude Code Design Transfer`, `Public sources only`, major pattern labels, status, and risk controls.
- Claude Code CLI is described only as an optional guest adapter.

## Non-Scope

- Reproducing non-public Claude Code design or leaked material
- Auto-installing or requiring Claude Code CLI
- Runtime implementation of MCP connectors, hooks, or worktree parallel execution
- Public macOS distribution readiness claims

## Acceptance Criteria

- `check-config-contract` reports the new registry as `self_documenting`.
- `workspace-monitor` collector tests read the design-transfer registry.
- `platform-desktop-app` readiness tests check new registry/doc/UI tokens.
- `workspace-monitor` type check/test/build and `platform-desktop-app` check/test pass.
