# CLI Pipeline Orchestration Workflow

## Purpose

Use this workflow when one action should run several CLI processes, connect streams with pipes, exchange files or artifacts, fan out work and merge results, or embed multi-CLI orchestration in a desktop shell, monitor, local daemon, or agent workflow.

## Inputs

- User request or feature proposal
- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `_docs/policies/cli-adapter-policy.ko.md`
- `_ops/workflows/66-cli-adapter-integration.md`
- Candidate CLI official docs and security guidance
- Candidate file, stream, temp-file, and path traversal guidance when any handoff touches files or artifacts

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when CLI orchestration changes platform behavior or evaluator gates.
4. Classify each CLI as an adapter-backed process node:
   - `process_id`
   - `adapter_id`
   - `command`
   - `args`
   - `cwd`
   - `env_keys`
   - `timeout_seconds`
   - `max_output_bytes`
5. Model every stream connection as an explicit pipe edge:
   - `pipe_id`
   - `from_process`
   - `from_stream`
   - `to_process`
   - `to_stream`
   - `mode`
6. When a pipe uses `mode=file` or `mode=artifact`, model the handoff as an explicit artifact:
   - `artifact_id`
   - `kind`
   - workspace-relative `path`
   - `produced_by`
   - `consumed_by`
   - `max_bytes`
   - `format`
   - `cleanup_policy` for temp/cache artifacts
   - `retention_policy` for retained outputs/logs/reports
   - `provenance`
   - `validation`
7. Reject artifact paths with absolute paths, drive prefixes, backslashes, `~`, or `..`.
8. Keep `shell_allowed=false` by default. Do not hide `|`, `;`, redirects, chained execution, or file redirection inside command strings unless a separate injection/path review exists.
9. Define safety controls:
   - adapter allowlist
   - argv arguments
   - explicit cwd boundary
   - environment allowlist
   - secret redaction
   - output redaction
   - permission scope
   - fallback behavior
   - audit logging
10. Define resource controls:
   - timeout policy
   - max output bytes
   - cancellation policy
   - cleanup policy
   - orphan-process policy
   - backpressure policy
11. Define merge strategy for fan-out/fan-in work.
12. Record source provenance and plan evidence.
13. Save a task-specific pipeline input under `_history/evaluations/YYYY/` or the owning project history area.
14. Run:

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline <pipeline-input.json>
```

15. If the pipeline actually changes runtime risk, file handles, temp files, caches, or long-running subprocesses, also run `_ops/workflows/69-resource-leak-prevention.md`.
16. Set `cli_pipeline_occurred=true` and include `cli_pipeline_targets` in the final work-evaluator input.

## Output Contract

- Process graph record
- Explicit pipe edge record
- Explicit artifact handoff record when files, directories, temp files, logs, caches, or reports are involved
- Adapter allowlist and shell policy
- Safety controls and resource controls
- Merge strategy
- Source provenance and plan evidence
- Verification command/result
- Rollback or manual fallback path

## Rule

Do not design multi-CLI orchestration as a single shell string. The platform should understand and validate the graph it is about to run.
