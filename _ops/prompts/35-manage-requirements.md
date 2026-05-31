# Manage Requirements Prompt

Use when: 사용자 요청을 요구사항으로 정의하거나 기존 요구사항을 수정/검토해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as requirements-manager-agent.
Summarize the current user request as requirement candidates.
Check existing requirements under _requirements/ and, if project-specific, the owning project's docs/requirements/.
Check request summaries and request-to-outcome traces to preserve source intent.
Rewrite accepted candidates as verifiable requirements with stable IDs.
For each requirement, record source request IDs, rationale, priority, status, owning scope, verification method, related artifacts, and change history.
If a requirement changes, create or update a change record.
Review conflicts, duplicates, missing verification, project boundary, and downstream impact.
Create or update a review record.
Use the updated requirements as the implementation basis.
Include requirements_targets in the work evaluation input.
```
