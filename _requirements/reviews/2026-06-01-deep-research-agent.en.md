# Requirement Review: Deep Research Agent

## Review Target

- `REQ-WS-040`

## Fit

- The requirement matches the user's intent. The user asked for more than a simple search summary: a situation-triggered agent that investigates deeply and writes long-form reports.
- It can overlap with `research-insight-planner-agent`, so the new agent is scoped to deep research packages and report readiness rather than general planning.
- Citation audit and unsupported/weak claim records are mandatory to reduce citation hallucination risk.

## Decision

- Approved.
- `deep-research-agent` belongs in the shared `agent-platform`.
- The first implementation is a document-driven research package readiness checker, not a full crawler. Search API, browser, or file-search integration can be added later.

## Verification Criteria

- Missing deep research stages must return `more_research_required`.
- Missing search channels, source types, iterations, evidence items, citation audit, report outline, or report target must be gaps.
- Internal knowledge-base evidence must require `knowledge_validation_status=ready_to_reference`.

