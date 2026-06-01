# 2026-06-02 Resource Leak Prevention Web Search Record

## Request

- The platform must be careful about memory leaks.

## Queries

- `Python official tracemalloc memory leak debugging documentation`
- `Node.js official process memoryUsage heap memory diagnostics documentation`
- `Playwright official browser context close documentation`
- `Next.js official memory usage guide`

## Checked Sources

| Source | Type | Checked | Plan Impact |
| --- | --- | --- | --- |
| Python `tracemalloc` documentation: https://docs.python.org/3/library/tracemalloc.html | Official docs | Allocation snapshot comparison and current/peak traced memory measurement | Added as a measurement option for Python agent/tool work |
| Node.js `process.memoryUsage()` documentation: https://nodejs.org/api/process.html#processmemoryusage | Official docs | RSS, heapTotal, heapUsed, external, and arrayBuffers process memory values | Added as a heap/RSS measurement option for Node/Next/monitor work |
| Playwright BrowserContext documentation: https://playwright.dev/docs/api/class-browsercontext | Official docs | Browser context lifecycle and close API | Added to lifecycle cleanup checks for browser automation work |
| Next.js memory usage guide: https://nextjs.org/docs/app/guides/memory-usage | Official docs | Build memory debug, heap profiles, and heap snapshots | Added as a measurement option for workspace-monitor/Next.js work |

## Weak Sources Ignored

- General memory leak blog posts were deprioritized in favor of official runtime and framework documentation.
- Stack Overflow or issue threads are useful for a specific leak symptom, but this task was about a shared platform policy and gate.

## Plan Impact

- Memory leak prevention should be structured as lifecycle cleanup and measurement evidence, not as a reminder.
- Python, Node/Next, and Playwright need different observation and cleanup paths, so the resource guard must stay runtime-agnostic.
- Profiling every task would conflict with the work-mode overhead principle, so `resource_check_targets` is required only when `resource_risk_occurred=true`.

## Remaining Uncertainty

- Once real long-running daemons or desktop sidecars exist, OS-specific profiler, leak test, and stress-test thresholds should be specified in the owning project spec.
