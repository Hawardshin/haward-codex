# Spec: Install Mode Split

## Purpose

Implement `REQ-WS-049` by splitting platform setup into user `user` install and developer `developer` install.

## Requirement

- `REQ-WS-049`

## Behavior

- `install_mode` controls environment setup scope; `work_mode` controls task execution/evaluation strictness.
- `user` install provides the minimum path for using, viewing, running, or deploying the platform.
- `developer` install provides editable/development paths for improving the platform, editing source, changing validation harnesses, or changing shared rules.
- Setup commands are plans until they are actually run.
- If an actual install, upgrade, removal, or global configuration occurs, installation audit records are required.

## Change Targets

- `agent-platform/configs/installations/install-mode-registry.json`
- `agent-platform/src/agent_platform/install_modes.py`
- `agent-platform/src/agent_platform/cli.py`
- `agent-platform/tests/test_install_modes.py`
- `_docs/policies/install-mode-policy.*.md`
- `_ops/workflows/62-select-install-mode.md`
- `_ops/prompts/92-select-install-mode.md`
- `AGENTS.md`, persistent instructions, memory bootstrap
- `_ops/index.md`, `_ops/prompts/00-router.md`, `_ops/installations/README.*.md`
- Requirements, specs, history, and evaluation records

## Acceptance Criteria

- The install mode registry passes self-documenting config contract.
- `check-install-modes` verifies that both `user` and `developer` modes exist.
- `list-install-modes` and `show-install-mode` output JSON.
- Unit tests validate the install mode checker and helpers.
- Memory bootstrap, docs audit, naming audit, structure audit, workspace health, and evaluator pass.
