# Memory Bootstrap References

## Purpose

This note records references for a manifest-based hot/warm/cold memory bootstrap structure that prevents future AI sessions from forgetting repository settings.

## Access Date

- 2026-05-31

## Sources Checked

| Source | Type | Key Point | Application |
| --- | --- | --- | --- |
| agentmemory.md: https://agentmemory.md/ | open-source/tool example | Structures decisions, context, goals, preferences, and workflows as durable memory and uses rules for automatic session recall. | This repository loads settings and rules through a bootstrap manifest. |
| Microsoft Learn, Memory & Persistence: https://learn.microsoft.com/en-us/agent-framework/get-started/memory | official docs | Describes context providers, history providers, and session state for injecting and storing context. | `memory-bootstrap-agent` validates context anchors before local planning. |
| Memory Matters: The Need to Improve Long-Term Memory in LLM-Agents: https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688 | paper | Discusses procedural, episodic, semantic memory and memory management over an agent's lifetime. | Use hot/warm/cold anchors and metadata-backed manifest records. |
| Memory OS of AI Agent: https://huggingface.co/papers/2506.06326 | paper/research page | Proposes OS-style hierarchical memory storage, updating, retrieval, and generation modules. | Start with a file-based hierarchy that can later evolve into search and indexing. |

## Insights

- Long-term memory should not be one large document. It needs compact hot context and retrievable warm/cold context.
- A future session needs a manifest that fixes what the AI reads first.
- The memory structure itself should be testable through a CLI.
- When durable settings are added, the manifest must be updated so future sessions do not miss them.

## Resulting Application

- Added `memory-bootstrap-agent`.
- Added `agent-platform/configs/memory/bootstrap-manifest.json`.
- Added the `check-memory-bootstrap` CLI.
- Added `_ops/prompts/01-memory-bootstrap.md` and `_ops/workflows/01-memory-bootstrap.md`.
- Added memory bootstrap to the start workflow and persistent instructions.
