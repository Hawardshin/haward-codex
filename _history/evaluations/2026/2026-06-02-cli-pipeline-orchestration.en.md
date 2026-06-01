# Work Evaluation: CLI Pipeline Orchestration

- Date: 2026-06-02
- Work mode: `governance`
- Evaluation result: `ready_to_close`
- Requirement: `REQ-WS-058`

## Initial Instruction

The user asked for a structure where one CLI action can run several internal processes and connect multiple CLIs through pipes or similar mechanisms.

## Result

- Added `cli-pipeline-agent` and the `check-cli-pipeline` CLI command.
- Modeled multi-CLI orchestration as a process graph with process nodes and pipe edges instead of a shell string.
- Added `cli-pipeline-template.json` with execution policy, safety controls, resource controls, merge strategy, source provenance, plan evidence, verification, and rollback.
- Added a conditional `work-evaluator-agent` gate: when `cli_pipeline_occurred=true`, missing `cli_pipeline_targets` is a close-out gap.
- Updated workflow, prompt, router, index, persistent instructions, and memory bootstrap.

## Verification

- `python3 -m unittest discover -s tests`: 138 tests OK
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`: `pipeline_ready`
- `check-work-modes configs/workflows/work-mode-registry.json`: `ready`
- Core `check-config-contract`: `self_documenting`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-omissions`: `coverage_ready`
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## References Checked

- Python subprocess official docs
- Node.js child_process official docs
- Bash pipeline official docs
- OWASP OS Command Injection Defense Cheat Sheet
- Existing `cli-adapter-registry.json`, `REQ-WS-053`, and the resource leak gate

## Remaining Improvement

The actual multi-process runner was intentionally out of scope. A future implementation should use a separate spec for runtime selection, prototype measurement, OS permission behavior, and process group cleanup verification.
