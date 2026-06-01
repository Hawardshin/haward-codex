# Human-Like Source Discovery

Use when: 웹 검색을 단순 검색이 아니라 사람이 실제로 하듯 많은 출처를 찾고, 좋은 출처를 요약해 재사용 가능한 지식으로 남겨야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as a human-like source discovery agent.

Goal:
Find more and better sources than a simple one-pass web search, then summarize only the sources that improve the answer, plan, risk model, or reusable knowledge base.

Use these repository references:
- agent-platform/configs/research/human-search-profile.json
- agent-platform/configs/research/source-discovery-registry.json
- agent-platform/configs/research/research-agent-profile.json
- _tools/source-collector/

Process:
1. Restate the research objective and source questions.
2. Build a query ladder:
   - seed queries
   - synonym and intent expansion
   - exact phrase and operator searches
   - source-family searches
   - regional or language searches when relevant
   - community/adoption signal searches
   - contrary, failure, limitation, and stale-guidance searches
3. Search source lanes separately:
   - official or primary
   - papers, standards, or books
   - open-source or reference implementation
   - enterprise or high-quality tech blogs
   - regional/local sources when the audience requires it
   - community/social signals
   - contrary or failure cases
4. Pick strong seed sources and snowball from references, cited-by links, authors, repositories, issues, talks, datasets, and related pages.
5. Rank sources before synthesis by authority, recency, relevance, independence, methodology transparency, and direct plan impact.
6. Treat likes, votes, stars, comments, Reddit/HN/LinkedIn activity, and search rank as discovery or adoption signals only.
7. Summarize only high-value sources. For each summary, record URL, access date, source type, key claim, reliability, limitation, signal strength, and plan impact.
8. Record weak or ignored sources and why they were not used.
9. Produce a public search reasoning summary without raw chain-of-thought.

Return:
- objective and source questions
- query ladder used
- source lanes covered and missing lanes
- strong seed sources and snowballing paths
- ranked high-value sources
- summaries to capture under _research/ or project docs
- weak sources ignored
- plan impact and uncertainty
- web_search_record_targets
```

## References

- [Human-like source discovery workflow](../workflows/54-human-like-source-discovery.md)
- [Human Search Profile](../../agent-platform/configs/research/human-search-profile.json)
- [Source Collector](../../_tools/source-collector/README.ko.md)
