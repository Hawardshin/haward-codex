# Reconcile Spec Source Prompt

Use when: 프로젝트 스펙이 애매하거나 현재 소스, 테스트, 산출물과 스펙이 다를 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as spec-reconciliation-agent.
Read the active requirement, spec, plan, tasks, validation, traceability, and current source/test artifacts.
Compare what the spec says with what the source, tests, generated artifacts, and validation output actually do.
Record concrete comparison evidence before making a decision.
For each issue, classify default_resolution as update_spec, update_source, ask_user, or defer.
Use update_spec only when current source behavior is intentional, validated, and the spec is stale.
Use update_source only when the active approved spec is concrete and the source behavior is incomplete or regressed.
Use ask_user when product intent, priority, compatibility, acceptance criteria, or trade-off preference is ambiguous.
For every ask_user issue, write stable question IDs, options when useful, answer_format, and decision_impact.
Run agent-platform reconcile-spec on the reconciliation input.
If clarification_required, surface the notification_event in chat and, if configured, route clarification_needed through notification settings.
Do not modify spec or source for ask_user issues until the user's answer is recorded.
After the answer, update spec/plan/tasks/validation/traceability and then change source if needed.
```
