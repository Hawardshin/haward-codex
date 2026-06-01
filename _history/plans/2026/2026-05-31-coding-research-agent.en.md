# Plan History: Coding Research Agent

## Initial Request

- Create a coding research agent that can handle varied coding research and standard questions after research is complete.

## Plan Objective

- Add a Python-first agent that checks whether coding research is complete before implementation.
- Structure the standard questions that should be answered at the end of research.
- Connect the agent to operations prompts, workflows, templates, research notes, and evaluation reports.

## Search Questions

- What structure turns coding and technical research into implementation-ready decisions?
- How should technology choices and architecture decisions record options, rationale, and consequences?
- What form or schema pattern helps prevent repeated missing questions?

## Search Channels

- Web search
- Repository search
- Official documentation search
- Internal knowledge-base search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Thoughtworks Technology Radar FAQ | https://www.thoughtworks.com/en-us/radar/faq | Reference for adoption confidence and caution framing |
| ADR GitHub Organization | https://adr.github.io/ | Decision, rationale, trade-off, and consequence recording |
| GitHub issue template docs | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository | Structured inputs and field-based information capture |
| GitHub issue forms syntax | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms | Form schema and validation concepts |
| Internal source collection policy | `_docs/policies/source-collection-policy.en.md` | Source diversity rules |
| Internal search insight planning policy | `_docs/policies/search-insight-planning-policy.en.md` | Convert search results into insights and plans |

## Knowledge-Base Validation

- Internal policies were reused, so final verification will run `knowledge-skeptic-agent`.

## Insights

- Coding research needs explicit research types because the domain is broad.
- Research completion should mean options, recommendation, risks, validation plan, and next action exist.
- Combining ADR and issue-form patterns turns a memorized checklist into a schema.
- Large source bundles should connect to `_tools/source-collector/`.

## Plan Steps

- Add `coding_research.py` under `agent-platform`.
- Add a `complete-coding-research` CLI command.
- Add agent config and planning input template.
- Add Korean and English docs and coding research report templates.
- Update `_ops` router, prompt, workflow, and index.
- Update persistent instructions, README files, research index, and daily history.
- Run tests, knowledge validation, hallucination guard, and work evaluator.
- Commit and push immediately.

## Rejected Or Deferred Options

- Prompt-only checklist: deferred because it cannot provide deterministic gap checks or tests.
- External search API integration: deferred because `_tools/source-collector/` already provides a provider-independent schema for source bundles.

## Risks And Unknowns

- Research-type-specific required questions may need to become more detailed later.
- Large-scale automatic source collection still needs adapter work.
- This agent is a readiness checker; actual web search is handled by operating procedure and available search tools.

## Validation Method

- `python3 -m unittest discover -s agent-platform/tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research ...`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- `workspace-index` and `task-board` checks
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Implement the coding research agent as a Python readiness checker instead of a prompt-only checklist | Preserve repeatable validation and testability |
