# Plan Record: Enterprise Source Registry

## Goal

Create a separate management structure for large-company and high-quality site lists.

## Research-Based Judgment

- Official engineering blogs and research labs are useful reusable seeds for repeated research.
- Mixing all URLs into the general source taxonomy would blur taxonomy and curated-site-list purposes.
- The list is not proof, so freshness, caveats, and `last_checked` need to be explicit fields.

## Execution Plan

1. Create `enterprise-source-registry.json`.
2. Create bilingual summary lists under `_research/source-lists/`.
3. Update source collection policy, research configs, workflows, prompts, and memory bootstrap.
4. Update requirements, spec, request summaries, request traces, work summaries, and evaluation files.
5. Verify JSON, config contract, memory bootstrap, grounding/evaluation, and maps.
6. Commit and push.

## Decisions During Work

- No automatic collector was created; the curated seed list is enough for this request.
- RSS/scoring automation remains a future `_tools/source-collector/` extension candidate if maintenance becomes repetitive.
