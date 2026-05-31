# Close Work Prompt

Use when: 구현이나 문서 작업을 마무리할 때.

## Prompt

```text
Review the changes and run available verification commands.
If prompts, workflows, folders, or projects changed, refresh _ops/maps/.
Record the work summary and verification result in _history/YYYY/YYYY-MM-DD.md.
Summarize the completed work and check prior related work or strong references.
Use work-evaluator-agent to compare the initial instruction with the result.
If there are gaps or improvements that must be applied, convert them into follow-up actions and rework.
After rework, pass the same evaluation again.
Save the final evaluation as a Markdown file under _history/evaluations/YYYY/.
Commit the coherent change set and push to origin/main immediately.
In the final response, report the change summary, verification, commit hash, and push state concisely.
```
