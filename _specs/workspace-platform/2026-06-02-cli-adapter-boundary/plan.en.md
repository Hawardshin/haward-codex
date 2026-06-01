# Plan: CLI Adapter Boundary

## Work Mode

- `governance`

## Evidence

- Python and Node official docs show that external command execution requires careful boundaries for shell use, argument handling, timeouts, and stdout/stderr handling.
- Tauri command scope docs show that desktop apps need explicit permission scopes when invoking local commands.
- Ports-and-adapters and attached-resource framing support treating external CLIs as replaceable capabilities instead of platform internals.

## Sequence

1. Add `REQ-WS-053` to the requirements baseline.
2. Create `cli-adapter-registry.json`.
3. Create CLI adapter policy, workflow, and prompt.
4. Update platform identity, installable product policy, and desktop product boundary.
5. Update memory bootstrap, router, index, and README.
6. Record history, evaluation, and timing.
7. Verify, commit, and push.
