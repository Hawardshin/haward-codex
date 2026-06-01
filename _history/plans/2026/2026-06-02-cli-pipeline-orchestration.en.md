# Plan Record: CLI Pipeline Orchestration

- Date: 2026-06-02
- Work mode: `governance`
- Related requirement: `REQ-WS-058`

## Mode Selection

Selected `governance` because the request changes durable platform behavior: execution contracts, CLI adapter policy, evaluator close-out targets, memory bootstrap, and workflow/prompt navigation.

## Prior References

- Existing `REQ-WS-053`: the platform remains CLI-neutral and uses external CLIs through adapters.
- Existing `_ops/workflows/66-cli-adapter-integration.md`: defines single-CLI adapter boundaries, installation, permission, and fallback.
- Existing `REQ-WS-057`: subprocess and stream runtime risk needs resource check targets.

## External Evidence

- Python subprocess official docs: processes, pipes, timeouts, argv-style args
- Node child_process official docs: spawned process streams
- Bash pipeline official docs: stdout/stdin connection semantics
- OWASP command injection guidance: allowlists and argument handling

## Execution Plan

1. Add requirement `REQ-WS-058`.
2. Add `check-cli-pipeline` validator and template.
3. Add conditional `cli_pipeline_occurred` and `cli_pipeline_targets` gaps to the evaluator.
4. Add the `cli_pipeline_record` enforcement layer to the work mode registry.
5. Update CLI adapter policy, workflow/prompt, router/index, persistent instructions, and memory bootstrap.
6. Save history/evaluation/timing records, then verify, commit, and push.

## Decision

The actual runner is out of scope for this change. This work first structures and validates process graphs before execution so safety, resource, evidence, and verification gaps are not missed.
