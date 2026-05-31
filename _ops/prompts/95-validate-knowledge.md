# Validate Knowledge Prompt

Use when: 지식 베이스 내용을 근거로 사용하기 전에 틀렸을 가능성을 의심하고 검증해야 할 때.

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

- [_docs/knowledge-base-validation-policy.ko.md](../../_docs/knowledge-base-validation-policy.ko.md)
- [agent-platform/docs/knowledge-skeptic-agent.ko.md](../../agent-platform/docs/knowledge-skeptic-agent.ko.md)
