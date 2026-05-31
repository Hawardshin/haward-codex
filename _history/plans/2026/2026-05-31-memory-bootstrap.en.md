# Plan History: Memory Bootstrap Structure

## Initial Request

- "We need a structural way so AI does not forget all these settings later."

## Plan Objective

- Create a hot/warm/cold memory anchor structure so future AI sessions do not forget repository rules and settings.
- Manage required memory anchors through a config file and validate them through a CLI.

## Search Questions

- What structure helps AI agents preserve long-term memory across sessions?
- How should always-loaded context and on-demand context be separated?
- How can repository-based memory be made testable?

## Search Channels

- Web search
- Repository search
- Code search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| agentmemory.md | https://agentmemory.md/ | Persistent memory example for decisions, context, goals, preferences, and workflows |
| Microsoft Learn Memory & Persistence | https://learn.microsoft.com/en-us/agent-framework/get-started/memory | Context provider, history provider, and session state structure |
| Memory Matters | https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688 | Long-term memory and memory type separation |
| Memory OS of AI Agent | https://huggingface.co/papers/2506.06326 | Hierarchical memory storage and retrieval framing |
| Existing persistent instructions | `_docs/persistent-instructions.en.md` | Current durable rule list |
| Existing ops index | `_ops/index.md` | Operations navigation entry point |

## Knowledge-Base Validation

- Internal policy and operating docs are reused, so final verification will run `knowledge-skeptic-agent`.

## Insights

- Loading all documents all the time is expensive and can create confusion.
- Always-loaded hot anchors, task-relevant warm anchors, and searchable cold anchors should be separated.
- Required files should be managed through a manifest and validated by CLI.
- When durable rules or source configs are added, the manifest must be updated so future sessions do not miss them.

## Plan Steps

- Add `agent-platform/configs/memory/bootstrap-manifest.json`.
- Add `memory-bootstrap-agent` config.
- Add `agent_platform.memory.bootstrap` helper and `check-memory-bootstrap` CLI.
- Add unit tests.
- Add `_ops/prompts/01-memory-bootstrap.md` and `_ops/workflows/01-memory-bootstrap.md`.
- Update start workflow, start prompt, router, and ops index.
- Update persistent instructions, AGENTS, README, and platform operating model.
- Add research notes, policy docs, and evaluation reports.
- Regenerate maps, verify, evaluate, commit, and push.

## Rejected Or Deferred Options

- Vector or graph DB memory is deferred. The repository needs file-based manifest and CLI validation first.
- Putting all history in hot context is deferred because it increases context cost and confusion.

## Risks And Unknowns

- If the manifest grows too large, hot anchors must be trimmed.
- Current checks focus on file existence and manifest structure. Freshness and conflict checks can become a separate validator later.

## Validation Method

- `agent-platform` unit tests
- `check-memory-bootstrap` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board checks
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Implement hot/warm/cold manifest and CLI validation | Fix future startup memory structurally |
