# Install Mode Policy

## Purpose

This repository separates `work_mode` from `install_mode`.

- `work_mode`: controls planning, verification, history, and evaluation strictness.
- `install_mode`: controls environment setup based on whether the person is using the platform or improving the platform.

## Install Modes

### User Install

User install is for running the platform or viewing artifacts.

- Prefer regular installs, existing HTML artifacts, and minimal paths needed for use such as Vercel/Next.js builds.
- Do not require editable installs, browser validation harnesses, or the full governance test suite by default.
- Do not install developer tooling when the user is not changing the platform.

### Developer Improvement Install

Developer install is for improving the platform itself.

- Use editable installs for Python platform code when useful.
- Include devDependencies, tests, browser validation, and governance checks for projects being changed.
- If dependency or environment state actually changes, create installation audit records.

## Source Of Truth

- Install mode registry: `agent-platform/configs/installations/install-mode-registry.json`
- CLI checks:
  - `PYTHONPATH=src python3 -m agent_platform.cli check-install-modes configs/installations/install-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli list-install-modes configs/installations/install-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli show-install-mode configs/installations/install-mode-registry.json developer`

## Rules

- Selecting an install mode does not mean install commands were executed.
- If an actual install, upgrade, removal, or global configuration occurs, follow `_ops/workflows/58-installation-record.md`.
- User install optimizes for ease of use and minimal dependencies.
- Developer install optimizes for editability, fast iteration, and verification.
- Install mode does not weaken close-out requirements. Evaluation strictness still comes from `work_mode`.
