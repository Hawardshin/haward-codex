# Prompt Common Contract

Every prompt in this folder inherits the following common contract.

## Web Search First

- Every prompt execution starts with web search before planning, repository exploration, or file edits.
- Record the queries, checked sources, weak sources ignored, and insights applied to the plan.
- Meaningful work saves a web search record under `_history/web-searches/YYYY/`.
- If search fails or the latest user instruction explicitly forbids search, record the reason and the stronger local verification used instead.

## Public Decision Summary

- Do not store raw internal chain-of-thought in repository documents.
- Store a public decision summary that the user can verify:
  - what was searched
  - which sources were trusted
  - which sources were excluded
  - how search changed the plan
  - what uncertainty remains

## Close-Out Evaluation

`work-evaluator-agent` input must include `web_search_record_targets` for meaningful work. Missing targets are a blocking gap.

`work-evaluator-agent` input must include `requirements_targets` for meaningful work. Missing targets are a blocking gap.

`work-evaluator-agent` input must include `spec_targets` for meaningful work. Missing targets are a blocking gap.

`work-evaluator-agent` input must include `source_provenance_targets` and `plan_evidence_targets` for meaningful work. Missing source provenance or plan evidence is a blocking gap.

When required by the selected work mode, `work-evaluator-agent` input must include `mode_selection_record_targets` and `omission_check_targets`. Missing mode selection records or required-item coverage is a blocking gap.

If skill work occurred, `work-evaluator-agent` input must include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`. Missing targets are a blocking gap.

`work-evaluator-agent` input must include `request_trace_targets` for meaningful work. Missing targets are a blocking gap.

When required by the selected work mode, `work-evaluator-agent` input must include `timing_summary_targets`. Missing targets are a blocking gap.

For deep research or long-form report work, use `87-deep-research.md` and run `complete-deep-research` before writing the report.
