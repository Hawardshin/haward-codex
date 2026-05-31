# Architecture-First Coding Policy

## Purpose

Source code should express a chosen architecture, not just a local implementation. Before writing code, check proven architecture frameworks, reference architectures, and well-structured open-source layouts, then record the decision basis.

## Durable Rules

- Use `coding-research-agent` before writing source code.
- Start with web search for current external grounding.
- Compare at least two architecture options.
- Record architecture frameworks, reference architectures, ADRs, C4/arc42/SEI material, or project `docs/architecture` examples in `architecture_reference_sources`.
- Record candidate structures and trade-offs in `architecture_options`.
- Record selected structure, rejected alternatives, module/service boundaries, quality attributes, and validation impact in `architecture_decision_notes`.
- Record implementation code references separately in `code_reference_sources` and `code_reference_notes`.

## Preferred Reference Categories

| Category | Examples | Used For |
| --- | --- | --- |
| Well-Architected Framework | AWS, Azure, Google Cloud | Quality attributes, operability, security, reliability questions |
| Architecture Documentation | C4, arc42, SEI Views and Beyond | Making structure explainable and reviewable |
| Reference Architecture | Official reference architecture, mature project architecture docs | Comparing structure candidates and boundaries |
| Source Architecture | Maintained open-source `src/`, `tests/`, `docs/architecture` | Checking real code boundaries and tests |
| ADR | Architecture decision record | Tracking decision rationale and alternatives |

## Prohibitions

- Do not implement from a single document or example.
- Do not treat popularity, stars, or likes as architectural correctness.
- Do not copy a reference architecture directly.
- Do not introduce a structure that does not fit local scope, data flow, operational complexity, or testability.

## Verification

- `complete-coding-research` treats missing `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes` as gaps.
- Post-implementation validation should check the selected architecture's boundaries, error handling, integration points, and regression risks.

