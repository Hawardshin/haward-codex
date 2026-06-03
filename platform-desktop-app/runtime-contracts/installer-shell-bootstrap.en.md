# Installed Shell Bootstrap

## Purpose

The shell/runtime launched by the installed app must not infer this repository's rules from memory. It first reads `installer-shell-runtime-contract.json`, then uses that contract to determine required read targets, execution gates, and data accumulation targets before starting work.

## Boot Sequence

1. Read `runtime-contracts/installer-shell-runtime-contract.json`.
2. Use `configs/runtime-data-boundary-registry.json` to resolve app data, log, agent workspace, and support bundle boundaries.
3. Apply workspace and sensitive-file boundaries.
4. Select work mode, view mode, and install mode for the task.
5. If an external CLI is needed, read the CLI adapter registry and degrade missing CLIs as `capability_missing`.
6. Accumulate structured task run, decision, evidence, validation, and evaluation records.
7. Do not treat meaningful work as complete until omission, resource, and work-evaluation gates pass.

## Prohibited

- Do not read or bundle `_private/`, `outputs/`, or `.git/` as default knowledge sources.
- Do not turn an external AI CLI into the platform's primary runtime.
- Do not keep only shell output while omitting task, decision, evidence, validation, and evaluation records.
- Do not claim public readiness without signing, updater, and clean-machine smoke gates.
