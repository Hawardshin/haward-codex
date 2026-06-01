# Platform Concept Review

## Review Date

- 2026-06-01

## Current Concept Summary

This repository is not a single app. It is a long-lived monorepo for a personal agent-building platform plus multiple interest-specific projects. The core direction is:

- Treat user instructions as requirement candidates, then connect requirements, specs, plans, validation, evaluation, and history.
- Strengthen probabilistic AI output through web search, knowledge validation, grounding, evaluation, and rework.
- Promote repeated work into docs, templates, tools, skills, workflows, and agents.
- Keep shared operating knowledge under `_docs`, `_ops`, `_requirements`, `_specs`, `_history`, `_research`, `_tools`, `_skills`, and `_philosophy`; keep interest-specific implementation inside root projects.
- As projects grow, structure, naming, history, coordination, and dashboards become the interface for future work.

## Well-Covered Axes

| Axis | Current Implementation |
| --- | --- |
| Web-first research | `_ops/workflows/05-web-first-intake.md`, `_history/web-searches/` |
| Memory bootstrap | `agent-platform/configs/memory/bootstrap-manifest.json` |
| Requirements-based operations | `_requirements/`, `_ops/workflows/35-requirements-lifecycle.md` |
| Spec-driven execution | `_specs/`, `_ops/workflows/36-spec-driven-development.md` |
| Evaluation and rework | `_ops/workflows/40-evaluate-and-rework.md`, `work-evaluator-agent` |
| Skeptic review and grounding | `knowledge-skeptic-agent`, `hallucination-guard-agent` |
| Project boundaries | `_ops/projects/registry.json`, `_ops/projects/root-structure-policy.json` |
| Context compression | `_history/context-archives/`, context archive policy |
| Parallel work | `parallel-work-planner-agent`, `_ops/coordination/` |
| Usability and observability | `workspace-monitor/`, `_tools/workspace-health/` |
| Naming and structure | `_tools/structure-audit/`, `_tools/naming-audit/` |

## Gaps Found And Addressed

| Gap | Impact | Update |
| --- | --- | --- |
| Philosophy document was not a direct memory bootstrap anchor | Future sessions could skip the operating philosophy | Added `agent_operating_philosophy` anchor |
| User authority and autonomy boundaries were weak in the philosophy | Agents could treat user-judgment decisions as ordinary execution details | Added philosophy principles 10 and 11 |
| Security/privacy existed in policy but was weak in philosophy | Secrets, private state, and public release review could look like implementation details | Added philosophy principle 12 |
| Operating cost and agentic technical debt were not explicit | Full-loop overuse or temporary work accumulation could be missed as design issues | Added philosophy principle 13 |

## Remaining Improvement Candidates

- Autonomy level registry for work that needs explicit user approval.
- Lightweight operations metrics for cost, time, tokens, and tool calls.
- Private data review checklist before public deployment.
- Migration template for renaming existing durable paths.

## Judgment

The overall concept is coherent. The missing parts were less about how agents become smarter and more about how autonomy is bounded, observed, stopped, and reversed. The philosophy now connects more directly to the operational rules.
