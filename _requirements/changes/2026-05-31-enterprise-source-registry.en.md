# Requirement Change: Enterprise Source Registry

## Change Summary

- Added requirement: `REQ-WS-016`
- Source request: `UR-2026-05-31-040`
- Reason: the user instructed that large-company and high-quality site lists should be managed separately.

## Change

Large-company engineering blogs, official research labs, architecture centers, and high-signal independent sources are managed separately in `agent-platform/configs/research/enterprise-source-registry.json`. A human-readable summary lives under `_research/source-lists/`.

## Impact

- Research and coding work can quickly find high-quality source seeds.
- The general source taxonomy stays separate from curated site lists.
- Exact source pages must still be re-checked before using specific claims.
