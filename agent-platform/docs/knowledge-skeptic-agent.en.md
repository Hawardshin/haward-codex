# Knowledge Skeptic Agent

## Purpose

`knowledge-skeptic-agent` assumes knowledge-base content from `_research`, `_docs`, `_history`, and similar sources may be wrong, incomplete, or outdated, then validates it before reuse.

## Trigger

Run it before relying on:

- old research notes
- previous work history
- internal operating docs
- summarized external docs
- open-source comparison results

## Input

Input template:

```text
agent-platform/configs/evaluation/knowledge-validation-template.json
```

Required fields:

- claim being reused
- intended use in the current task
- knowledge sources checked
- independent verification steps
- skeptic questions
- contrary signals
- freshness notes

## Command

Run from `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
```

## Rules

- Assume knowledge-base content may be outdated, incomplete, or wrong.
- If the result is `verification_required`, resolve the gaps before using that knowledge as evidence.
- For time-sensitive content, recheck current official or highly reliable sources.
