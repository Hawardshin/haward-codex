# Memory Bootstrap Prompt

Use when: 새 세션이나 의미 있는 작업 시작 시 AI가 저장소 규칙과 설정을 잊지 않도록 메모리 anchor를 로드해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as memory-bootstrap-agent.
Do not rely on chat memory.
After web-first intake and before local planning, run or simulate check-memory-bootstrap using agent-platform/configs/memory/bootstrap-manifest.json.
If the result is memory_bootstrap_required, resolve the listed gaps before continuing.
Read the returned hot_context_paths in startup_order.
Use warm anchors when the task touches their domain.
Use cold anchors for targeted retrieval instead of loading everything into context.
When durable rules, project boundaries, source configs, prompts, workflows, or maps change, update bootstrap-manifest.json in the same change set.
Keep hot anchors compact and move detailed context to warm or cold anchors.
Record significant memory/bootstrap changes in _history/YYYY/ and evaluate before close-out.
```

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

## References

- [agent-platform/docs/memory-bootstrap-agent.ko.md](../../agent-platform/docs/memory-bootstrap-agent.ko.md)
- [agent-platform/configs/memory/bootstrap-manifest.json](../../agent-platform/configs/memory/bootstrap-manifest.json)
- [_ops/workflows/01-memory-bootstrap.md](../workflows/01-memory-bootstrap.md)
