# 2026-06-02 Resource Leak Prevention Research Note

## Summary

In a platform-style agent environment, memory leaks are an operational quality risk rather than a single bug class. Long-running processes, browser automation, workers and queues, caches, streams, large-data processing, and external CLI adapters all need checks for cleanup paths and bounded growth.

## Key References

- Python `tracemalloc`: https://docs.python.org/3/library/tracemalloc.html
- Node.js `process.memoryUsage()`: https://nodejs.org/api/process.html#processmemoryusage
- Playwright BrowserContext: https://playwright.dev/docs/api/class-browsercontext
- Next.js memory usage guide: https://nextjs.org/docs/app/guides/memory-usage

## Platform Application

- Python agents/tools: context managers, `try/finally`, streaming/chunking, `tracemalloc` snapshots and peak memory.
- Node/Next monitoring UI: `process.memoryUsage()`, heap profiles, Next.js memory debugging.
- Playwright/browser verification: page/context/browser lifecycle cleanup.
- CLI adapters/workers: subprocess termination, timeouts, cancellation, output-size bounds, and temp-file cleanup.
- Caches/queues: size limits, TTL, backpressure, and stop conditions.

## Decision

`resource-guard-agent` is a conditional gate, not a mandatory loop for every task. When work includes runtime resource risk, record `resource_risk_occurred=true` and `resource_check_targets`.
