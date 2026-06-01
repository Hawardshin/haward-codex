# Spec: CLI Pipeline Orchestration

## Requirement

- `REQ-WS-058`

## Problem

Even when the platform can use many CLIs through adapters, running several CLIs in one action creates more risk than a single command. If `|`, `;`, or redirects are hidden in a shell string, process boundaries, pipe connections, timeouts, output bounds, cancellation, cleanup, and merge strategy are not inspectable.

## Goals

- Represent multi-CLI execution as a process graph.
- Validate process nodes and pipe edges before execution.
- Keep shell-string pipelines disabled by default and prefer argv-style execution.
- Include safety, resource, provenance, verification, and rollback fields in pipeline input.
- Make the work evaluator catch missing validation targets for CLI pipeline work.

## Non-Goals

- Implementing an actual multi-process runner
- Installing a specific CLI or changing global environment state
- Reimplementing shell behavior
- Implementing desktop permission UI

## Functional Contract

- `check-cli-pipeline <input.json>` reads pipeline input and returns `pipeline_ready` or `rework_required`.
- Pipeline input includes `processes`, `pipes`, `execution_policy`, `safety_controls`, `resource_controls`, `source_provenance`, `plan_evidence`, and `verification`.
- A process includes `adapter_id`, `command`, `args`, `cwd`, `env_keys`, `timeout_seconds`, and `max_output_bytes`.
- A pipe includes `from_process`, `from_stream`, `to_process`, `to_stream`, and `mode`.
- The evaluator reports a gap when `cli_pipeline_occurred=true` but `cli_pipeline_targets` is missing.

## Acceptance Criteria

- The template pipeline returns `pipeline_ready`.
- Duplicate process IDs return `rework_required`.
- Shell metacharacters in `command` become a gap when shell is disabled.
- A pipe referencing an unknown process becomes a gap.
- `work-evaluator-agent` reports missing CLI pipeline targets as a blocking gap.
