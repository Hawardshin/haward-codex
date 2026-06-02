# Plan Record: Sensitive Boundary And Root Architecture

## Work Mode

- `governance`

## Decomposition

- Security boundary: `_private/sensitive/`, external secret manager, AI default deny, redacted extract first.
- Generated-output boundary: exclude `_private/` from repository maps, Workspace Monitor snapshots, source collectors, public artifacts, and installers.
- Structure boundary: explain root folders through logical layers.

## Execution Plan

1. Check web evidence.
2. Add `REQ-WS-074`.
3. Add sensitive boundary config, policy, and operations guide.
4. Exclude `_private/` from workspace index and monitor collector.
5. Add privacy audit.
6. Add logical layers to root structure policy and index docs.
7. Verify, evaluate, commit, and push.

## Parallelization Decision

Do not parallelize because the work touches shared policies, settings, generated maps, monitor snapshots, and git state.
