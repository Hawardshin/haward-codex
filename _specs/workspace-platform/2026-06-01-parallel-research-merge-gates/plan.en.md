# Plan: Parallel Research Merge Gates

## Mode

- Work mode: `governance`
- Reason: shared operating rules, planner, template, and docs are changing.

## Steps

1. Use web search to check fan-out/fan-in, map/reduce, and job dependency patterns.
2. Add `REQ-WS-024` plus change/review records.
3. Add merge gate model and checks to `parallel_work.py`.
4. Update the template to parallel research lanes plus `research-synthesis`.
5. Update tests and operating docs.
6. Run full verification, evaluation, commit, and push.

## Decisions

- A merge gate is a validation contract on top of the dependency graph, not an execution engine.
- Research can run in parallel, but implementation starts only after synthesis.
