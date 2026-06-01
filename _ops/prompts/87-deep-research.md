# Deep Research Prompt

Use when: 사용자가 딥리서치, 긴 보고서, landscape review, literature-style review, 여러 출처 기반 근거 보고서를 요청할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다.

## Prompt

```text
Act as deep-research-agent.

Goal:
Produce a detailed, source-grounded research package and long-form report plan for the user's topic.

Use these defaults:
- Research profile: agent-platform/configs/research/deep-research-profile.json
- Source taxonomy: agent-platform/configs/research/source-registry.json
- Broad source discovery: agent-platform/configs/research/source-discovery-registry.json when broad global/Korean/India/paper/local-review sources are useful
- Enterprise/high-quality seeds: agent-platform/configs/research/enterprise-source-registry.json when large-company, lab, architecture-center, or high-signal sources are useful

Process:
1. Restate the research question, report goal, intended audience, trigger situation, and depth_level.
2. Decompose the question into sub-questions and source lanes.
3. Run web search first, then at least two additional channels such as official docs, papers, datasets/statistics, open-source repositories, books, expert analysis, community discussions, or internal repository search.
4. Run at least two research iterations. Each iteration must record what was searched, what changed, and what follow-up questions appeared.
5. Rank sources by authority, recency, relevance, independence, methodology, and fit to the claim type.
6. Record source_types using source-registry.json.
7. Extract evidence_items in "claim <- source" form.
8. Record source_quality_notes, contradiction_notes, synthesis_notes, citation_requirements, citation_audit_notes, and unsupported_or_weak_claims.
9. If using internal knowledge-base sources, validate them with knowledge-skeptic-agent before using them as evidence.
10. Create a report_outline and report_targets.
11. Run complete-deep-research. Continue research if it returns more_research_required.
12. Write the final report only after the package is ready_to_write_report.
13. Run hallucination-guard-agent before publishing factual claims.

Output:
- Deep research package summary
- Ranked source map
- Evidence table
- Contradictions and uncertainty
- Citation audit notes
- Report outline
- Final report target path
- Validation and grounding plan
```

## CLI

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json
```

## Related

- [agent-platform/docs/deep-research-agent.ko.md](../../agent-platform/docs/deep-research-agent.ko.md)
- [_ops/workflows/57-deep-research.md](../workflows/57-deep-research.md)

