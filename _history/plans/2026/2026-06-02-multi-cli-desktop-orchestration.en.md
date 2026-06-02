# Plan: Multi-CLI Desktop Orchestration

## Work Mode Selection

- Selected: `governance`
- Reason: This changes installable desktop product boundaries, CLI adapters, multi-process orchestration, decision inbox behavior, source editor planning, and data accumulation policy.
- Related workflows: web-first intake, memory bootstrap, installable software productization, desktop user flow, CLI adapter integration, CLI pipeline orchestration, omission/resource prevention.

## Large-Scope Decomposer Simulation

- source inventory:
  - `platform-desktop-app/` desktop productization docs/configs/specs/tests
  - `agent-platform/configs/integrations/` CLI adapter and pipeline contracts
  - `_requirements/` shared requirement baseline
  - `_history/` web search, request trace, evaluation
- exclusions:
  - `_private/`, `outputs/`
  - actual CLI execution implementation
  - dependency installation
  - signed installer generation
  - broad workspace-monitor UI implementation
- representative samples:
  - `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.en.md`
  - `platform-desktop-app/configs/user-flow-registry.json`
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `agent-platform/configs/integrations/cli-adapter-registry.json`
  - `_specs/workspace-platform/2026-06-02-human-decision-inbox/spec.en.md`
  - `_specs/workspace-platform/2026-06-02-cli-pipeline-orchestration/spec.en.md`
- slices:
  - `contract`: requirements/spec/architecture
  - `registry`: CLI/user-flow/desktop registry updates
  - `readiness`: readiness script and Node tests
  - `closeout`: history/evaluation/verification
- merge gate: JSON syntax, config contract, readiness check, tests, omission/resource/grounding/evaluation.

## Sequence

1. Use web search to verify current official docs and candidate OSS components.
2. Run memory bootstrap for desktop/CLI/inbox anchors.
3. Keep ownership under `platform-desktop-app/`.
4. Add concrete AI CLIs and interactive contracts to `cli-adapter-registry.json`.
5. Add multi-CLI supervisor and data accumulation flow to desktop/user-flow registries.
6. Add project-local requirements, architecture, and spec package.
7. Align readiness/tests to the new contract.
8. Run close-out verification and evaluation.
