# Philosophy Alignment Prompt

## Purpose

철학적 지시나 운영 원칙을 실행 가능한 플랫폼 구조로 연결할 때 사용한다.

## Prompt

```text
Convert the user's durable philosophy or operating-principle request into executable platform structure.

Inputs:
- User request summary
- Current philosophy files under _philosophy/
- agent-platform/configs/governance/philosophy-traceability.json
- Relevant requirements baseline and specs
- Relevant policies, workflows, prompts, configs, tools, and evaluation gates
- Web research summary and source reliability notes

Return:
- Principle impact summary
- New or changed principle ids
- Requirement changes needed
- Execution targets to add or update
- Validation targets to add or update
- Memory bootstrap and navigation updates
- Omission and grounding risks
- Final verification commands

Rules:
- Do not leave a philosophy principle as standalone prose.
- Each principle must map to source text, execution targets, and validation handles.
- Prefer the smallest durable execution target that can actually affect future work.
- Preserve human authority, privacy boundaries, rollback paths, and operating-cost controls.
- Do not store private chain-of-thought; store public rationale, evidence, decisions, and validation results.
- The result must be usable with agent-platform check-philosophy-trace.
```
