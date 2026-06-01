# Work Evaluation Report: Coding Research Agent

## Initial Instruction

- Create a coding-focused research agent that can handle varied coding investigations and standard questions after research completes.
- Follow the repository rules for web-first work, bilingual documentation, history, evaluation, commit, and push.

## Result Summary

- Added `coding-research-agent` to agent-platform.
- Added a Python `complete-coding-research` readiness checker and CLI command.
- Defined research types for API docs, library selection, bug root cause, architecture, performance, security, migration, testing, open source, and implementation patterns.
- Made nine post-research questions required.
- Added agent config, planning input template, unit tests, Korean/English docs, operations prompt/workflow, report templates, research notes, and plan history.
- Updated persistent instructions, README files, source collection policy, search insight planning policy, operations index, prompt router, and maps.

## References Checked

- Thoughtworks Technology Radar FAQ: https://www.thoughtworks.com/en-us/radar/faq
- ADR GitHub Organization: https://adr.github.io/
- GitHub Docs, Configuring issue templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository
- GitHub Docs, Syntax for issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- Internal source collection policy: `_docs/policies/source-collection-policy.en.md`
- Internal search insight planning policy: `_docs/policies/search-insight-planning-policy.en.md`
- Plan history: `_history/plans/2026/2026-05-31-coding-research-agent.en.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/coding-research-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Knowledge-Base Validation

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/coding-research-knowledge-validation.json`
- Result: `ready_to_reference`
- Gaps: none

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 28 tests passed
- `python3 -m unittest discover -s _tools/source-collector/tests`: 4 tests passed
- `python3 -m unittest discover -s tests` from `_templates/python-agent-project/`: 1 test passed
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /private/tmp/coding-research-agent-input.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`: `coding-research-agent` listed
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated

Some Python commands printed the Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- The initial instruction is covered by the new coding research agent, research types, post-research questions, documentation, history, and evaluation loop.

## Gaps

- None

## Improvements

- If automatic source collection becomes repetitive for coding research, add live source provider adapters to `_tools/source-collector/`.

## Follow-Up Actions

- No blocking follow-up remains.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-coding-research-agent.en.md`
- Created: 2026-05-31
