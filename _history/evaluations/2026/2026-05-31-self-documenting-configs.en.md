# Work Evaluation Report: Self-Documenting Configs

## Initial Instruction

- "By settings files, I mean the file itself should let me see reference links or structural rules."

## Result Summary

- Added `config-contract-agent`.
- Added the `check-config-contract` CLI and Python checker.
- Added `reader_guide`, `reference_links`, `structure_rules`, and `field_guide` to `agent-platform/configs/memory/bootstrap-manifest.json`, `agent-platform/configs/research/source-registry.json`, and `agent-platform/configs/research/coding-research-profile.json`.
- Added the `news` source type to `source-registry.json` because `coding-research-profile.json` already allowed it.
- Added Korean and English self-documenting config policy docs.
- Updated research notes, plan history, persistent instructions, AGENTS, README, platform docs, operations index, and the memory manifest.

## References Checked

- JSON Schema Annotations: https://json-schema.org/understanding-json-schema/reference/annotations
- Azure App Configuration best practices: https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices
- The Twelve-Factor App Config: https://www.12factor.net/config
- Existing memory manifest: `agent-platform/configs/memory/bootstrap-manifest.json`
- Existing source registry: `agent-platform/configs/research/source-registry.json`
- Existing coding research profile: `agent-platform/configs/research/coding-research-profile.json`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/self-documenting-configs-knowledge.json`
- Result: `ready_to_reference`
- Gaps: none
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/self-documenting-configs-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 38 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/research/source-registry.json configs/research/coding-research-profile.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`: `config-contract-agent` listed
- `python3 -m json.tool` on edited JSON files: valid JSON
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/self-documenting-configs-evaluation.json`: `ready_to_close`

Some Python commands printed the Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: reference links and structural rules now live inside the relevant settings files, and the user can open one file to see how to read it and what its fields mean.

## Gaps

- None

## Improvements

- Later add a formal JSON Schema alongside the Python checker.
- Later apply the same self-documenting contract to agent spec JSON files if they become more user-facing settings.

## Follow-Up Actions

- No blocking follow-up remains.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-self-documenting-configs.en.md`
- Created: 2026-05-31
