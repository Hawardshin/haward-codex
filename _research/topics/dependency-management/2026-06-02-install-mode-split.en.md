# Research Note: User And Developer Install Split

## Core Conclusion

Platform setup should use `install_mode`, separate from `work_mode`.

- `user`: setup for using or viewing the platform. Prefer regular installs, existing artifacts, and minimal use paths such as Vercel/Next.js builds.
- `developer`: setup for improving the platform. Include editable installs, devDependencies, tests, browser validation, and governance checks.

## Evidence Checked

- pip local project installs: regular install is closer to deployment installs; editable install is suited to development installation.
- Python `pyproject.toml` specification: dependency and optional dependency structure.
- npm docs: lockfile-based `npm ci` and dev dependency omit behavior.
- Vercel Next.js docs: deployment path for Next.js projects.

## Platform Application

- Added `agent-platform/configs/installations/install-mode-registry.json` as the source of truth.
- CLI now provides:
  - `check-install-modes`
  - `list-install-modes`
  - `show-install-mode`
- If an actual install occurs, `_ops/installations/registry.json` and `_history/installations/YYYY/` remain the audit trail.

## Cautions

- Selecting `install_mode` is not the same as running installation.
- A `user` install may still need build tooling when building from source.
- `developer` install is convenient, but dependency changes, lock changes, and global installs still need audit records.
