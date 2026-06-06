# Web Search Record: OSS Pattern Adoption Gate

작성일: 2026-06-06

## Queries

- `GitHub trending AI agent framework open source architecture 2026 LangGraph AutoGen CrewAI OpenHands Dify`
- `GitHub trending AI agent platform repository stars architecture 2026`
- `best open source AI agent frameworks GitHub stars 2026 agent platform architecture`
- `open source agent platform GitHub Dify LangGraph AutoGen CrewAI OpenHands architecture`
- GitHub API repository metadata and contents inspection for selected repositories.
- GitHub topic search checks for `topic:ai-agent`, `topic:agentic-ai`, `topic:mcp`.

## Checked Sources

- https://github.com/langchain-ai/langgraph
- https://github.com/openai/openai-agents-python
- https://github.com/pydantic/pydantic-ai
- https://github.com/crewAIInc/crewAI
- https://github.com/microsoft/semantic-kernel
- https://github.com/langgenius/dify
- https://github.com/OpenHands/OpenHands
- https://github.com/mastra-ai/mastra
- https://github.com/vercel/ai

## Weak Sources Ignored

- Generic SEO listicles and thin "best agent framework" summaries were not used for implementation decisions.
- GitHub topic search surfaced some suspicious high-star or low-provenance repositories. These were treated as discovery noise and not used as implementation references.
- GitHub stars and trend signals were recorded only as adoption/discovery signals.

## Plan Impact

- The strongest immediate implementation was a local OSS pattern adoption validator, not cloning a framework.
- LangGraph influenced state/checkpoint adapter pattern recording.
- OpenAI Agents Python influenced lifecycle/guardrail/handoff/sandbox/tracing separation.
- Pydantic AI and Vercel AI influenced typed tool/provider adapter boundaries.
- Dify, Mastra, OpenHands, and Vercel AI influenced monorepo/product module split references.
- Semantic Kernel, Vercel AI, and Mastra influenced hybrid module boundary planning.

## Uncertainty

- Stars, license metadata, and repository structure can change after 2026-06-06.
- Repositories with unclear license posture are reference-only until a dedicated license review clears direct use.
- This pass inspected repository metadata and selected source paths, not every file or issue thread.

## Public Decision Summary

Do not copy external code in this slice. Implement a Python-native validator and self-documenting config that make future pattern adoption, direct import, dependency install, and hybrid module choices auditable before implementation.
