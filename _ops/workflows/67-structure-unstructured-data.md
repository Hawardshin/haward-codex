# Structure Unstructured Data Workflow

## Purpose

Use this workflow when messy notes, chat history, documents, reviews, research sources, logs, transcripts, screenshots, or mixed-format inputs should become structured records that can be reviewed, validated, reused, or automated.

## Inputs

- User request or source bundle
- `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- `_docs/policies/unstructured-data-structuring-policy.ko.md`
- Target consumer such as requirements, specs, research notes, dashboard snapshot, JSON config, report, or table

## Sequence

1. Run web-first intake when the task introduces new facts, tools, or source claims.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when structuring changes shared platform rules or durable schemas.
4. Inventory the source inputs and identify source IDs.
5. Choose the target structure before extraction.
6. Define required fields, nullable fields, allowed values, and provenance fields.
7. Segment the source into extractable chunks.
8. Extract candidate values without inventing missing values.
9. Normalize dates, units, names, and categories while preserving original values when material.
10. Mark ambiguity, conflict, unsupported inference, and missing values explicitly.
11. Attach provenance to each material record or field.
12. Validate schema conformance, source grounding, duplicate records, and downstream consumer assumptions.
13. Publish the structured artifact and link it from history, requirements, specs, or project docs when durable.

## Output Contract

- Source inventory
- Target schema
- Structured records
- Provenance map
- Validation notes
- Known ambiguity or conflict notes
- Downstream consumer or reuse target

## Rule

AI is useful here because it can transform messy input into structure. The structure becomes trustworthy only after schema, provenance, and validation are explicit.
