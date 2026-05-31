# Close Work Prompt

Use when: 구현이나 문서 작업을 마무리할 때.

## Prompt

```text
Review the changes and run available verification commands.
If prompts, workflows, folders, or projects changed, refresh _ops/maps/.
Record the work summary and verification result in _history/YYYY/YYYY-MM-DD.md.
Record a scan-friendly summary in _history/work-summaries/YYYY/YYYY-MM-DD.ko.md and an English companion for important durable work.
Summarize the completed work and check prior related work or strong references.
If internet research produced reusable findings, capture them under _research/ and link them from the relevant docs.
If installation, upgrade, removal, or global configuration occurred, update _history/installations/YYYY/ and _ops/installations/registry.json before evaluation.
Use work-evaluator-agent to compare the initial instruction with the result.
If there are gaps or improvements that must be applied, convert them into follow-up actions and rework.
After rework, pass the same evaluation again.
Save the final evaluation as a Markdown file under _history/evaluations/YYYY/.
Include work_summary_targets in the evaluator input.
If installation occurred, include installation_occurred=true and installation_record_targets in the evaluator input.
Commit the coherent change set and push to origin/main immediately.
In the final response, report the change summary, verification, commit hash, and push state concisely.
```
