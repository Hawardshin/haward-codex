# Spec-Driven Development Workflow

## Purpose

요구사항을 스펙, 계획, 작업 목록, 검증 기록, traceability로 변환한 뒤 구현한다.

## Sequence

1. Run web-first intake and save a web search record.
2. Read active requirements under `_requirements/` or the owning project's `docs/requirements/`.
3. Decide shared workspace scope or project-specific scope.
4. Create or update the spec folder under `_specs/<scope>/YYYY-MM-DD-<slug>/` or `project-name/specs/YYYY-MM-DD-<slug>/`.
5. Write or update `spec.*.md` with scope, behavior, acceptance criteria, non-goals, and related requirement IDs.
6. Analyze the spec for ambiguity, conflict, missing edge cases, testability, and project-boundary leakage.
7. Write or update `plan.*.md` with implementation strategy, file scope, risks, and validation strategy.
8. Write or update `tasks.*.md` with task IDs and requirement/spec references.
9. Implement only after the spec, plan, and tasks are ready.
10. Write or update `validation.*.md` with commands, checks, and results.
11. Write or update `traceability.*.md` with request, requirement, spec, task, file, evaluation, commit, and push links.
12. Include `spec_targets` in `work-evaluator-agent` input.

## Rule

Do not implement meaningful behavior, structure, or platform changes from a request alone. Convert the request into requirements and spec-driven artifacts first, then implement against the active spec.
