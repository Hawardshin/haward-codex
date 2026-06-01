# Hallucination Prevention Structure Plan

## Initial Request

- "할루시네이션이 안 나도록 하는 방법도 역시 다해줘."

## Plan Purpose

- Add a hallucination prevention system to both workspace operations and the agent platform.
- Turn grounding, claim verification, uncertainty labeling, and evaluation into durable rules, not a one-off prompt.

## Search Questions

- What verifiable methods reduce hallucination in agent outputs?
- What roles and limits do RAG, structured outputs, self-verification, and citation checks have?
- Which shared policy, prompt, and Python agent fit this repository structure?

## Search Channels

- Web search
- Official documentation
- Research papers
- Repository search across existing docs and agent code

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| OpenAI fake citations help | https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations | Citation verification need |
| OpenAI Structured Outputs | https://platform.openai.com/docs/guides/structured-outputs | Schema-constrained output stability |
| OpenAI File Search/Web Search docs | https://developers.openai.com/api/docs/guides/tools-file-search, https://developers.openai.com/api/docs/guides/tools-web-search | Retrieval-grounding implementation reference |
| Anthropic reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | Saying "unknown", source-grounded answers, verification patterns |
| RAG paper | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | Retrieval augmentation evidence |
| Chain-of-Verification | https://arxiv.org/abs/2309.11495 | Draft-then-verify loop |
| SelfCheckGPT | https://aclanthology.org/2023.emnlp-main.557/ | Self-checking signal for unsupported statements |
| Self-RAG | https://arxiv.org/abs/2310.11511 | Retrieval, generation, and critique loop |
| Existing operations docs | `AGENTS.md`, `_docs/instructions/workspace-rules.md`, `_docs/policies/search-insight-planning-policy.ko.md`, `_docs/policies/knowledge-base-validation-policy.ko.md` | Existing search, validation, and evaluation policy |

## Knowledge-Base Validation

- Internal operating docs are used as evidence, so they should be validated with `knowledge-skeptic-agent`.
- Validation targets: `AGENTS.md`, `_docs/instructions/workspace-rules.md`, `_docs/policies/search-insight-planning-policy.ko.md`, `_docs/policies/knowledge-base-validation-policy.ko.md`, `agent-platform/docs/knowledge-skeptic-agent.ko.md`, `agent-platform/docs/work-evaluator-agent.md`
- Expected result: `ready_to_reference`

## Insights

- Hallucination prevention is not just "always search"; it requires claim-level grounding and auditable evaluation records.
- For repository work, `git status`, file inspection, and test results can be the strongest evidence.
- External facts and current information need dated official docs, papers, or reliable web sources.
- Final evaluation reports should include grounding checks so future agents can audit whether facts were verified.

## Plan Steps

1. Save Korean and English research notes under `_research/topics/agent-reliability/`.
2. Add `_docs/policies/hallucination-prevention-policy.ko.md` and `.en.md`.
3. Add `_ops/prompts/96-ground-output.md` and `_ops/workflows/70-hallucination-prevention.md`.
4. Add `hallucination-guard-agent` config, input template, Python evaluator, and CLI command to `agent-platform`.
5. Add `grounding_checks` to `work-evaluator-agent` input.
6. Update README, AGENTS, persistent instructions, philosophy, operations index, and maps.
7. Run tests and structural checks.
8. Validate this work with `hallucination-guard-agent`, `knowledge-skeptic-agent`, and `work-evaluator-agent`, then save evaluation files.
9. Commit and push immediately.

## Excluded Or Deferred Options

- Do not add a vector DB or full RAG framework yet. The first need is policy and a deterministic claim checker.
- Do not force web search for every answer. For repository state and code behavior, local tool verification can be more appropriate.

## Risks And Uncertainty

- No system can guarantee zero hallucinations. The practical target is to block unsupported claims and reduce error probability.
- Claim extraction can still miss a claim. High-risk work should review claim extraction separately.

## Verification Methods

- `python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Chose to add a deterministic `hallucination-guard-agent` | Repeated quality gates need a reusable checker |
| 2026-05-31 | Added `grounding_checks` to `work-evaluator-agent` | Final evaluations should track factual grounding |
