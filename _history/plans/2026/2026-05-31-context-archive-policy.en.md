# Plan Record: Context Archive Policy

## Initial Request

The user instructed the agent to summarize and archive context proactively when it believes context is getting full, then operate from documents.

## Search Questions

- What risks does context compression create in long LLM/agent conversations?
- How should summaries be separated from source evidence and searchable archives?
- What resume packet is needed so the next session can continue without reading all history?

## Sources Checked

- ReadAgent: gist memory plus lookup back to original material
- Evaluating Very Long-Term Conversational Memory of LLM Agents: long-term conversation memory evaluation
- Active Context Compression: agent-managed context bloat
- Microsoft Agent Framework Memory and Persistence: separation of memory, history, and session state
- Internal docs: `_docs/operating-models/context-management.md`, `_docs/policies/memory-bootstrap-policy.ko.md`, `_ops/prompts/50-compress-context.md`

## Insights

- An archive should be a resume index, not a replacement for original evidence.
- Separating must-read files, remaining work, verification state, and links lets future sessions load only what matters.
- Old archive packets are fallible knowledge-base entries and need skeptic validation.
- When context archiving occurs, evaluator input should check archive targets.

## Selected Plan

1. Add `_history/context-archives/` README files and bilingual templates.
2. Add `_docs/context-archive-policy.*` and `_ops/workflows/45-context-archive.md`.
3. Strengthen the existing context management docs and compression prompt.
4. Add `context_archiving_occurred` and `context_archive_targets` to `work-evaluator-agent`.
5. Update persistent rules, README, AGENTS, ops index, and memory bootstrap manifest.
6. Create a context archive packet for this change set.
7. Verify, evaluate, commit, and push.

## Deferred Options

- Store the full chat transcript: rejected because it risks preserving sensitive content, private reasoning, and unnecessary logs.
- Use a fixed token threshold: rejected because thresholds vary by model and task; use “can the next session continue from documents?” instead.

## Risks And Uncertainty

- Summaries are always lossy.
- Old archive packets can conflict with current repository state.
- Packets therefore include must-read files and validation paths, with skeptic checks for old content.

## Verification Plan

- Work evaluator unit tests
- JSON validation
- Memory bootstrap validation
- Config contract validation
- Workspace map and task board regeneration/check
- Knowledge, grounding, and evaluation CLI checks

## Plan Change History

- 2026-05-31: Initial version.
