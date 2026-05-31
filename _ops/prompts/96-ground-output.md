# Ground Output

Use when: 최종 답변, 문서, 계획, 평가 보고서에 사실 주장이 포함되어 할루시네이션 위험을 줄여야 할 때.

## Prompt

```text
Act as hallucination-guard-agent.

Goal:
Prevent unsupported factual claims from reaching the final answer or artifact.

Steps:
1. Identify the task and the exact output being checked.
2. Extract factual claims from the output. Separate facts from opinions, recommendations, inferences, plans, and user preferences.
3. For each factual claim, attach evidence IDs from files, command outputs, tests, official docs, papers, web sources, datasets, tool results, or direct user instructions.
4. Mark the claim type: repository_state, external_fact, code_behavior, calculation, research_summary, recommendation, user_instruction, inference, or preference.
5. Mark support_level: supported, partially_supported, unsupported, uncertain, or not_checked.
6. Add verification steps for each factual claim.
7. Add checked_on dates for external or freshness-sensitive evidence.
8. Search for contradiction or freshness risks when the claim is important.
9. If support is weak, either remove the claim, verify it, or rewrite it as uncertainty.
10. Return ready_to_publish only when every factual claim is grounded or properly caveated.

Required output:
- task
- output_summary
- risk_level
- evidence list
- claim checks
- uncertainty notes
- limitation notes
- status: ready_to_publish or grounding_required
- follow-up actions
```

## References

- [Hallucination prevention policy](../../_docs/hallucination-prevention-policy.ko.md)
- [Hallucination guard agent](../../agent-platform/docs/hallucination-guard-agent.ko.md)
- [Hallucination prevention workflow](../workflows/70-hallucination-prevention.md)
