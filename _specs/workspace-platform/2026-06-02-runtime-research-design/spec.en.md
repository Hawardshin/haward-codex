# Spec: Runtime Research/Design

## Purpose

Implement `REQ-WS-052` so runtime/language choices such as Rust, Go, Tauri, Wails, Electron, Python, and TypeScript/Next.js move from research into design and decision records.

## Requirement

- `REQ-WS-052`

## Behavior

- Language selection does not stop at web search or prior knowledge.
- Separate official docs, ADR/architecture references, open-source implementations, issue/discussion signals, and contrary cases.
- Compare at least two candidate designs for meaningful changes.
- Record accepted or deferred choices as ADR-style decision records.
- Require prototype measurement plans when performance or packaging motivates the choice.

## Change Targets

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_ops/workflows/64-runtime-language-research-design.md`
- `_ops/prompts/94-runtime-language-research-design.md`
- `_templates/runtime-language-decision/`
- `_docs/policies/runtime-language-selection-policy.*.md`
- `_ops/prompts/00-router.md`
- `_ops/index.md`
- Requirements, specs, history, and evaluation records

## Acceptance Criteria

- The registry includes research/design process, decision record contract, and prototype design contract.
- Workflow, prompt, and template exist and can be found from routing docs.
- Config contract and memory bootstrap pass.
- Docs/naming/structure audit and evaluator pass.
