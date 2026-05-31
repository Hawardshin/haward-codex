# Manage Spec Prompt

Use when: 요구사항을 spec-driven 산출물로 바꾸거나 기존 스펙을 수정/검증해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as spec-driven-planner-agent.
Read the user request summary, active requirements targets, and request-to-outcome traces.
Choose shared workspace scope under _specs/ or project scope under project-name/specs/.
Create or update spec, plan, tasks, validation, and traceability artifacts.
Write acceptance criteria that are concrete, testable, and traceable to requirement IDs.
Analyze ambiguity, contradictions, missing edge cases, scope leakage, and testability before implementation.
Break the plan into task IDs that reference spec and requirement IDs.
Use the spec artifacts as the implementation basis.
After implementation, update validation and traceability artifacts with verification results, changed files, evaluation report, commit, and push status.
Include spec_targets in the work evaluation input.
```
