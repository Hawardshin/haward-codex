# Spec: CLI Adapter Boundary

## Purpose

Create a shared boundary that lets the installable platform use many CLIs without becoming dependent on any specific one.

## Requirement

- `REQ-WS-053`

## Scope

- Add CLI adapter registry.
- Add CLI adapter policy.
- Strengthen installable desktop product boundary and runtime strategy.
- Add routing workflow/prompt.
- Connect memory bootstrap anchor.
- Connect requirements, history, evaluation, and timing records.

## Out Of Scope

- Implementing an actual CLI runner.
- Installing Codex, Claude, Cursor, GitHub, Vercel, or other specific CLI dependencies.
- Executing real local commands from a desktop shell.

## Success Criteria

- CLI tools are defined as optional attached capabilities, not the platform body.
- Missing CLIs degrade as `capability_missing`, not whole-platform failure.
- Required, bundled, or global CLI promotion requires installation audit and rollback.
- The new registry passes the self-documenting config contract.
