# CLI Pipeline Orchestration Prompt

Use when: one user action needs to run several CLI processes, connect stdout/stderr/stdin pipes, exchange files or artifacts, fan out work and merge results, or embed multi-CLI orchestration in a desktop shell, monitor, local daemon, or agent workflow.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as CLI pipeline orchestration, not as a shell command string.

Read:
- agent-platform/configs/integrations/cli-adapter-registry.json
- agent-platform/configs/integrations/cli-pipeline-template.json
- _docs/policies/cli-adapter-policy.ko.md
- _ops/workflows/66-cli-adapter-integration.md
- _ops/workflows/71-cli-pipeline-orchestration.md

Research before design:
- official process/pipe documentation for the implementation runtime
- official file-system, stream, and temp-file documentation for the implementation runtime when any handoff touches files or artifacts
- command execution and injection-prevention guidance
- path traversal and workspace-boundary guidance when paths are generated or consumed
- official docs for every CLI adapter involved
- issue/discussion signals when process behavior, portability, or output format is uncertain
- fallback/manual workflows

Return:
- process graph with process_id, adapter_id, command, args, cwd, env_keys, timeout_seconds, max_output_bytes
- explicit pipe edges with from_process/from_stream/to_process/to_stream/mode
- explicit artifact handoffs for file/artifact modes with artifact_id, kind, workspace-relative path, produced_by, consumed_by, max_bytes, format, cleanup/retention policy, provenance, and validation
- shell policy and argv policy
- adapter allowlist
- safety controls
- resource controls
- fan-in merge strategy
- source provenance and plan evidence
- verification command and expected result
- rollback/manual fallback plan

Run or prepare:
- PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline <pipeline-input.json>

If multi-process CLI orchestration occurred, set cli_pipeline_occurred=true and include cli_pipeline_targets in work-evaluator input.
Do not hide pipes, redirects, command chaining, file paths, or temp artifacts inside shell strings unless a separate security/path review and escaping plan exists.
```

## Checklist

- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/docs/cli-pipeline-agent.ko.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_history/web-searches/YYYY/`
- `_history/evaluations/YYYY/*cli-pipeline*.json`
- final `evaluate-work` input with `cli_pipeline_occurred=true` and `cli_pipeline_targets`
