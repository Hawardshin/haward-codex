# Capture Research Prompt

Use when: 인터넷 조사나 외부 레퍼런스 확인에서 다음에도 참고할 가치가 있는 내용을 문서화해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Review the sources used for the task.
When broader source discovery is useful, check agent-platform/configs/research/source-discovery-registry.json for global engineering blogs, Korean big-tech blogs, India technology sources, paper discovery sources, and Korean local review channels.
For Korean user-facing review or local-market decisions, capture Naver Map, Kakao Map, Naver Blog/Search, official pages, and _tools/korean-local-review/ scoring outputs when applicable.
Identify findings that are likely to be useful again, influence a decision, or support evaluator references_checked.
Create or update a research note under _research/topics/<topic>/ using the bilingual research-note template when the finding is durable.
Record source URLs, access date, key summary, derived insights, planning impact, reliability, applicability, and related work.
Record material source values, review signals, assumptions, and planning constraints in source_value_provenance; record why the plan followed from evidence in plan_evidence.
Avoid copying long source text; summarize and use only short necessary quotes.
Update _research/index.ko.md and _research/index.en.md when adding a new topic note.
Link the research note from related project docs, evaluation reports, or history when useful.
```

## References

- [_docs/policies/research-capture-policy.ko.md](../../_docs/policies/research-capture-policy.ko.md)
- [_research/README.ko.md](../../_research/README.ko.md)
