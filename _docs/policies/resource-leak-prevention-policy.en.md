# Resource Leak Prevention Policy

## Purpose

This platform will keep adding long-running agents, parallel work, browser verification, the Next.js monitoring UI, Python tools, and external CLI adapters. Memory leaks and resource leaks are therefore reliability risks, not just performance issues.

## Scope

Treat the following as candidates for `resource_risk_occurred=true`.

- Long-running agents, daemons, servers, watchers, and schedulers
- Browser automation and test fixtures such as Playwright, Chrome, and Browser
- Subprocesses, external CLI adapters, background workers, and queues
- File handles, temporary files, network connections, streams, timers, and subscriptions
- Caches, in-memory indexes, snapshots, and large document/search/image/HTML processing
- Next.js build/dev/server processes, Node workers, Python processes, and Tauri/Electron/Go/Rust sidecars

## Rules

1. Code that opens or starts a resource must have a cleanup path.
2. In Python, prefer context managers, `try/finally`, bounded collections, and streaming or chunking.
3. In Node and Next.js, consider measurement paths such as `process.memoryUsage()`, heap profiles, and Next.js memory debugging.
4. For Playwright and browser work, make page/context/browser lifecycle explicit and verify cleanup on failure paths.
5. Caches, queues, workers, and watchers need size limits, TTL, stop conditions, backpressure, cancellation, or dispose paths.
6. Large inputs should prefer streaming, pagination, chunking, sampling, or on-disk artifacts over full in-memory loads.
7. Work with resource risk must save a resource check JSON under `_history/evaluations/YYYY/` or the owning project history folder and run `check-resources`.
8. Work evaluation input must include `resource_risk_occurred=true` and `resource_check_targets`.
9. Accepted risks must record the owner, reason, observed metric, and revisit trigger in the rationale.

## Evidence

- Python `tracemalloc` supports allocation snapshot comparison and current/peak traced memory measurement.
- Node.js `process.memoryUsage()` is the basic measurement path for RSS, V8 heap, external memory, and ArrayBuffer memory.
- Next.js documents build memory debugging, heap profiles, and heap snapshots.
- Playwright uses isolated browser contexts, so context and browser lifecycle cleanup matters.

## Execution

- Workflow: `_ops/workflows/69-resource-leak-prevention.md`
- Prompt: `_ops/prompts/100-resource-leak-prevention.md`
- Agent docs: `agent-platform/docs/resource-guard-agent.en.md`
- Template: `agent-platform/configs/evaluation/resource-guard-template.json`
- CLI: `PYTHONPATH=src python3 -m agent_platform.cli check-resources <input.json>`
