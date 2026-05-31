# Research Note: Source Discovery And Korean Local Reviews

## Summary

Better web search means choosing task-specific source origins and evaluating candidate page quality, not only reading generic search results. Korean user review/local-market decisions should prioritize Naver Map, Kakao Map, Naver Blog/Search, and official pages; map/blog reviews are user-experience signals.

## Implemented Structure

- `agent-platform/configs/research/source-discovery-registry.json`
- `_research/source-lists/korean-local-review-sources.en.md`
- `_tools/korean-local-review/`
- `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`
- `_research/overlap-audits/2026-05-31-source-discovery-overlap.en.md`

## Reusable Rules

- Technical decisions: official docs, papers, global tech blogs, open source, community/contrary sources.
- Korean user review/local research: official page, Naver Map, Naver Blog/Search, Kakao Map, Korean community/news.
- Paper-backed evidence: combine Semantic Scholar, OpenAlex, arXiv, Papers with Code, and related-paper search.
