# Requirement Change: Unstructured Data Structuring

## Request

The user stated that one thing AI does well is structuring unstructured data.

## Change

- Add `REQ-WS-054`.
- Define unstructured/semi-structured input transformation as a shared capability for requirements, specs, tasks, evidence items, tables, JSON, and evaluation inputs.
- Structured outputs must keep schema, source provenance, null/ambiguity handling, and validation notes.

## Applied Paths

- `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- `_docs/policies/unstructured-data-structuring-policy.en.md`
- `_ops/workflows/67-structure-unstructured-data.md`
- `_ops/prompts/98-structure-unstructured-data.md`
- `_philosophy/agent-operating-philosophy.en.md`

## Review Criteria

- Self-documenting config contract
- Memory bootstrap
- Docs/naming/structure audit
- Grounding/evaluation
