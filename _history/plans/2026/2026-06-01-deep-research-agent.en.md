# Plan Record: Deep Research Agent

## Work Mode

- Selected mode: `standard`
- Reason: this changes shared agent-platform capability, adds a CLI, configs, workflow/prompt, requirements/specs, and history artifacts.

## Evidence Checked

- OpenAI API Deep Research: model for comprehensive reports from many analyzed/synthesized sources
- Exa Research API: async multi-step research pipeline with planning, searching, and reasoning/synthesis
- LangChain Deep Agents docs: todo planning, sub-agent research, search assessment, and cited report synthesis
- Cited but Not Verified and ReportBench: citation verification and unsupported-claim checks are needed
- Internal repo: `research_insight_planner.py`, `coding_research.py`, `work_evaluator.py`, `research-agent-profile.json`

## Decisions

- Name the new agent `deep-research-agent`.
- Add a separate `deep_research.py` module instead of extending the existing planner.
- Do not install search automation in this change; validate research packages and report-writing readiness deterministically.
- Write executable prompt bodies in English and user-facing documentation in Korean/English pairs.

## Plan Steps

1. Add requirements and specs.
2. Create the deep research profile and template.
3. Add the Python dataclass readiness checker and CLI.
4. Add tests and a CLI sample.
5. Connect workflow/prompt/router/memory/health.
6. Run verification, evaluation, history updates, commit, and push.

## Risks And Unknowns

- Without a real search API, this implementation focuses on validating the search result package, not running retrieval.
- Overly strict source-count rules can slow lighter research, so depth levels are included.
- Citation audit only helps when the actual source text was checked; final reports still need grounding before publication.

## Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-06-01 | Scoped as a separate deep research readiness agent | Reduce overlap with the existing planner |

