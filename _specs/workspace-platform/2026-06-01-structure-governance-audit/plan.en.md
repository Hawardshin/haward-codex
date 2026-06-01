# Plan: Structure Governance Audit

## Work Mode

- `governance`

## Evidence

- The request changes durable repository structure and project boundary rules.
- Web research reinforced that monorepos need clear ownership and boundaries, documentation structures should separate sources from generated output, and responsibility boundaries should be visible in code and docs.

## Steps

1. Audit current root folders and project registry.
2. Document structure improvements found.
3. Create a self-documenting JSON policy for root folder classes.
4. Create the deterministic `structure-audit` tool and tests.
5. Update `.gitignore`, project boundary docs, workflow, and memory bootstrap.
6. Extend `workspace-monitor` snapshot coverage to `_docs` and `_philosophy`.
7. Run tool, config, monitor, memory, map, and evaluation checks.
