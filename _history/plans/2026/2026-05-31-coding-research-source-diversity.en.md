# Plan History: Coding Research Source Diversity

## Initial Request

- "Use diverse sources."

## Plan Objective

- Make source diversity an implementation-readiness requirement for the coding research agent, not only a recommendation.

## Search Questions

- What supports using diverse sources in software engineering research?
- How should coding research validate source diversity in its input schema?

## Search Channels

- Web search
- Repository search
- Code search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Guidelines for including grey literature and conducting multivocal literature reviews in software engineering | https://doi.org/10.1016/j.infsof.2018.09.006 | Reference for combining formal and grey literature |
| CMU SEI Digital Library | https://www.sei.cmu.edu/library/ | Software engineering library with multiple publication types |
| Existing coding research agent docs | `agent-platform/docs/coding-research-agent.en.md` | Location for source diversity rules |
| Existing coding research agent implementation | `agent-platform/src/agent_platform/planning/coding_research.py` | Location for `source_types` readiness checks |

## Knowledge-Base Validation

- Internal agent docs and policy are reused, so final verification will run `knowledge-skeptic-agent`.

## Insights

- Multiple search channels do not guarantee diverse source types.
- A separate `source_types` input makes categories such as official docs, papers, open source, technical blogs, community, social, and contrary examples explicit.
- Readiness should require at least three distinct non-`other` source types, at least one authoritative source, and at least one practical/adoption/contrary signal source.

## Plan Steps

- Add `source_types` to `CodingResearchInput`.
- Add allowed source types and diversity validation.
- Update templates, tests, docs, operations prompt/workflow.
- Update research notes, history, and evaluation reports.
- Run tests and CLI validation, then commit and push.

## Rejected Or Deferred Options

- URL-based source type inference was deferred. Requiring explicit source type classification is clearer for research discipline.

## Risks And Unknowns

- Three source types may feel heavy for a small local bug investigation. The current operating philosophy prioritizes diverse-source research, so readiness is intentionally stricter.

## Validation Method

- `agent-platform` unit tests
- `complete-coding-research` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- map/board checks and `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Add `source_types` and make source diversity a readiness condition | The user explicitly required diverse sources |
