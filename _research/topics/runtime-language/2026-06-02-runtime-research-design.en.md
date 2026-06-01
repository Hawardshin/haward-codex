# Runtime Research/Design Process Research

## Question

How should runtime choices such as Rust, Go, Tauri, Wails, and Electron be researched and recorded as design decisions?

## Judgment

Runtime selection is an architecture decision, not a simple technology comparison. It should include official-doc research, candidate architecture design, decision records, and prototype measurement plans.

## Evidence

- ADR references provide a way to record important architecture decisions with context and consequences.
- Thoughtworks describes lightweight ADRs as useful for future maintainers and oversight.
- Google Cloud architecture framework describes architecture documentation as support for future design decisions.

## Applied Structure

1. Define the problem and component boundary.
2. Separate official docs, ADR/architecture references, open-source implementations, issue/discussion signals, and contrary cases.
3. Compare at least two candidate designs.
4. Write an ADR-style decision record.
5. If performance or packaging motivates the choice, write a prototype measurement plan.
6. If installation is needed, create the installation audit record first.

## Applied Files

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_ops/workflows/64-runtime-language-research-design.md`
- `_ops/prompts/94-runtime-language-research-design.md`
- `_templates/runtime-language-decision/runtime-language-decision.en.md`
