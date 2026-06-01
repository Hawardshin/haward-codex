# Plan: Deep Research Agent

1. Create the web search record, requirement change/review, spec artifacts, and timing record.
2. Add `deep-research-profile.json` and `deep-research-template.json` as self-documenting configs.
3. Add `agent-platform/src/agent_platform/planning/deep_research.py` and CLI `complete-deep-research`.
4. Add unit tests for ready state and key missing-field gaps.
5. Connect the agent spec, docs, workflow, prompt router, README, memory bootstrap, and workspace-health config contract.
6. Run task board, workspace index, memory/config checks, tests, grounding, and evaluator.
7. Update history, summaries, trace, evaluation, timing, then commit and push.

## Evidence Mapping

- Multi-source deep research report pattern <- OpenAI API Deep Research, Exa Research API, LangChain Deep Agents docs
- Citation audit requirement <- Cited but Not Verified, ReportBench
- Separate module decision <- existing `research_insight_planner.py` handles planning readiness; this request needs report readiness

