# Close Work Prompt

Use when: 구현이나 문서 작업을 마무리할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Review the changes and run available verification commands.
If prompts, workflows, folders, or projects changed, refresh _ops/maps/.
Record the work summary and verification result in _history/YYYY/YYYY-MM-DD.md.
Record the public web search reasoning summary in _history/web-searches/YYYY/ with queries, sources, ignored weak sources, plan impact, uncertainty, and related links.
Record a scan-friendly summary in _history/work-summaries/YYYY/YYYY-MM-DD.ko.md and an English companion for important durable work.
Summarize the completed work and check prior related work or strong references.
If internet research produced reusable findings, capture them under _research/ and link them from the relevant docs.
If context archiving occurred, create or update _history/context-archives/YYYY/ and include context_archiving_occurred=true plus context_archive_targets in the evaluator input.
If installation, upgrade, removal, or global configuration occurred, update _history/installations/YYYY/ and _ops/installations/registry.json before evaluation.
Use work-evaluator-agent to compare the initial instruction with the result.
If there are gaps or improvements that must be applied, convert them into follow-up actions and rework.
After rework, pass the same evaluation again.
Save the final evaluation as a Markdown file under _history/evaluations/YYYY/.
Include work_summary_targets in the evaluator input.
Include web_search_record_targets in the evaluator input.
If context archiving occurred, include context_archiving_occurred=true and context_archive_targets in the evaluator input.
If installation occurred, include installation_occurred=true and installation_record_targets in the evaluator input.
Commit the coherent change set and push to origin/main immediately.
In the final response, report the change summary, verification, commit hash, and push state concisely.
```
