# Installation Registry

This folder tracks installations that change the workspace environment, including open-source tools, libraries, runtimes, Codex skills, and plugins.

## Files

- `registry.json`: installation record index and operating rules
- `agent-platform/configs/installations/install-mode-registry.json`: user and developer installation profiles
- `_history/installations/YYYY/`: detailed installation audit records
- `_templates/installation-record/`: templates for new installation records

## Core Rules

- Create a draft installation record before performing the actual install.
- After installing, update the record with the exact command, scope, version/lock status, dependency files changed, verification result, and rollback path.
- Global installs are avoided by default. If one is necessary, record the reason, install location, removal path, and permission approval.
- When closing installation work, set `installation_occurred=true` and include `installation_record_targets` in the `work-evaluator-agent` input.
- Do not report an installation as complete without an installation record.
- Before installation, choose an `install_mode`. Use `user` for using/viewing/deploying the platform and `developer` for improving source code, platform behavior, or validation harnesses.
- `install_mode` controls environment setup. `work_mode` controls close-out strictness. Do not confuse them.

## How To Read

1. Use `registry.json` to find installation entries and detailed record files.
2. Open the detailed record for rationale, exact commands, dependency files, verification, and rollback.
3. Confirm the actual change through the linked commit and project dependency files.
4. To choose an installation path, open `agent-platform/configs/installations/install-mode-registry.json` and select `user` or `developer`.
