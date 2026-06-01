# Work Evaluation - Knowledge Skeptic Policy

## Initial Instruction

> For management, the knowledge base will keep growing, and whenever it is referenced there must always be an agent that suspects the content could be wrong.

## Work Summary

- Added `knowledge-skeptic-agent` as a declarative agent.
- Added a Python helper and `validate-knowledge` CLI for validating knowledge-base references before reuse.
- Added a knowledge validation template, unit tests, and agent documentation.
- Added knowledge-base validation policy docs, a prompt, and a workflow.
- Updated persistent instructions, workspace rules, research policy, and research templates with the fallibility rule.
- Regenerated operations maps so the new prompt and workflow are discoverable.

## References Checked First

- `_research/README.ko.md`
- `_docs/policies/research-capture-policy.ko.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/docs/work-evaluator-agent.md`

## Knowledge Base Validation

The internal knowledge-base references above were validated with `knowledge-skeptic-agent`.

- Status: `ready_to_reference`
- Contrary signals: none
- Verification steps: 3
- Skeptic questions: 3
- Conclusion: the references can be used as support for this structural change.

## Verification

- `python3 _tools/workspace-index/src/workspace_index.py --check` passed
- `python3 _tools/task-board/src/task_board.py --check` passed
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 14 tests) passed
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json` passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/knowledge-skeptic-reference-validation.json` passed
- `git diff --check` passed
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/knowledge-skeptic-policy-evaluation.json` returned `ready_to_close` (`changed_files_count`: 32, `verification_count`: 7)

Some Python commands printed Homebrew shellenv's `/bin/ps: Operation not permitted` warning, but tests and CLI results were unaffected.

## Evaluation Result

- Status: `ready_to_close`
- Rework required: no
- Gaps found: none
- Improvement idea: later integrate `validate-knowledge` into a multi-agent runner so it runs automatically when a task declares knowledge-base references.

## Conclusion

The repository now includes an agent and operating rules that treat knowledge-base content as fallible and require skeptical validation before relying on it.
