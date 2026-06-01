# Plan: Naming Rules And Audit

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-01-naming-conventions-audit.en.md`
- Existing structure requirements: `REQ-WS-026`, `REQ-WS-027`, `REQ-WS-031`
- New requirement: `REQ-WS-035`

## Selected Direction

| Option | Pros | Cons | Decision |
| --- | --- | --- | --- |
| Add docs only | Fast | No deterministic verification | rejected |
| Mass-rename existing files | More immediate consistency | High risk to links, history, and dashboard snapshots | rejected |
| Policy config + docs + audit tool | Clear, verifiable, and preserves current links | More implementation work | selected |

## Steps

1. Check web research and existing rules.
2. Create naming policy and governance docs.
3. Implement naming-audit and tests.
4. Connect workspace-health, memory bootstrap, config contract, and docs registry.
5. Record requirements/spec/history/evaluation.
6. Run full verification, then commit and push.
