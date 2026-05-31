# Work Mode Routing Research Note

## Summary

Forcing the full requirements, specs, and history loop on small or urgent work creates unnecessary operating cost. After comparing external references with the current repository structure, the better approach is to keep the full loop but gate blocking targets by work mode.

## Key References

| Source | Application |
| --- | --- |
| Google Engineering Practices - Small CLs | Smaller changes are easier to review and reason about, supporting `quick` mode. |
| GitHub Docs - GitHub Flow | Small independent changes, commit/push flow, and fast feedback support `quick` and `ship_first`. |
| Atlassian Technical Debt | Future improvement caused by fast choices should be tracked in a backlog, not hidden. |
| Thoughtworks Evolutionary Architecture | The operating structure should be tuned from usage feedback, similar to a fitness-function mindset. |

## Applied Decision

- Keep `standard` as the default so existing safety is preserved.
- Use `governance` for evaluator, memory, source registry, durable rules, and other high-blast-radius work.
- Use `quick` for small docs, typo fixes, and low-risk work where full target gaps are non-blocking improvements.
- Use `ship_first` to implement and verify first, then record deferred improvements in `_ops/backlog/deferred-improvements.en.md`.
- Use `research` when provenance and plan evidence matter more than requirements/spec backfill.

## Next Review

- `DI-2026-05-31-001`: collect real work examples and reassess whether `quick` and `ship_first` are too loose or too strict.
