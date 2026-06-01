# Request Trace: Install Mode Split

## Request

- ID: `UR-2026-06-02-003`
- Summary: The user asked to separate user installation from developer installation because the platform has use mode and improvement mode.

## Requirement

- `REQ-WS-049`

## Result

- Install mode registry: `agent-platform/configs/installations/install-mode-registry.json`
- CLI implementation: `agent-platform/src/agent_platform/install_modes.py`, `agent-platform/src/agent_platform/cli.py`
- Tests: `agent-platform/tests/test_install_modes.py`
- Policy: `_docs/policies/install-mode-policy.en.md`
- Workflow: `_ops/workflows/62-select-install-mode.md`
- Prompt: `_ops/prompts/92-select-install-mode.md`
- Spec: `_specs/workspace-platform/2026-06-02-install-mode-split/`

## Verification

- Verification results are recorded in `_specs/workspace-platform/2026-06-02-install-mode-split/validation.en.md` and `_history/evaluations/2026/2026-06-02-install-mode-split.en.md`.

## Remaining Improvement Candidate

- Add install-profile smoke test runners after real install examples accumulate.
