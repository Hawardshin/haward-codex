# Work Evaluation - Skill Lifecycle Governance

## Initial Instruction

Skill creation did not feel explicit enough. Created skills should be continuously validated and improved.

## Result Summary

- Created `_skills/create-validated-skill/` as the source-managed skill and installed it into the active Codex skill path.
- Added the `validate-skill` CLI and unit tests to check skill source, trigger examples, validation steps, forward tests, and improvement ideas.
- Added `skill-lifecycle-agent`, policy, workflow, prompt, and templates.
- Updated `work-evaluator-agent` so missing `skill_targets` and `skill_validation_targets` become blocking gaps for skill work.
- Updated web search records, research notes, requirements, spec artifacts, installation records, request history, and work history.

## References Checked

- OpenAI Evaluation Best Practices: https://platform.openai.com/docs/guides/evals
- OpenAI Agent Evals: https://platform.openai.com/docs/guides/agent-evals
- Anthropic Skill Authoring Best Practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- Claude custom skills docs: https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
- Agent Skills survey: https://arxiv.org/abs/2605.07358
- SkillScope: https://arxiv.org/abs/2605.05868
- Internal baseline: `/Users/shinjoungeun/.codex/skills/.system/skill-creator/SKILL.md`

## Verification

- JSON config validation: passed
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/create-validated-skill`: `Skill is valid!`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-skill /private/tmp/create-validated-skill-validation.json`: `skill_ready`
- Installed copy `quick_validate.py /Users/shinjoungeun/.codex/skills/create-validated-skill`: `Skill is valid!`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 59 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json ../_ops/installations/registry.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/skill-lifecycle-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/skill-lifecycle-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/skill-lifecycle-eval.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination board regenerated

## Evaluation Result

- Status: `ready_to_close`
- Requires rework: false
- Gaps found: none
- Improvement ideas:
  - After several real skill runs, add fixture-based trigger and outcome regression tests.
  - If the skill set grows, add a source-to-installed drift check between `_skills/` and `/Users/shinjoungeun/.codex/skills/`.

## Linked Artifacts

- Skill source: `_skills/create-validated-skill/SKILL.md`
- Skill policy: `_docs/policies/skill-lifecycle-policy.ko.md`
- Skill workflow: `_ops/workflows/37-skill-lifecycle.md`
- Skill agent: `agent-platform/docs/skill-lifecycle-agent.ko.md`
- Skill validator: `agent-platform/src/agent_platform/evaluation/skill_validator.py`
- Installation record: `_history/installations/2026/2026-05-31-create-validated-skill.ko.md`
- Spec: `_specs/workspace-platform/2026-05-31-skill-lifecycle-governance/spec.ko.md`
- Validation record: `_specs/workspace-platform/2026-05-31-skill-lifecycle-governance/validation.ko.md`
