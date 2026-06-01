# Plan: CLI Pipeline Orchestration

## Work Mode

- `governance`
- Reason: this changes platform execution contracts, evaluator behavior, memory anchors, workflows, and prompts.

## Evidence

- Python `subprocess` official docs define standard-library process creation, stdin/stdout/stderr pipes, and timeouts.
- Node.js `child_process` official docs describe spawned process streams and process execution APIs.
- The Bash manual explains pipelines as stdout/stdin connections between commands, so the platform should preserve that meaning as an explicit graph instead of hiding it in shell strings.
- OWASP command injection guidance supports allowlists and careful argument handling for command execution.
- Existing `REQ-WS-053` already requires CLI adapter boundaries. This work adds a graph gate above several adapters.

## Implementation Steps

1. Add `CliPipelineInput`, `PipelineProcess`, `PipelinePipe`, and `check_cli_pipeline`.
2. Add the `check-cli-pipeline` CLI command.
3. Add the pipeline template plus `cli-pipeline-agent` config and docs.
4. Add conditional `cli_pipeline_occurred` and `cli_pipeline_targets` gaps to `work-evaluator-agent`.
5. Add the `cli_pipeline_record` enforcement layer to the work mode registry.
6. Update CLI adapter policy, workflow, prompt, router, index, persistent instructions, and memory bootstrap.
7. Update requirements, history, evaluation, timing, and maps.
8. Run unit tests, config checks, work-mode checks, memory bootstrap, and evaluator.

## Design Choices

- Do not build a real runner yet. First structure and validate execution plans.
- Disable shell by default. Express pipes through the `pipes` array.
- Separate per-process timeout/output bounds from pipeline cleanup/cancellation/backpressure.
- Keep `cli_pipeline_targets` separate from `resource_check_targets`; a pipeline can also have resource risk, but the proof target is different.
