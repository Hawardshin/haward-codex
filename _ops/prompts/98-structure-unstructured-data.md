# Structure Unstructured Data Prompt

Use when: messy notes, documents, reviews, research results, transcripts, logs, screenshots, or chat history should become structured data.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as unstructured-to-structured data work, not as free-form summarization.

Read:
- agent-platform/configs/usage/unstructured-data-structuring-profile.json
- _docs/policies/unstructured-data-structuring-policy.ko.md
- _ops/workflows/67-structure-unstructured-data.md

First identify:
- source inputs and source IDs
- target consumer
- target structure
- required fields
- nullable fields
- provenance fields
- validation checks

Then transform the input:
- segment source material
- extract candidate values
- preserve original values when normalization occurs
- separate extracted facts from interpretation or classification
- mark unknown, missing, ambiguous, conflicting, and inferred fields explicitly
- attach source location or evidence for each material value
- validate schema conformance and source grounding

Return:
- source inventory
- target schema
- structured records
- provenance map
- validation notes
- ambiguity and conflict notes
- downstream reuse target

Do not invent values to make the schema look complete. Missing or uncertain fields are valid structured outputs when they are labeled honestly.
```

## Checklist

- `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- `_docs/policies/unstructured-data-structuring-policy.ko.md`
- `_ops/workflows/67-structure-unstructured-data.md`
- source provenance
- validation notes
