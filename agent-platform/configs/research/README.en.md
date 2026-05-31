# Research Configs

This folder stores configuration files that make source criteria and reference catalogs explicit for agents.

## Files

- `source-registry.json`: source type taxonomy and reusable reference source catalog
- `enterprise-source-registry.json`: separate seed list of large-company engineering, official research lab, architecture center, and high-signal independent sources
- `source-discovery-registry.json`: broad search-origin registry for global technology blogs, Korean big-tech blogs, India technology sources, paper discovery, and Korean local review channels
- `research-agent-profile.json`: core Perplexity-style answer-engine profile used by the research agent
- `coding-research-profile.json`: default source coverage profile used by `coding-research-agent` before implementation

## Usage Rules

- Coding research input must include `reference_config_paths`.
- General research/planning input must include `research_profile_paths` and should record `research-agent-profile.json` by default.
- At least one path must point to a JSON config under `agent-platform/configs/research/`.
- `source_types` should use the source types defined in `source-registry.json`.
- When enterprise/high-quality sources are used as research starting points, record `enterprise-source-registry.json` in `research_profile_paths` or `reference_config_paths`.
- When broader source discovery, Korean user reviews, Korean technology blogs, India technology sources, or paper discovery sources are useful, check `source-discovery-registry.json`.
- Tie material values and planning constraints to `source_value_provenance` and `plan_evidence`.
- General research should record the `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, and `skeptic_review` stages plus citation requirements.
- Before implementation, record `code_reference_sources` and `code_reference_notes` for open-source structure, reference implementations, real source code, and tests inspected.
- External reference sources should update `last_checked` or be added as new config entries.
- Internal knowledge-base entries should pass `knowledge-skeptic-agent` before use as evidence.
- Shared settings files should include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`.
- After changing settings, run `check-config-contract` to confirm the file explains itself.

## Default Input Example

```json
{
  "research_profile_paths": [
    "agent-platform/configs/research/research-agent-profile.json",
    "agent-platform/configs/research/source-registry.json",
    "agent-platform/configs/research/source-discovery-registry.json"
  ],
  "answer_engine_stages": [
    "query_understanding",
    "search_retrieval",
    "source_ranking",
    "evidence_extraction",
    "synthesis",
    "citation_grounding",
    "skeptic_review"
  ],
  "citation_requirements": [
    "Material factual claims are tied to checked sources."
  ],
  "source_value_provenance": [
    "value or claim <- exact URL/path, access date, extraction note"
  ],
  "plan_evidence": [
    "plan step <- checked source, repository evidence, command output, or explicit assumption"
  ],
  "reference_config_paths": [
    "agent-platform/configs/research/source-registry.json",
    "agent-platform/configs/research/enterprise-source-registry.json",
    "agent-platform/configs/research/coding-research-profile.json"
  ],
  "source_types": [
    "official",
    "open_source",
    "reference_implementation",
    "tech_blog",
    "community"
  ],
  "code_reference_sources": [
    "https://github.com/example/project/tree/main/src",
    "https://github.com/example/project/tree/main/tests"
  ],
  "code_reference_notes": [
    "Repository structure, module boundaries, tests, error handling, and API usage patterns inspected."
  ]
}
```
