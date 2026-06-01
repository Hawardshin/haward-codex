# CLI Pipeline Orchestration Research Note

- Date: 2026-06-02
- Topic: Modeling multiple CLI processes and pipes as a platform execution contract
- Status: reusable

## Summary

Multi-CLI execution should be represented as a process graph instead of a single command string. This keeps per-process adapters, cwd, environment allowlists, timeouts, output bounds, pipe edges, cancellation, cleanup, and merge strategy inspectable.

## Evidence Sources

- Python subprocess: https://docs.python.org/3/library/subprocess.html
- Node.js child_process: https://nodejs.org/api/child_process.html
- Bash pipelines: https://www.gnu.org/software/bash/manual/html_node/Pipelines.html
- OWASP OS Command Injection Defense: https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html
- Internal policy: `agent-platform/configs/integrations/cli-adapter-registry.json`

## Design Principles

- CLI adapters own individual CLI availability, version, input, output, and fallback behavior.
- CLI pipelines own the graph contract that connects several adapter-backed processes.
- Shell strings are disabled by default; pipes are represented through a `pipes` array.
- Fan-out/fan-in closes through merge strategy and verification.
- A validator and evaluator target should exist before building a runner so required controls are not missed.

## Applied In

- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`

## Limits

This note covers execution-plan validation. Actual runner implementation, OS-specific desktop permissions, Tauri/Rust/Go/Node selection, and process group termination need separate research and prototype measurement.
