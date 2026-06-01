# Spec: Platform Concept And Philosophy Review

## Goal

Review the overall platform concept and operating philosophy, then strengthen missing philosophical axes so future agents do not miss the intent.

## Requirement

- `REQ-WS-036`

## Scope

- `_philosophy/agent-operating-philosophy.ko.md`
- `_philosophy/agent-operating-philosophy.en.md`
- `_philosophy/platform-concept-review.ko.md`
- `_philosophy/platform-concept-review.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/index.md`

## Behavior

- The philosophy document explicitly covers user authority, scoped autonomy, rollback capability, security/privacy, operating cost, and agentic debt.
- The concept review records current concept, well-covered axes, found gaps, and remaining improvement candidates.
- memory bootstrap includes the philosophy document as a required warm anchor.

## Out of Scope

- Implementing a new autonomy-level tool
- Implementing a private data review checklist
- Rewriting every existing workflow
