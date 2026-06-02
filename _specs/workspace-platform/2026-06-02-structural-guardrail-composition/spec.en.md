# Structural Guardrail Composition Spec

## Purpose

Turn the structural guardrail principle into an authorable and checkable artifact. Before material-risk work, a user or agent should be able to write a JSON file describing risk surfaces and execution boundaries, then run a CLI check for omissions.

## Requirement

- `REQ-WS-080`

## Scope

- Add a structural guardrail composition checker module to `agent-platform`.
- Add a `check-guardrail-composition` CLI command.
- Add the self-documenting template `agent-platform/configs/governance/structural-guardrail-composition-template.json`.
- Add unit tests for ready, missing coverage, unknown references, cost gate, and evidence gaps.

## Out Of Scope

- Installing an external policy engine.
- Implementing an OS-level permission sandbox.
- Implementing a linter that rewrites every existing prompt.

## Acceptance Criteria

- The template passes `check-config-contract`.
- The template returns `guardrails_ready` from `check-guardrail-composition`.
- Unit tests pass.
- Requirement, history, and evaluation records are preserved.
