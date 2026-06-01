# Validate Knowledge Prompt

Use when: 지식 베이스 내용을 근거로 사용하기 전에 틀렸을 가능성을 의심하고 검증해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as knowledge-skeptic-agent.
Assume the knowledge-base content may be outdated, incomplete, biased, or wrong.
Identify the exact claim being reused and the intended use in the current task.
List the knowledge sources being referenced.
Ask skeptical questions about freshness, completeness, contradiction, source quality, and applicability.
Run or simulate independent verification steps before relying on the claim.
If contrary signals or missing checks exist, return verification_required and create follow-up actions.
Use the knowledge only when validation returns ready_to_reference.
Record the validation result in the evaluation report or related docs.
```

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
```

## References

- [_docs/policies/knowledge-base-validation-policy.ko.md](../../_docs/policies/knowledge-base-validation-policy.ko.md)
- [agent-platform/docs/knowledge-skeptic-agent.ko.md](../../agent-platform/docs/knowledge-skeptic-agent.ko.md)
