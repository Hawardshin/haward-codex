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
If the final output contains factual claims, require a grounding check from hallucination-guard-agent.
Require work_summary_targets that point to the user-readable summary files under _history/work-summaries/YYYY/.
If installation occurred, require installation_occurred=true and installation_record_targets that point to _history/installations/YYYY/ records.
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
- grounding checks
- work summary targets
- installation occurred
- installation record targets
- known gaps
- improvement ideas

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Reference

- [agent-platform/docs/work-evaluator-agent.md](../../agent-platform/docs/work-evaluator-agent.md)
