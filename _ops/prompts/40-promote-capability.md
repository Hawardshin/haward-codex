# Promote Capability Prompt

Use when: 반복되는 작업을 프롬프트, 워크플로, 템플릿, 도구, 스킬, 에이전트, 프로젝트 기능으로 승격해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Read agent-platform/configs/orchestration/capability-promotion-registry.json before deciding what to create.
Classify the repeated problem as framing, sequence, structure, execution, domain behavior, agent role, or product surface.
Use _ops/prompts/ for repeated framing, _ops/workflows/ for repeated sequence, _templates/ for repeated structure, _tools/ for repeated deterministic execution, _skills/ for repeated Codex behavior, agent-platform/configs/agents/ for reusable agents, and the owning project for project features.
Prefer the smallest useful capability type before creating a heavier asset.
Record observed signals, existing assets checked, rejected lighter options, expected repetition/time reduction, risk tier, validation plan, and rollback or disablement path.
Require human checkpoint before destructive, secret-bearing, install, permission, cost, public-release, security/privacy-sensitive, or irreversible changes.
When promoting to a custom Codex skill, run skill-lifecycle-agent and follow _ops/workflows/37-skill-lifecycle.md.
Document the capability with purpose, when to use it, inputs, outputs, and verification.
Refresh _ops/maps/ when needed and record the promotion reason in history.
```

## Reference

- [_docs/governance/capability-governance.md](../../_docs/governance/capability-governance.md)
- [agent-platform/configs/orchestration/capability-promotion-registry.json](../../agent-platform/configs/orchestration/capability-promotion-registry.json)
- [_ops/workflows/75-capability-promotion.md](../workflows/75-capability-promotion.md)
