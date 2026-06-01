# Context Archive Workflow

## Purpose

컨텍스트가 길어졌을 때 다음 세션이 채팅 기억 대신 저장소 문서로 바로 재개하도록 압축 아카이브 패킷을 만든다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) and save a web search record.
2. Run [_ops/workflows/01-memory-bootstrap.md](01-memory-bootstrap.md).
3. Identify stable requirements, decisions, changed files, verification results, and remaining tasks.
4. Update the owning project README or docs when project state changed.
5. Create `_history/context-archives/YYYY/YYYY-MM-DD-<slug>.ko.md` from `_templates/context-archive/context-archive.ko.md`.
6. Add an English companion for important durable context.
7. Link the archive packet from `_history/YYYY/YYYY-MM-DD.md`, `_history/work-summaries/YYYY/`, and `_ops/coordination/status.json` when relevant.
8. Do not store raw internal reasoning, unnecessary command logs, or sensitive values.
9. If the packet relies on older repository knowledge, run [_ops/workflows/65-validate-knowledge-reference.md](65-validate-knowledge-reference.md).
10. Run [_ops/workflows/40-evaluate-and-rework.md](40-evaluate-and-rework.md) with `context_archiving_occurred=true` and `context_archive_targets`.
11. Refresh maps and commit/push.

## Resume Rule

When resuming from a context archive, read the latest work summary first, then the archive packet, then only its `Must Read Files`. Retrieve detailed history or commits only when needed.

## References

- [_docs/policies/context-archive-policy.ko.md](../../_docs/policies/context-archive-policy.ko.md)
- [_history/context-archives/README.ko.md](../../_history/context-archives/README.ko.md)
- [_templates/context-archive/context-archive.ko.md](../../_templates/context-archive/context-archive.ko.md)
