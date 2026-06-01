# Install Mode Split Requirement Change

## Change Overview

- Date: 2026-06-02
- Source request: `UR-2026-06-02-003`
- Added requirement: `REQ-WS-049`
- Work mode: `governance`

## User Request Summary

The user stated that the platform has a use mode and an improvement mode, so it needs separate installation paths for users and developers improving the platform.

## Change

`REQ-WS-049` separates installation purpose into `install_mode`.

- `user`: minimal setup path for using, viewing, running, or deploying the platform.
- `developer`: development setup path for improving the platform, editing source, changing validation harnesses, or changing shared rules.
- `install_mode` controls environment setup; `work_mode` controls task planning/evaluation strictness.
- If install commands are actually run and dependency or environment state changes, existing installation audit rules apply.

## Evidence

- pip official docs separate regular local installs from editable installs, with editable installs suited to development.
- The Python Packaging User Guide `pyproject.toml` specification defines project dependencies and optional dependencies.
- npm official docs explain `npm ci` and dev dependency omit behavior.
- Vercel Next.js docs describe the official Vercel deployment path for Next.js projects.

## Impact

- Add `agent-platform/configs/installations/install-mode-registry.json`.
- Add `check-install-modes`, `list-install-modes`, and `show-install-mode` to the `agent-platform` CLI.
- Update install mode policy, workflow, prompt, README, persistent instructions, memory bootstrap, router, and index.
