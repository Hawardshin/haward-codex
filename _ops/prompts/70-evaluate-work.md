# Evaluate Work Prompt

Use when: 완료된 작업이 초기 사용자 지시와 맞는지, 개선하거나 다시 작업할 부분이 있는지 확인해야 할 때.

## Prompt

```text
Act as work-evaluator-agent.
First summarize the completed work concisely.
Check prior internal work, strong repository examples, official docs, mature open-source projects, or external references.
If an external reference may be time-sensitive, verify current official or highly reliable sources.
Compare the initial instruction, actual result, changed files, and verification results.
Compare the result against strong references and identify what is weaker or missing.
Separate mismatches, missing requirements, and improvement opportunities.
If a mismatch or omission exists, return rework_required and create follow-up actions.
Reflect follow-up actions back into the work, then repeat the evaluation after completion.
Save the final evaluation report as a Markdown file under _history/evaluations/YYYY/.
Return ready_to_close only when there are no blocking gaps.
```

## Inputs

- initial instruction
- result summary
- changed files
- verification results
- references checked
- known gaps
- improvement ideas

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Reference

- [agent-platform/docs/work-evaluator-agent.md](../../agent-platform/docs/work-evaluator-agent.md)
