# Close Work Prompt

Use when: 구현이나 문서 작업을 마무리할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Review the changes and run available verification commands.
If prompts, workflows, folders, or projects changed, refresh _ops/maps/.
Read the selected work_mode and agent-platform/configs/workflows/work-mode-registry.json.
Record the work summary and verification result in _history/YYYY/YYYY-MM-DD.md when required by the selected mode or useful for future continuation.
Record the public web search reasoning summary in _history/web-searches/YYYY/ with queries, sources, ignored weak sources, plan impact, uncertainty, and related links when required by the selected mode or when search produced reusable insight.
Record the user's request intent summary in _history/user-requests/YYYY/ without preserving full original prompt text by default when required by the selected mode or when the request changes durable state.
Record or update requirements baselines, changes, and reviews under _requirements/ or the owning project's docs/requirements/ when required by the selected mode or when durable behavior changes.
Record or update spec-driven artifacts under _specs/ or the owning project's specs/ when required by the selected mode or when implementation scope is durable.
Record the request-to-outcome trace in _history/request-traces/YYYY/ with request, outcome, artifacts, evaluation, commit, and follow-up status when required by the selected mode.
Record a scan-friendly summary in _history/work-summaries/YYYY/YYYY-MM-DD.ko.md and an English companion for important durable work when required by the selected mode.
Summarize the completed work and check prior related work or strong references.
If internet research produced reusable findings, capture them under _research/ and link them from the relevant docs.
If ship_first mode intentionally deferred non-blocking improvements, update _ops/backlog/deferred-improvements.ko.md or the owning project's equivalent backlog.
If context archiving occurred, create or update _history/context-archives/YYYY/ and include context_archiving_occurred=true plus context_archive_targets in the evaluator input.
If installation, upgrade, removal, or global configuration occurred, update _history/installations/YYYY/ and _ops/installations/registry.json before evaluation.
Use work-evaluator-agent to compare the initial instruction with the result.
If there are gaps or improvements that must be applied, convert them into follow-up actions and rework.
After rework, pass the same evaluation again.
Save the final evaluation as a Markdown file under _history/evaluations/YYYY/.
Include work_mode in the evaluator input.
Include work_summary_targets in the evaluator input.
Include web_search_record_targets in the evaluator input.
Include user_request_summary_targets in the evaluator input.
Include requirements_targets in the evaluator input.
Include spec_targets in the evaluator input.
Include request_trace_targets in the evaluator input.
If ship_first deferred improvements, include deferred_improvement_targets in the evaluator input.
If context archiving occurred, include context_archiving_occurred=true and context_archive_targets in the evaluator input.
If installation occurred, include installation_occurred=true and installation_record_targets in the evaluator input.
Commit the coherent change set and push to origin/main immediately.
In the final response, report the change summary, verification, commit hash, and push state concisely.
```
