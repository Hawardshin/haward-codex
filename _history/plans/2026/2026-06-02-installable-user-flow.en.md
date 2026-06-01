# Installable App User Flow Plan

## Request Summary

The user asked to design the user flow so the installable program becomes easy to use.

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-installable-user-flow.en.md`
- Research note: `_research/topics/desktop-productization/2026-06-02-installable-user-flow.en.md`
- Internal references:
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `agent-platform/configs/access/view-mode-registry.json`
  - `agent-platform/configs/installations/install-mode-registry.json`
  - `agent-platform/configs/workflows/work-mode-registry.json`
  - `agent-platform/configs/integrations/cli-adapter-registry.json`

## Plan

1. Create the installable app user-flow config.
2. Document first-run and use flows in Korean and English.
3. Create a browser-readable HTML flow map.
4. Link the flow to the desktop distribution registry, installable software policy, prompt router, workflows, persistent instructions, and memory bootstrap.
5. Record requirements, specs, traceability, and validation plan.
6. Verify with JSON checks, config contract, docs audit, workspace monitor snapshot, tests/build, and evaluator.

## Decisions

- Do not install desktop dependencies in this change.
- Define first value as dashboard arrival, with optional setup deferred into capability cards.
- Use the decision inbox to reduce full-task blocking when user answers are pending.
