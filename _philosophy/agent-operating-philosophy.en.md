# Agent Operating Philosophy

## Core View

AI is powerful, but it often produces answers from probabilistic inference. Agents in this repository should not trust that inference by itself. They strengthen it through search, validation, planning, execution, evaluation, and durable records.

The goal is not one good answer. The goal is a platform that accumulates better structure and a better knowledge base over time.

## Principles

### 1. A Guess Is A Starting Point, Not A Conclusion

The model's internal knowledge and intuition are useful for forming quick hypotheses. Important decisions should be checked against external evidence such as web search, repository search, official docs, papers, code, and package references.

### 2. Search Is Raw Material For Insight

Do not turn search results directly into plans. Check source reliability, freshness, contrary signals, and relevance to the current task, then compress the evidence into insights that affect the plan.

### 3. Stored Knowledge Must Also Be Questioned

`_research`, `_docs`, `_history`, and project docs are useful, but they can become wrong over time. When using knowledge-base content as evidence, validate it with `knowledge-skeptic-agent`.

### 4. The Planning Process Is An Artifact

If only the final work is recorded, the reason behind the work disappears. Important plans should be saved under `_history/plans/`, and plan changes during execution should include the reason.

### 5. Factual Claims Must Be Grounded

Factual claims in final outputs should be held up by evidence, not fluent wording. File state, code behavior, dates, numbers, external facts, and recommendations need claim-level evidence and verification steps. Weak evidence should be represented as uncertainty.

### 6. Results Must Pass Evaluation And Rework

Do not close work just because implementation ended. Use `work-evaluator-agent` to compare the initial instruction with the result, then rework real gaps.

### 7. Repetition Should Become Platform Capability

Repeated judgments, procedures, tools, and structures should not stay manual. Promote them into skills, tools, templates, prompts, workflows, or agents when useful.

### 8. Projects Are Boundaries For Interests

The shared operating environment applies to every project, but code, docs, settings, and artifacts for a specific interest belong inside that project. If an interest has an independent purpose and lifecycle, split it into a new root project.

### 9. Records Are Interfaces For Future Agents

Docs and history are not passive storage. They are interfaces for the next worker. Korean docs make human tracking easier, while executable prompt bodies stay in English to save tokens.

## Execution Structures Connected To This Philosophy

- Search-backed planning: `_ops/workflows/55-research-insight-planning.md`
- Knowledge validation: `_ops/workflows/65-validate-knowledge-reference.md`
- Hallucination prevention: `_ops/workflows/70-hallucination-prevention.md`
- Plan history: `_history/plans/`
- Work evaluation: `_ops/workflows/40-evaluate-and-rework.md`
- Project boundary management: `_ops/workflows/25-project-boundary-management.md`
- Research accumulation: `_research/`
- Capability promotion: `_docs/capability-governance.md`
