# 2026-05-31 Web Search Record: Context Archive Policy

## User Instruction Summary

The user instructed the agent to summarize and archive context proactively when it believes context is getting full, then operate from documents.

## Search Execution

- Search time: 2026-05-31
- Queries:
  - `AI agent context compression memory summarization archive best practices official docs`
  - `LLM agent memory context management summarization long conversations paper`
  - `OpenAI prompt caching conversation summarization context management agent docs`
- Search tool: Codex web search

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [ReadAgent: A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://huggingface.co/papers/2402.09727) | paper summary/paper | 2026-05-31 | Used the memory episode and gist memory pattern with lookup back to original material. |
| [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753) | paper | 2026-05-31 | Used the evaluation concern that long conversations create temporal, causal, and multi-session consistency challenges. |
| [Active Context Compression: Autonomous Memory Management in LLM Agents](https://arxiv.org/abs/2601.07190) | paper | 2026-05-31 | Used the idea that agents should manage context compression proactively. |
| [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | official docs | 2026-05-31 | Used the separation of memory provider, history provider, and session state. |

## Excluded Or Weak Sources

| Source | Reason |
| --- | --- |
| Reddit/personal experience posts | Useful as operational signals, but official docs and papers are stronger policy references. |
| Vendor SEO context compression docs | Too product-specific to adopt directly as this repository's general operating rule. |

## Insights Applied To The Plan

- Do not store entire long conversations; store stable state and resume paths as a `context archive packet`.
- Treat the packet as a resume index with must-read files, remaining work, verification, and links.
- Older packets can be stale, so route important reuse through `knowledge-skeptic-agent`.
- When context archiving occurs, the evaluator should check `context_archive_targets`.

## Public Decision Summary

Context compression is lossy if only a summary is stored. This repository therefore uses a compact archive packet that links back to source documents, commits, evaluations, and search records.

## Links

- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Plan record: `_history/plans/2026/2026-05-31-context-archive-policy.en.md`
- Context archive: `_history/context-archives/2026/2026-05-31-context-archive-policy.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-context-archive-policy.en.md`
