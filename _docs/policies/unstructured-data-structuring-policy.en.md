# Unstructured Data Structuring Policy

## Purpose

One of AI's important strengths is turning unstructured or semi-structured input into reviewable structure. This platform treats that as more than summarization: messy input should become reusable requirements, specs, tasks, evidence items, tables, JSON, settings files, or evaluation inputs when useful.

## Principles

- Define the target schema before extraction.
- Separate directly extracted values from model interpretation.
- Keep source location, access date, source span, or observation location for material values.
- Do not guess missing values; mark them as `unknown`, `not_provided`, `ambiguous`, or `conflicting`.
- If structured output drives automation or decisions, run schema validation, provenance audit, and sample review.

## Use Path

- Profile: `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- Workflow: `_ops/workflows/67-structure-unstructured-data.md`
- Prompt: `_ops/prompts/98-structure-unstructured-data.md`

## Caution

Structured data can look more trustworthy because it is tidy. A polished table or JSON object is still only an inference unless it has source grounding. This platform checks provenance and validation before using structured output as evidence.
