# Runtime Language Research And Design Prompt

Use when: Rust, Go, Tauri, Wails, Electron, Python, TypeScript/Next.js, native modules, local daemons, desktop shells, or performance-sensitive runtime choices need research and design before implementation.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as runtime/language research and design before implementation.

Read:
- agent-platform/configs/runtime/language-decision-registry.json
- _docs/policies/runtime-language-selection-policy.ko.md
- _ops/workflows/64-runtime-language-research-design.md
- _templates/runtime-language-decision/runtime-language-decision.ko.md

First classify the component boundary:
- UI
- agent logic
- local service
- desktop shell
- native command bridge
- performance hot path

Research before design:
- official docs and standards for each candidate runtime
- architecture references or ADR/RFC guidance
- maintained open-source implementations
- high-signal issues, discussions, and community risk/adoption signals
- contrary examples, failure cases, and migration risks

Design at least two options when the decision has meaningful blast radius.
For each option, record:
- architecture shape
- process/data/security boundaries
- dependency and packaging impact
- maintenance cost
- test and release gates
- rollback path

Return:
- component boundary and non-goals
- source list with checked dates and reliability notes
- candidate designs and trade-offs
- selected option or deferred reason
- ADR/decision record target
- prototype measurement plan with metrics, fixture/dataset, commands, thresholds, and result target
- dependency installation status
- installation audit target if installation occurred
- rollback and revisit triggers

Do not install Rust, Go, Tauri, Wails, Electron, or other runtime dependencies until installation audit planning exists.
Do not accept a runtime change without measured bottleneck or explicit non-performance rationale.
```

## Checklist

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_docs/policies/runtime-language-selection-policy.ko.md`
- `_ops/workflows/64-runtime-language-research-design.md`
- `_templates/runtime-language-decision/runtime-language-decision.ko.md`
- `_history/web-searches/YYYY/`
- `_history/plans/YYYY/`
- project or shared requirements/specs
