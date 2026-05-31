# Perplexity-Style Core Research Agent Evaluation

## Initial Instruction

The user said the research agent is a core capability and asked to reference structures such as Perplexity.

## Result Summary

- Strengthened `research-insight-planner-agent` into a core Perplexity-style answer-engine research agent.
- Added `agent-platform/configs/research/research-agent-profile.json` as a self-documenting config for retrieval, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.
- Added `research_profile_paths`, `answer_engine_stages`, and `citation_requirements` to the planner readiness checker and tests.
- Added `research_agent_profile` to memory-bootstrap hot context so future sessions load the core research profile.
- Updated Korean and English research notes, plan history, policies, prompts, workflows, and operating docs.

## References Checked

- [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart)
- [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform)
- [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets)
- [Self-RAG](https://arxiv.org/abs/2310.11511)
- [MA-RAG](https://arxiv.org/abs/2505.20096)
- [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022)
- [RAGTruth](https://arxiv.org/abs/2401.00396)
- [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/)
- `AGENTS.md`
- `_docs/search-insight-planning-policy.ko.md`
- `agent-platform/configs/research/source-registry.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## Verification

- `agent-platform` unit tests: 43 tests OK
- `plan-from-research`: `ready_to_plan`, no gaps
- `check-config-contract`: `self_documenting`, no gaps
- `check-memory-bootstrap`: `ready_to_bootstrap`, 13 hot anchors including `research_agent_profile`
- JSON syntax checks: passed
- `_tools/source-collector` tests: 4 tests OK
- `_templates/python-agent-project` tests: 1 test OK
- workspace index check: clean
- task board check: clean
- `git diff --check`: clean
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, no gaps

## Evaluation Result

The result matches the initial instruction. The "research agent as core" requirement is now represented in hot memory and persistent rules, and the Perplexity-style structure is grounded in public documentation plus RAG/citation verification references.

## Improvement Idea

If citation audits become frequent, build a dedicated citation verification tool for automatic claim-to-source support checks. For now, the platform starts with planning fields, the research profile, and the hallucination guard.
