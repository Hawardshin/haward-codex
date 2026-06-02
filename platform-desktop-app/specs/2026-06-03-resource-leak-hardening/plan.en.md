# Plan: Runtime Resource Leak Hardening

## Work Mode

- `standard`

## Large-Scope Decomposition

| slice | Scope | Representative files | Exclusions |
| --- | --- | --- | --- |
| R1 Rust CLI supervisor | child process, reader thread, session store retention | `platform-desktop-app/src-tauri/src/lib.rs` | `target/`, Cargo dependency source |
| R2 React monitor lifecycle | fetch abort, initial async refresh, polling cleanup | `workspace-monitor/components/SnapshotLoader.tsx`, `workspace-monitor/components/MonitorShell.tsx` | full UI redesign |
| R3 Validation and guard | build/test/check-resources | `_history/evaluations/2026/` | production soak profiling |

## Evidence

- Use the official React effect cleanup guidance for external systems and async work cleanup.
- Use the official Rust `Child` behavior that dropping a child does not wait on it.
- Apply the repository resource guard workflow.

## Execution Order

1. Run web-first intake, memory bootstrap, and resource workflow review.
2. Inventory create/cleanup paths with `rg`.
3. Harden Rust session store and kill/wait paths.
4. Harden React fetch/effect cleanup.
5. Run Rust, Node, Next, customer bundle, and resource guard validation.

## Decision

- Long-running automated soak profiling is out of scope for this slice. Lifecycle cleanup, bounded output, retention, build/test, and resource guard checks are the close-out criteria.
