# Work Evaluation Report: Research Capture Policy

## Initial Instruction

- Useful internet research findings and material worth referencing again should be documented and continuously managed.

## Work Summary

- Added `_research/` as the research library for reusable internet research and external references.
- Added Korean and English research capture policy docs.
- Added Korean and English research note templates.
- Added a research capture prompt and workflow.
- Added reusable research capture steps to close-out and evaluation workflows.
- Updated persistent instructions, README, workspace rules, platform operating model, and capability governance with research management rules.

## References Checked

- `_docs/instructions/persistent-instructions.ko.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/prompts/60-close-work.md`
- `_templates/research-note/`

## Changed Files

- `_research/README.ko.md`
- `_research/README.en.md`
- `_research/index.ko.md`
- `_research/index.en.md`
- `_docs/policies/research-capture-policy.ko.md`
- `_docs/policies/research-capture-policy.en.md`
- `_templates/research-note/research-note.ko.md`
- `_templates/research-note/research-note.en.md`
- `_ops/prompts/90-capture-research.md`
- `_ops/workflows/60-capture-research.md`
- `AGENTS.md`
- `README.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/workspace-rules.md`
- `_docs/operating-models/platform-operating-model.md`
- `_docs/governance/capability-governance.md`
- `_tools/workspace-index/src/workspace_index.py`

## Verification

- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/research-capture-policy-evaluation.json`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## Rework Result

- No rework required.

## Report Files

- Korean: `_history/evaluations/2026/2026-05-31-research-capture-policy.ko.md`
- English: `_history/evaluations/2026/2026-05-31-research-capture-policy.en.md`
