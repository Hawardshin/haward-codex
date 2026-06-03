# Request Trace: Installer Shell Runtime Contract

## Request

- Request ID: `UR-2026-06-03-030`
- Date: 2026-06-03
- Summary: Refactor the overall project structure around the installer and installed app shell/runtime, so the shell reads repository usage/features/rules, enforces them, and accumulates data.

## Decisions

- The owning project is `platform-desktop-app/`.
- Shared governance folders stay in place; the shell-readable contract is added under `platform-desktop-app/runtime-contracts/`.
- The contract is bundled as a Tauri resource and read through a Rust command.
- Installing an external shell sidecar is out of scope for this slice; the existing Rust/Tauri shell runtime plus optional CLI adapter lanes remain the execution model.

## Outputs

- Requirement: `PDA-REQ-030`
- Spec: `platform-desktop-app/specs/2026-06-03-installer-shell-runtime-contract/`
- Implementation: `platform-desktop-app/runtime-contracts/`, `platform-desktop-app/scripts/check-runtime-contract.mjs`, `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/src-tauri/tauri.conf.json`
- Evaluation: `_history/evaluations/2026/2026-06-03-installer-shell-runtime-contract-evaluation-result.json`

## Validation

- Result: runtime contract check, config contract, Rust check, platform test/check, structure audit, omission/resource/evaluate-work passed
