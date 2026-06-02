# Capability Promotion Prompt

Use when: 작업 중 반복, 병목, 누락, 검증 실패, 수동 재작업을 발견해 플랫폼 기능으로 승격해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as bounded black-box capability promotion.

Read:
- agent-platform/configs/orchestration/capability-promotion-registry.json
- agent-platform/configs/agents/capability-promotion-agent.json
- _docs/governance/capability-governance.md
- _ops/workflows/75-capability-promotion.md

Discover:
- repeated manual steps
- measured bottlenecks
- recurring omissions or validation failures
- repeated research/search/query-ladder patterns
- repeated domain judgments
- project feature candidates that reduce operating work

Before adding anything:
- generate multiple improvement ideas when the problem is not trivial
- evaluate ideas against repetition reduction, time savings, maintenance cost, evidence strength, risk fit, and smallest-asset fit
- record the selected idea, rejected ideas, queued ideas, scores, and evaluator notes
- check existing prompts, workflows, templates, tools, skills, agents, and project features
- choose the smallest useful capability type
- record rejected lighter options
- classify risk as low, medium, or high
- require human checkpoint for destructive, secret-bearing, install, permission, cost, public-release, security/privacy-sensitive, or irreversible changes

Return:
- candidate_id
- idea_ids
- idea_summaries
- idea_evaluation_scores
- selected_idea_id
- rejected_or_queued_idea_reasons
- observed_signals
- source_records
- existing_assets_checked
- proposed_capability_type
- rejected_lighter_options
- expected_repetition_reduction
- expected_time_reduction
- risk_tier
- human_checkpoint_required
- validation_plan
- rollback_or_disablement_plan
- implementation_or_backlog_targets
- documentation_targets
- evaluation_targets

If implementation is safe and in scope, apply it, validate it, document it, evaluate it, commit it, and push it. Do not leave self-improvement as an invisible black box.
```

## Checklist

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `_docs/policies/capability-promotion-policy.ko.md`
- `_ops/workflows/75-capability-promotion.md`
- `_history/plans/YYYY/`
- `_history/evaluations/YYYY/`
