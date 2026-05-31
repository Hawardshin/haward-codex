# Overlap Audit: Source Discovery And Review Research

## Purpose

This audit identifies repeated or overlapping structures across the current workspace and defines the source of truth for each area.

## Findings

| Area | Overlapping Files | Judgment | Rule |
| --- | --- | --- | --- |
| Source type taxonomy | `source-registry.json`, source collection policy, source collector | Intentional overlap | `source-registry.json` is the taxonomy source of truth; policy explains use; tools execute scoring |
| High-quality site lists | `enterprise-source-registry.json`, `enterprise-high-quality-sites.*.md`, `source-discovery-registry.json` | Partial overlap | `enterprise-source-registry.json` is the enterprise/high-quality seed list; `source-discovery-registry.json` is broader search origins; Markdown is human-readable summary |
| Research planning records | web search records, plan history, research notes | Layered | web search records the search act, plan history records decision process, research notes store reusable knowledge |
| Evaluation/validation | evaluation files, validation specs, request traces | Layered | spec validation records command results, evaluation checks instruction alignment, request trace links request to outcome |
| Work summaries | detailed history, work summary, request trace, dashboard | Some repetition | detailed history is long-form log, work summary is quick human summary, request trace is request-indexed tracking |
| Korean review research | source collector, Korean local review tool | Needs separation | general source bundles use source collector; Korean local review scoring uses Korean local review tool |

## Conclusion

- Most overlap is intentional layering, not accidental duplication.
- The risk is maintaining the same list as truth in multiple places.
- Future source additions should go into JSON registries first; Markdown source lists are summaries.
- Korean user review/local research and general technical research should keep separate tools and scoring criteria.

## Improvement Rule

- When a new registry is added, state its source-of-truth boundary.
- When JSON and Markdown both contain data, JSON is the source and Markdown is a readable summary.
- Evaluation reports should connect evidence through `source_provenance_targets` and `plan_evidence_targets`.
