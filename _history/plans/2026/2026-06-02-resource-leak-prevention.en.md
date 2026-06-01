# 2026-06-02 Resource Leak Prevention Plan Record

## Work Mode Selection

- Selected: `governance`
- Reason: the request changes durable platform behavior plus evaluator, workflow, prompt, memory bootstrap, and requirements baseline.
- Alternatives:
  - `quick`: not appropriate because this is a durable rule and evaluator change.
  - `standard`: enough for many changes, but governance fits better because memory bootstrap, evaluator, and policy change.

## Research Evidence

- Python `tracemalloc` official documentation
- Node.js `process.memoryUsage()` official documentation
- Playwright BrowserContext official documentation
- Next.js memory usage official documentation

## Plan

1. Add `REQ-WS-057`.
2. Add resource guard and the `check-resources` CLI.
3. Add a conditional resource target gap to the work evaluator.
4. Connect policy, workflow, prompt, router, index, persistent instructions, and memory bootstrap.
5. Run unit tests and config/memory/docs/governance checks.
6. Save omission, resource, grounding, and work evaluation records.

## Plan Evidence

- "Be careful" is easy to forget. The platform needs a structured gate with lifecycle, cleanup, and measurement evidence.
- Profiling every task would be excessive, so the blocking target applies only when `resource_risk_occurred=true`.
