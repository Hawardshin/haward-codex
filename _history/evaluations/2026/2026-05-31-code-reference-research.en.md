# Work Evaluation Report: Code Reference Research

## Initial Instruction

- "When building a source-code-writing agent, it should obviously research and reference open-source structure and well-written code."

## Result Summary

- Added `code_reference_sources` and `code_reference_notes` to `coding-research-agent`.
- Strengthened `complete-coding-research` to require code/repository/source channels and concrete code reference records.
- Added the `reference_implementation` source type.
- Updated the coding research template, source registry, research profile, docs, prompt, workflow, report template, and source collection policy.
- Added durable rules to persistent instructions, AGENTS, README, and the platform operating model.
- Added Korean and English research notes and plan history for code reference research.

## References Checked

- Public Code Repository Best Practices: https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/
- CodeHow, Microsoft Research: https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/
- AWS ADR best practices: https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/
- Architecture Decision Record examples: https://github.com/architecture-decision-record/architecture-decision-record
- Existing implementation: `agent-platform/src/agent_platform/planning/coding_research.py`
- Existing config: `agent-platform/configs/research/coding-research-profile.json`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/code-reference-research-knowledge.json`
- Result: `ready_to_reference`
- Gaps: none
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/code-reference-research-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 40 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`, `code_reference_sources_count=2`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/source-registry.json configs/research/coding-research-profile.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 -m json.tool` on edited JSON files: valid JSON
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/code-reference-research-evaluation.json`: `ready_to_close`

Some Python commands printed the Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: before source-code implementation, agents must inspect relevant open-source structure, reference implementations, real source code, and tests, then record the sources and lessons learned.

## Gaps

- None

## Improvements

- Later add a code-reference collector that scores repository structure, license, maintenance, tests, and examples.
- Later add optional GitHub API integration for repository quality metadata when network access is approved.

## Follow-Up Actions

- No blocking follow-up remains.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-code-reference-research.en.md`
- Created: 2026-05-31
