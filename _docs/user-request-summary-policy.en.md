# User Request Summary Policy

## Purpose

Store summaries of the user's varied prompts and instructions so future work can understand user intent and accumulated operating rules from repository documents, without preserving full original prompt text by default.

## Principles

- Do not store full original request text by default.
- Store meaning, intent type, durability, and implementation location.
- Durable instructions must also be reflected in `_docs/persistent-instructions.*`, `AGENTS.md`, and related operating docs.
- Request summaries live under `_history/user-requests/YYYY/` by date.
- Meaningful work must include `user_request_summary_targets` in evaluation input.
- When using old request summaries for important decisions, run `knowledge-skeptic-agent` for freshness, conflicts, and omissions.

## Request Types

- Platform and repository operating rules
- Project boundary and folder management
- Research, web search, and reference collection
- Coding and agent implementation preferences
- Documentation, history, evaluation, and archive requirements
- Installation, open source, verification, and security
- Single-task requirements for current work

## Related Files

- [_history/user-requests/README.en.md](../_history/user-requests/README.en.md)
- [_templates/user-request-summary/user-request-summary.en.md](../_templates/user-request-summary/user-request-summary.en.md)
- [_docs/persistent-instructions.en.md](persistent-instructions.en.md)
- [_ops/workflows/40-evaluate-and-rework.md](../_ops/workflows/40-evaluate-and-rework.md)
