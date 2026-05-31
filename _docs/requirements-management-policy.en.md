# Requirements Management Policy

## Purpose

Define requirements from the user's work and conversation, keep revising and reviewing them, and use them as the basis for implementation and evaluation.

## Principles

- A user request can become a requirement candidate.
- Requirements are rewritten as verifiable statements, not raw prompt text.
- Each requirement records source request IDs, rationale, status, priority, verification method, and related artifacts.
- Shared workspace requirements live under `_requirements/`.
- Project-specific requirements live under the owning project's `docs/requirements/`.
- Requirement changes live under `_requirements/changes/` or the project-specific change record.
- Requirement reviews live under `_requirements/reviews/` or the project-specific review record.
- Meaningful implementation work turns requirements into spec-driven artifacts before implementation.
- Meaningful work includes `requirements_targets` and `spec_targets` in evaluation input.

## Requirement Lifecycle

1. Derive candidate requirements from requests or research.
2. Rewrite each requirement as a verifiable statement.
3. Review conflicts, duplicates, and gaps against existing requirements.
4. Decide impact scope and owning project.
5. Add it to the baseline.
6. Create the related spec, plan, task list, validation, and traceability artifacts.
7. Implement from the spec.
8. Verify and link the evaluation report.
9. Change the requirement when new requests or reviews require it.

## Related Files

- [_requirements/README.en.md](../_requirements/README.en.md)
- [_requirements/baselines/2026-05-31-workspace-platform.en.md](../_requirements/baselines/2026-05-31-workspace-platform.en.md)
- [_templates/requirements/requirement-baseline.en.md](../_templates/requirements/requirement-baseline.en.md)
- [_ops/workflows/35-requirements-lifecycle.md](../_ops/workflows/35-requirements-lifecycle.md)
- [_ops/workflows/36-spec-driven-development.md](../_ops/workflows/36-spec-driven-development.md)
- [agent-platform/docs/requirements-manager-agent.en.md](../agent-platform/docs/requirements-manager-agent.en.md)
