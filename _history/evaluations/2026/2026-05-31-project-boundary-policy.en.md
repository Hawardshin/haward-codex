# Work Evaluation - Project Boundary Policy

## Initial Instruction

> After building this powerful shared setup, I will directly create projects, and anything belonging to a project should go only into that project. This applies to everyone and shared tools will exist, but later many interests and topics will become projects, so rules to manage that are also necessary.

## Work Summary

- Added Korean and English project boundary policy docs.
- Added `_ops/projects/` with a project registry and Korean/English indexes.
- Registered `agent-platform/` as the current core platform project.
- Added a project boundary prompt and workflow.
- Linked project ownership checks from create-project, start, locate-context, and close workflows.
- Added scope boundary sections to the general project and Python agent project templates.
- Updated README, AGENTS, persistent instructions, workspace rules, platform operating model, and philosophy docs with project-specific versus shared asset rules.

## References Checked First

- `_history/plans/2026/2026-05-31-project-boundary-policy.ko.md`
- `AGENTS.md`
- `README.md`
- `_docs/workspace-rules.md`
- `_docs/capability-governance.md`
- `_templates/project/README.md`
- `_templates/python-agent-project/README.md`
- `_ops/prompts/20-create-project.md`

This work changed internal project governance, so additional internet research was not needed.

## Knowledge Base Validation

Internal operating docs were validated with `knowledge-skeptic-agent` before use as evidence.

- Status: `ready_to_reference`
- Internal sources checked: 8
- Contrary signals: none

## Verification

- `python3 _tools/workspace-index/src/workspace_index.py --check` passed
- `python3 _tools/task-board/src/task_board.py --check` passed
- `python3 -m json.tool _ops/projects/registry.json` passed
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 19 tests) passed
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/project-boundary-knowledge-validation.json` passed
- `git diff --check` passed
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/project-boundary-evaluation.json` returned `ready_to_close` (`changed_files_count`: 37, `verification_count`: 7)

Some Python commands printed Homebrew shellenv's `/bin/ps: Operation not permitted` warning, but tests and CLI results were unaffected.

## Evaluation Result

- Status: `ready_to_close`
- Rework required: no
- Gaps found: none
- Improvement idea: add a generator/checker for `_ops/projects` indexes if the project registry grows.

## Conclusion

The repository now has explicit rules and a registry for keeping project-specific work inside owning projects while promoting only cross-project assets into shared workspace locations.
