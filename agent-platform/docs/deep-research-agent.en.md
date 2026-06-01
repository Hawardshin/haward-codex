# Deep Research Agent

`deep-research-agent` is not a simple search summarizer. It validates whether a multi-step research package is ready for writing a detailed long-form report.

## When To Use

- The user asks for deep research, a highly detailed report, a market/technology/literature landscape, or evidence-backed conclusions from many sources.
- A single search result is insufficient and official sources, papers, open-source references, analysis articles, community signals, and contrary examples should be considered together.
- The result should become a durable report under `_research/` or a project `docs/` folder.

## Core Steps

1. Define research scope and report goal.
2. Decompose the question into sub-questions.
3. Choose source lanes and search channels.
4. Run at least two research iterations.
5. Separate source quality and evidence roles.
6. Extract claim-to-source evidence items.
7. Record contradictions, contrary evidence, and uncertainty.
8. Build the report outline.
9. Run citation audit and unsupported/weak claim checks.
10. Run grounding before final publication.

## CLI

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json
```

Success status is `ready_to_write_report`. Gaps return `more_research_required`.

## Key Files

- Profile: `agent-platform/configs/research/deep-research-profile.json`
- Input template: `agent-platform/configs/planning/deep-research-template.json`
- Implementation: `agent-platform/src/agent_platform/planning/deep_research.py`
- Tests: `agent-platform/tests/test_deep_research.py`
- Workflow: `_ops/workflows/57-deep-research.md`
- Prompt: `_ops/prompts/87-deep-research.md`

## Difference From Existing Agents

- `research-insight-planner-agent`: checks whether search-backed evidence is ready for planning.
- `coding-research-agent`: checks whether coding research is ready for implementation.
- `deep-research-agent`: checks whether deep research evidence and citation audit are ready for long-form report writing.

## Caution

This version is a readiness checker, not a real search API crawler. Run research across web, docs, open-source repositories, papers, and internal sources; record the package in the template; then validate it with this agent.

