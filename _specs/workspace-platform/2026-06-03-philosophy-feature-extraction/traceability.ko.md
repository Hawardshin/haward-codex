# Traceability: 철학 기반 기능 추출 구조

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PHIL-FEAT-001 | `philosophy-feature-extraction-registry.json`의 `required_principle_ids`, `principle_feature_flows` | `check-philosophy-features` |
| REQ-PHIL-FEAT-002 | `feature_candidate_contract`, `seed_feature_candidates`, `philosophy_features.py` | `tests/test_philosophy_features.py` |
| REQ-PHIL-FEAT-003 | `allowed_asset_types`, `smallest_asset_type`, `_ops/workflows/79...` | registry checker, prompt/workflow review |
| REQ-PHIL-FEAT-004 | `_ops/prompts/00-router.md`, memory bootstrap, philosophy traceability | `check-memory-bootstrap`, `check-philosophy-trace` |
| REQ-PHIL-FEAT-005 | `collectPhilosophyFeatureExtraction`, `PhilosophyFeatureFactoryPanel`, CSS | `npm --prefix workspace-monitor test/check/build` |
