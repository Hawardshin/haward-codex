# Knowledge Base Validation Policy

## Purpose

The repository knowledge base will grow over time. Content in `_research`, `_docs`, `_history`, and project docs is useful, but it must not be assumed to be correct. When using knowledge-base content as evidence, `knowledge-skeptic-agent` should question and validate it.

The philosophical basis lives in [_philosophy/agent-operating-philosophy.en.md](../_philosophy/agent-operating-philosophy.en.md). This document turns that philosophy into a knowledge validation policy.

## Default Principles

- Knowledge-base content may be outdated, incomplete, or wrong.
- Record independent verification before using it for important decisions.
- For time-sensitive information, recheck current official or highly reliable sources.
- If contrary signals exist, do not rely on the knowledge until they are resolved.
- Record validation results in evaluation reports or related docs.

## When To Run

- When using a research note as evidence for current work
- When relying on old history or previous decisions
- When making open-source, technical, or architecture decisions
- When reusing documents that summarize external information
- When freshness or correctness is uncertain

## Command

Run from `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
```

## Exit Conditions

- `ready_to_reference`: the knowledge can be used as evidence for the current task.
- `verification_required`: resolve gaps before using the knowledge as evidence.
