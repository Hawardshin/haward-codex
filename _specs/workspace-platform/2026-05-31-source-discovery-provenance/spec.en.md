# Spec: Source Discovery, Provenance, And Korean Local Reviews

## Background

The user requires clear source provenance for source values and evidence-backed plans. They also asked web search to behave more like human research by finding many strong sources, and for Korean user review/local decisions to prioritize Korean channels such as Naver Map, Kakao Map, and Naver Blog/Search.

## Related Requirements

- `REQ-WS-017`
- `REQ-WS-018`
- `REQ-WS-019`

## Scope

- Add provenance/evidence fields to planner and evaluator inputs.
- Add a broad source discovery registry.
- Add a Korean local review candidate scoring tool.
- Add an overlap audit document.
- Update source collection policies, prompts, workflows, and memory bootstrap.

## Acceptance Criteria

- `plan-from-research` is not ready without `source_value_provenance` and `plan_evidence`.
- `complete-coding-research` is not implementation-ready without `source_value_provenance` and `plan_evidence`.
- `evaluate-work` requires `source_provenance_targets` and `plan_evidence_targets`.
- `source-discovery-registry.json` passes the config contract.
- `_tools/korean-local-review/` validates query planning and candidate scoring with tests.
