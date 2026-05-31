# Installation Detail Records

This folder stores dated records for actual installs, upgrades, removals, and global environment changes.

## Path Convention

```text
_history/installations/YYYY/YYYY-MM-DD-<slug>.ko.md
_history/installations/YYYY/YYYY-MM-DD-<slug>.en.md
```

## When To Write

- When installing with `pip`, `uv`, `poetry`, `npm`, `pnpm`, `yarn`, `brew`, `cargo install`, `go install`, or similar tools
- When dependency state changes in `pyproject.toml`, `requirements.txt`, `package.json`, lock files, or equivalent manifests
- When installing Codex skills/plugins/connectors or changing global paths
- When removing or upgrading an installed tool

## Required Content

- Installation rationale and alternatives
- Pre-install research links
- Exact install command
- Installation scope and environment path
- Dependency or lock files changed
- Installed version or lock status
- Security and license review
- Post-install verification
- Rollback method
- Linked evaluation report and commit
