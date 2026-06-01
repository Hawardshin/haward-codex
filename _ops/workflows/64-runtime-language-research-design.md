# Runtime Language Research And Design Workflow

## Purpose

Use this workflow when choosing or changing an implementation language, runtime, desktop framework, local service boundary, native module, or performance-sensitive component design.

## Inputs

- User request or component proposal
- `agent-platform/configs/runtime/language-decision-registry.json`
- `_docs/policies/runtime-language-selection-policy.ko.md`
- Related project requirements/specs
- Current component source, if it exists
- Candidate runtimes such as Python, TypeScript/Next.js, Rust/Tauri, Go/Wails, Electron/Node

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` if durable runtime policy or cross-project architecture changes.
4. Define the component boundary:
   - UI
   - agent logic
   - local service
   - desktop shell
   - native command bridge
   - performance hot path
5. Open `agent-platform/configs/runtime/language-decision-registry.json`.
6. Run research before design:
   - official docs and standards
   - architecture references and ADR/RFC examples
   - maintained open-source implementations
   - issue/discussion/community signals
   - contrary examples and failure reports
7. Design at least two candidate options when blast radius is meaningful.
8. Record an ADR-style decision draft using `_templates/runtime-language-decision/`.
9. If performance or packaging is a reason for change, write a prototype measurement plan before installation or implementation.
10. If dependencies will be installed, run `_ops/workflows/58-installation-record.md` first.
11. Update requirements, specs, traceability, and source provenance.
12. Validate configs, docs, naming, structure, maps, grounding, evaluator, and timing records.

## Output Contract

- component boundary and non-goals
- source list with source type, checked date, impact, and limitations
- candidate runtime designs and trade-offs
- selected option or explicit deferred reason
- ADR/decision record target
- prototype measurement plan with metrics and thresholds
- dependency installation status and audit target if installation occurred
- rollback and revisit triggers

## Rule

Do not accept Rust, Go, Tauri, Wails, Electron, or any compiled-runtime migration because it sounds efficient. Accept it only after research, design, decision recording, and measurement planning show it is the smallest useful boundary.
