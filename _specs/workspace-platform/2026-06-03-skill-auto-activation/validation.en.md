# Validation: Skill Auto-Activation Checks

## Planned Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-skill-activation configs/skills/skill-activation-registry.json`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/create-validated-skill`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/presentation-reference-curator`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-skill ../_history/skill-validations/2026/2026-06-03-create-validated-skill-activation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-skill ../_history/skill-validations/2026/2026-06-03-presentation-reference-curator-activation.json`
- `PYTHONPATH=src python3 -m unittest tests.test_skill_activation tests.test_skill_validator`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-skill-auto-activation-omission-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-03-skill-auto-activation-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-skill-auto-activation-evaluation-input.json`

## Current Result

- The pre-sync activation check failed on missing `presentation-reference-curator` installation and `create-validated-skill` drift.
- After install sync, activation check returned `ready`.
