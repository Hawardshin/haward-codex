# Multi-CLI Orchestration Desktop Plan

## Work Mode

- Selected: `governance`
- Reason: This changes installable product boundaries, CLI execution policy, data accumulation, decision inbox behavior, and resource/CLI pipeline gates.

## Large-Scope Decomposition Summary

- source inventory: `platform-desktop-app/`, `agent-platform/configs/integrations/`, `_requirements/`, `_history/`
- exclusions: dependency installation, interactive PTY/stdin writes, long-running CLI task execution
- representative samples: desktop requirements, user-flow registry, desktop distribution registry, CLI adapter registry, human decision inbox spec, CLI pipeline spec
- slice IDs:
  - `slice-1-contract`: requirements, spec, architecture contract
  - `slice-2-config`: CLI, user-flow, and desktop registry updates
  - `slice-3-supervisor-mvp`: Tauri bounded CLI health-check commands and Desktop tab
  - `slice-4-readiness`: readiness and test reinforcement
  - `slice-5-closeout`: history, omission, resource, grounding, evaluation
- touch paths: only documents and configs in the scope above
- merge gate: JSON/config/readiness/evaluation pass before close-out

## Sequence

1. Check web sources and existing memory anchors.
2. Confirm ownership under `platform-desktop-app/`.
3. Add concrete AI CLIs and interactive contracts to the CLI adapter registry.
4. Add multi-CLI supervisor and orchestration flow to desktop/user-flow registries.
5. Add project-local requirements and architecture/spec documents.
6. Add Tauri backend allowlisted CLI detection and bounded health/version check commands.
7. Add the Workspace Monitor Desktop tab and Tauri/browser fallback bridge.
8. Reinforce readiness script/tests.
9. Run JSON, config contract, readiness, tests, omission/resource/grounding/evaluation checks.

## Risks And Controls

- CLI execution risk: this change runs only stdin-free bounded version probes.
- Permission risk: shell plugin/PTY/stdin write remains disabled until adapter-specific permission gates exist.
- Resource risk: health-check child processes have timeout, max output, and kill paths. Long-running supervisors still need later resource measurements.
- Data risk: raw output is not durable knowledge; promotion requires redaction, provenance, and validation.
