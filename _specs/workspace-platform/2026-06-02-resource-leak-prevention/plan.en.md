# Resource Leak Prevention Plan

## Work Mode

- Selected: `governance`
- Reason: this changes durable repository rules, evaluator behavior, memory bootstrap, workflows, and prompts.

## Evidence

- Python official `tracemalloc` documentation provides allocation snapshots and current/peak traced memory measurement.
- Node.js official `process.memoryUsage()` documentation provides RSS, heap, external, and ArrayBuffer memory measurement.
- Next.js official memory usage documentation covers build memory debugging, heap profiles, and heap snapshots.
- Playwright official documentation shows the browser context model and why lifecycle cleanup matters.

## Plan

1. Add `REQ-WS-057` to the shared baseline.
2. Add `resource_guard.py` and the `check-resources` CLI.
3. Add conditional `resource_risk_occurred` and `resource_check_targets` gaps to the evaluator.
4. Add the resource guard template, agent config, and paired docs.
5. Connect policy, workflow, prompt, router, index, persistent instructions, and memory bootstrap.
6. Run unit tests and governance checks.
7. Save omission, resource, grounding, and evaluation records, then commit and push.

## Decision

Requiring resource checks for every task would reintroduce unnecessary loop overhead. The gate is therefore conditional: `resource_check_targets` is blocking only when `resource_risk_occurred=true`.
