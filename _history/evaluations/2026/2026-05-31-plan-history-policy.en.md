# Work Evaluation - Plan History Policy

## Initial Instruction

> The process by which an agent creates a plan should also be saved well in history.

## Work Summary

- Added `_history/plans/` as the location for planning process records.
- Added Korean and English plan history templates under `_templates/plan-history/`.
- Added `plan_history_targets` to `research-insight-planner-agent` input.
- Changed `plan-from-research` so a missing plan history target is returned as a gap.
- Updated the planning prompt, planning workflow, close/evaluation workflows, persistent instructions, workspace rules, and platform docs.
- Saved this work's planning process under `_history/plans/2026/2026-05-31-plan-history-policy.ko.md` with an English companion file.

## References Checked First

- `_history/plans/2026/2026-05-31-plan-history-policy.ko.md`
- `AGENTS.md`
- `README.md`
- `_history/README.md`
- `_ops/workflows/55-research-insight-planning.md`
- `agent-platform/src/agent_platform/planning/research_insight_planner.py`
- `agent-platform/tests/test_research_insight_planner.py`

This work changed internal repository operations, so additional internet research was not needed.

## Knowledge Base Validation

Internal operating docs were validated with `knowledge-skeptic-agent` before use as evidence.

- Status: `ready_to_reference`
- Internal sources checked: 6
- Contrary signals: none

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 19 tests) passed
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) passed
- `python3 _tools/workspace-index/src/workspace_index.py --check` passed
- `python3 _tools/task-board/src/task_board.py --check` passed
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json` passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/plan-history-knowledge-validation.json` passed
- `git diff --check` passed
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/plan-history-policy-evaluation.json` returned `ready_to_close` (`changed_files_count`: 32, `verification_count`: 7)

Some Python commands printed Homebrew shellenv's `/bin/ps: Operation not permitted` warning, but tests and CLI results were unaffected.

## Evaluation Result

- Status: `ready_to_close`
- Rework required: no
- Gaps found: none
- Improvement idea: generate an HTML index for `_history/plans/` after multiple plan records accumulate.

## Conclusion

The repository now stores the planning process itself as history and requires plan history targets for search-backed planning readiness.
