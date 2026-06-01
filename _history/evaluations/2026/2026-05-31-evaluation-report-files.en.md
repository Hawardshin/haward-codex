# Work Evaluation Report: Evaluation Report Files

## Initial Instruction

- After every completed task, the work evaluation should also be saved as a file.

## Work Summary

- Defined `_history/evaluations/YYYY/` as the location for evaluation reports.
- Added evaluation report file creation to close-out workflows and prompts.
- Updated persistent instructions, README, workspace rules, and history docs with the evaluation file requirement.
- Added report file path and creation tracking to the work evaluation report template.
- Created Korean and English evaluation report files for this task.

## References Checked

- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/prompts/60-close-work.md`
- `_ops/prompts/70-evaluate-work.md`
- `_templates/work-evaluation/report.md`
- `_history/README.md`

## Changed Files

- `AGENTS.md`
- `README.md`
- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/workspace-rules.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/prompts/60-close-work.md`
- `_ops/prompts/70-evaluate-work.md`
- `_templates/work-evaluation/report.md`
- `_history/evaluations/README.ko.md`
- `_history/evaluations/README.en.md`
- `_history/evaluations/2026/2026-05-31-evaluation-report-files.ko.md`
- `_history/evaluations/2026/2026-05-31-evaluation-report-files.en.md`
- `_history/README.md`
- `_history/2026/2026-05-31.md`

## Verification

- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `python3 _tools/workspace-index/src/workspace_index.py`: maps updated
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/evaluation-report-files.json`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## Rework Result

- No rework required.

## Report Files

- Korean: `_history/evaluations/2026/2026-05-31-evaluation-report-files.ko.md`
- English: `_history/evaluations/2026/2026-05-31-evaluation-report-files.en.md`
