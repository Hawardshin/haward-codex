# Installer Shell Runtime Contract

## Decision

The core purpose of `platform-desktop-app/` is to build the installer and the installed desktop app shell/runtime. That shell must not interpret this repository as a loose document bundle; it reads the bundled `runtime-contracts/installer-shell-runtime-contract.json` before starting work.

## Structure

- `runtime-contracts/installer-shell-runtime-contract.json`: shell-readable source of truth defining required read targets, enforcement gates, and data accumulation targets.
- `runtime-contracts/installer-shell-bootstrap.en.md`: human-readable shell bootstrap sequence.
- `scripts/check-runtime-contract.mjs`: validates the contract file, Tauri resource mapping, Rust command, required gates, and data accumulation targets.
- `src-tauri/tauri.conf.json`: bundles the runtime contract and bootstrap documents as app resources.
- `src-tauri/src/lib.rs`: exposes `get_installer_shell_runtime_contract` to read the contract from bundled resources or the development repository.

## Execution Principle

The shell/runtime launched by the installed app is the platform-first host. External tools such as Codex CLI, Claude Code CLI, Gemini CLI, and OpenCode are guest adapter lanes; missing CLIs degrade as `capability_missing`. The platform owns task state, decision inbox, evidence, validation, evaluation, and UI authority.

## Data Accumulation

Work results are not kept only as shell output. The platform accumulates user requests, request traces, decision inbox items, task run records, structured evidence, validation/evaluation records, work timing, and support diagnostic bundles. Each record needs provenance plus retention and visibility boundaries.

The user-facing accumulated data overview is not only a raw store scan. `get_accumulated_data_overview` persists a versioned manifest at `app_data/runtime-data/indexes/accumulated-data-overview.v1.json`, and the Desktop UI shows schema version, storage format version, migration status, and index path.

## Distribution Boundary

The contract is bundled as a Tauri resource, but `_private/`, `outputs/`, `.git/`, and the full development source tree are not product payloads. Public readiness still requires signing, updater, clean-machine smoke, privacy review, and dependency review gates.
