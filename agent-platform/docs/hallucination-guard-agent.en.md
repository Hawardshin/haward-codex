# Hallucination Guard Agent

`hallucination-guard-agent` extracts factual claims from answers, documents, plans, and evaluation reports, then checks whether each claim is grounded.

## Purpose

- Keep unsupported factual claims, dates, numbers, file states, and external facts out of final outputs.
- Mark incomplete evidence as uncertainty instead of presenting it as fact.
- Record source and access date when freshness or external facts matter.

## When To Run

- Before final answers that contain factual claims
- Before creating operating rules, plans, evaluation reports, or research notes
- Before citing external material, current information, file state, or test results
- Before high-risk decisions or durable rules

## Input

- `task`: work being checked
- `output_summary`: summary of the output
- `risk_level`: `low`, `medium`, or `high`
- `evidence`: files, command outputs, test results, official docs, papers, web sources, or tool results
- `claims`: factual claims extracted from the output
- `uncertainty_notes`: how uncertainty should be represented in the final output
- `limitation_notes`: verification scope that was not covered

## Output

- `ready_to_publish`: factual claims are sufficiently grounded.
- `grounding_required`: add evidence, remove a claim, verify with tools, or caveat uncertainty before publishing.

## Rules

- Factual claims need evidence IDs and verification steps.
- External facts need external evidence such as official docs, papers, web sources, or datasets.
- Repository state and code behavior need file, command, test, or tool evidence.
- Freshness-sensitive claims need dated evidence.
- High-risk outputs require at least two independent non-inference evidence sources.
- Unsupported claims must not be presented as facts.

## Command

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-grounding configs/evaluation/hallucination-guard-template.json
```

## Related Files

- `agent-platform/configs/agents/hallucination-guard-agent.json`
- `agent-platform/configs/evaluation/hallucination-guard-template.json`
- `agent-platform/src/agent_platform/evaluation/hallucination_guard.py`
- `_ops/prompts/96-ground-output.md`
- `_ops/workflows/70-hallucination-prevention.md`
