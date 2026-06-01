# Deep Research Workflow

## Purpose

특정 상황에서 깊은 조사가 필요할 때, 단일 검색 요약이 아니라 여러 단계의 출처 기반 조사 패키지와 긴 보고서를 만든다.

## Sequence

1. Apply [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before local planning or repository edits.
2. Decide whether this is a deep research situation:
   - detailed report
   - landscape or literature review
   - many source types
   - conflicting evidence
   - quantitative/source provenance
   - durable `_research/` or project report output
3. Use `agent-platform/configs/research/deep-research-profile.json`.
4. Define `research_question`, `report_goal`, `intended_audience`, `trigger_situation`, and `depth_level`.
5. Decompose the question into sub-questions and source lanes.
6. Search at least three channels, including web search. Add official docs, papers, open-source repositories, internal docs, community discussions, datasets, or local/Korean channels as needed.
7. Run at least two research iterations. Each iteration should record what was searched, what changed, and which follow-up questions appeared.
8. Rank sources by authority, recency, relevance, independence, methodology, and claim fit.
9. Record `source_types` using `source-registry.json`.
10. Extract `evidence_items` in claim <- source form.
11. Record `source_quality_notes`, `contradiction_notes`, and `synthesis_notes`.
12. Record `citation_requirements`, `citation_audit_notes`, and `unsupported_or_weak_claims`.
13. If internal knowledge is used, run `knowledge-skeptic-agent` and set `knowledge_validation_status=ready_to_reference`.
14. Create a `report_outline` and choose `report_targets`.
15. Run:

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json
```

16. If the result is `more_research_required`, resolve the gaps before writing the report.
17. If the result is `ready_to_write_report`, write the report under `_research/` or the owning project's docs/research folder.
18. Run `hallucination-guard-agent` before publishing factual claims.

## Rule

Deep research is ready only when it records multi-channel retrieval, repeated research passes, source quality, evidence mapping, contradictions, synthesis, citation audit, weak claims, report outline, and report target.

