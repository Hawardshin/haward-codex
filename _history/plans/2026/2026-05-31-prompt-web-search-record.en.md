# Plan Record: Prompt-Level Web Search Records

## Initial Request

The user required every prompt to always run web search and to include the reasoning process in text.

## Search Questions

- What query/source/citation data do agent web search tools expose?
- What standards make search-grounded answers verifiable to users?
- What fields can preserve user-verifiable reasoning without storing private raw reasoning?

## Search Channels

- Codex web search
- Local repository search: `_ops/prompts/`, `_docs/web-first-work-policy.*`, `work-evaluator-agent`

## Sources Checked

- OpenAI Web search docs
- Anthropic Search results docs
- Firebase AI Logic Grounding with Google Search
- Internal docs: `_docs/policies/web-first-work-policy.ko.md`, `_ops/prompts/05-web-first-intake.md`, `_ops/workflows/40-evaluate-and-rework.md`

## Insights

- Use `_ops/prompts/README.*` as the common contract instead of relying only on repeated prompt text.
- Save meaningful search process records under `_history/web-searches/YYYY/`.
- Store queries, sources, ignored sources, plan impact, uncertainty, and a public decision summary instead of raw internal reasoning.
- Make `web_search_record_targets` a blocking close-out requirement in the evaluator.

## Selected Plan

1. Create web search record README files and templates.
2. Link every `_ops/prompts/*.md` prompt to the common contract.
3. Update web-first policy, operations index, start/close/evaluate workflows.
4. Add `web_search_record_targets` to `work-evaluator-agent` code, templates, and tests.
5. Add the web search record policy anchor to the memory bootstrap manifest.
6. Add research notes, history, work summaries, and evaluation reports.
7. Verify, commit, and push.

## Deferred Options

- Store full internal chain-of-thought: inappropriate; use public search reasoning summaries instead.
- Put every search execution under `_research/`: only reusable findings belong there; execution records belong under `_history/web-searches/`.

## Risks And Uncertainty

- Search metadata differs by runtime and API.
- Search can fail or be irrelevant, so failure/irrelevance and stronger local verification must be recorded.

## Verification Plan

- Work evaluator unit tests
- JSON validation
- Memory bootstrap validation
- Config contract validation
- Workspace map and task board regeneration/check
- Knowledge, grounding, and evaluation CLI checks

## Plan Change History

- 2026-05-31: Initial version.
