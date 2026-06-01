# Hallucination Prevention Operating References

## Research Purpose

Record reusable evidence for designing hallucination prevention policy, prompts, and evaluation agents in the agent platform.

## Access Date

- 2026-05-31

## Sources

| Source | URL | Notes |
| --- | --- | --- |
| OpenAI: ChatGPT and fake citations | https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations | Basis for verifying links and citations instead of trusting generated references |
| OpenAI Structured Outputs | https://platform.openai.com/docs/guides/structured-outputs | Implementation reference for schema-constrained outputs |
| OpenAI File Search docs | https://developers.openai.com/api/docs/guides/tools-file-search | Implementation reference for document-grounded retrieval |
| OpenAI Web Search docs | https://developers.openai.com/api/docs/guides/tools-web-search | Implementation reference for live web grounding |
| Anthropic: Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | Reference for "say you do not know", quotation/source grounding, and verification workflows |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | Evidence for augmenting model memory with retrieved knowledge |
| Chain-of-Verification Reduces Hallucination in Large Language Models | https://arxiv.org/abs/2309.11495 | Evidence for drafting, generating verification questions, checking them, and revising |
| SelfCheckGPT | https://aclanthology.org/2023.emnlp-main.557/ | Evidence for detecting unsupported generated statements through self-consistency checks |
| Self-RAG | https://arxiv.org/abs/2310.11511 | Evidence for combining retrieval, generation, and critique in an agentic RAG loop |

## Summary

- Hallucination reduction requires a system, not a single prompt: retrieval, source checks, structured outputs, claim-level verification, uncertainty labeling, and evaluation loops.
- RAG reduces reliance on internal model memory, but retrieved content can still be stale or wrong, so source reliability and freshness matter.
- Structured outputs stabilize format and completeness, but they do not guarantee factual truth.
- Self-checking and verification loops can reduce errors, but should be paired with external evidence and tool execution.
- Citation-heavy answers must verify real links and source content; generated citations should not be trusted by default.

## Insights

- The shared policy should not be "always search"; it should classify factual-risk level and require appropriate evidence.
- For repository work, file inspection, commands, and tests can be stronger evidence than web sources.
- A claim ledger checked by `hallucination-guard-agent` before final output is reusable across tasks.
- Grounding checks should appear in evaluation reports so "verified" remains auditable.

## Plan Impact

- Add `_docs/hallucination-prevention-policy.*.md`.
- Add `_ops/prompts/96-ground-output.md` and `_ops/workflows/70-hallucination-prevention.md`.
- Add Python-based `hallucination-guard-agent` and `check-grounding` CLI to `agent-platform`.
- Add `grounding_checks` to `work-evaluator-agent` input.

## Reliability Judgment

- Evidence quality is high because it combines official documentation and major research papers.
- Provider docs are strong for product features and recommended patterns, but papers are stronger for general research claims.
- Research papers still need operational validation through tools, tests, and repository-specific checks.

## Uncertainty And Contrary Signals

- There is no practical method that guarantees hallucinations never happen. The target is to block unsupported claims and reduce error probability.
- RAG can still fail because of retrieval quality, chunking, stale documents, or bad sources.
- Structured output validates shape, not factual truth.

## Applicability

- Applies directly to workspace rules, evaluation loops, research capture, and final-answer quality control.
- High-risk domain projects should add stricter source policies and domain-specific evaluation sets.

## Related Work

- `_docs/policies/hallucination-prevention-policy.en.md`
- `_ops/workflows/70-hallucination-prevention.md`
- `agent-platform/docs/hallucination-guard-agent.en.md`

## Next Checks

- Refine claim types and risk levels by domain as more projects are created.
- Recheck this note when OpenAI, Anthropic, or other model providers change grounding, citation, or eval features.

## Later Policy Change

- On 2026-05-31, the user instructed that every new instruction should start with web search.
- The earlier insight that the shared policy should not be "always search" remains only as guidance for search depth.
- The current operating rule is to always perform web-first intake, then vary additional search and grounding depth by task risk.
