# Promote Capability Prompt

Use when: 반복되는 작업을 스킬, 도구, 템플릿, HTML 산출물 패턴으로 승격해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Classify the repeated problem as structure, execution, or judgment.
Use _templates/ for repeated structure, _tools/ for repeated execution, and _skills/ or _ops/prompts/ for repeated judgment.
When promoting to a custom Codex skill, run skill-lifecycle-agent and follow _ops/workflows/37-skill-lifecycle.md.
Document the capability with purpose, when to use it, inputs, outputs, and verification.
Refresh _ops/maps/ when needed and record the promotion reason in history.
```

## Reference

- [_docs/governance/capability-governance.md](../../_docs/governance/capability-governance.md)
