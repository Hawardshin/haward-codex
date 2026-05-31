# Context Archive Policy References

## Question

When an agent conversation becomes long, what should be summarized, what should be archived, and how should the next session resume from documents?

## Sources Checked

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [ReadAgent](https://huggingface.co/papers/2402.09727) | paper summary/paper | 2026-05-31 | Used the episode and gist memory pattern with lookup back to original material. |
| [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753) | paper | 2026-05-31 | Used the concern that long-term conversations challenge memory, temporal order, and session consistency. |
| [Active Context Compression](https://arxiv.org/abs/2601.07190) | paper | 2026-05-31 | Used the idea that agents should actively manage context bloat. |
| [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | official docs | 2026-05-31 | Used the separation of persistent memory, history, and session state. |

## Insights

- Context compression is lossy, so a summary alone should not replace operating state.
- A resume packet should be an index for continuation, not a raw transcript.
- Separating must-read files from remaining work lets future sessions avoid loading all history.
- Older packets are fallible knowledge-base entries and need skeptical validation when important.
- Evaluator checks for context archive targets reduce missed handoff records.

## Application

- Add `_history/context-archives/` for context resume packets.
- Add Korean and English templates under `_templates/context-archive/`.
- Add `_docs/context-archive-policy.*` and `_ops/workflows/45-context-archive.md`.
- Add `context_archiving_occurred` and `context_archive_targets` to `work-evaluator-agent`.

## Uncertainty

The saturation threshold depends on the model, task complexity, and tool state. This policy uses “can the next session continue from repository documents?” rather than a fixed token count.
