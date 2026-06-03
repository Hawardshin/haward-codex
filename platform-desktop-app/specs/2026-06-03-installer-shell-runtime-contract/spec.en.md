# Spec: Installer Shell Runtime Contract

## Purpose

Refactor the overall `platform-desktop-app/` structure around the installer and installed app shell/runtime. The shell launched by the installed app must not infer features, usage, and policy from scattered documents; it reads a bundled runtime contract that enforces execution gates and data accumulation.

## Scope

- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/runtime-contracts/installer-shell-bootstrap.*.md`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- Tauri bundle resource mapping
- Tauri command `get_installer_shell_runtime_contract`
- README, architecture docs, requirements, readiness/test

## Requirements

- The runtime contract must be a self-documenting config.
- The runtime contract must include required read targets, denied read targets, shell boot sequence, enforcement gates, and data accumulation targets.
- The Tauri bundle must include the runtime contract and bootstrap docs as resources.
- The Rust backend must provide a command that reads the contract from bundled resources or development repository source.
- The default `platform-desktop-app check` chain must run the runtime contract validator first.
- Data accumulation targets must include user request, request trace, decision inbox, task run, source provenance, evaluation, work timing, and support diagnostic records.

## Non-Goals

- Installing an external shell sidecar.
- Adding plugin-shell capabilities.
- Implementing public release signing/updater.
- Moving shared governance folders into `platform-desktop-app/`.

## Acceptance Criteria

- `check-runtime-contract.mjs` returns `installer_shell_runtime_contract_ready`.
- `check-config-contract` reports the runtime contract as `self_documenting`.
- `platform-desktop-app` test/check and Rust check pass.
- Omission/resource/work evaluation passes without close-out gaps.
