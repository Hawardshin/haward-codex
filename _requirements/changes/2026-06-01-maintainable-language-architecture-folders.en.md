# Maintainable Language, Architecture, And Folder Decision Requirement Change

## Request Summary

The user asked for source-code work to make language selection easy and maintainable, to treat "best architecture" theory and practitioner opinions as potentially different evidence, and to create folder structures whose purpose and ownership are understandable by inspection.

## Requirement Change

- Add `REQ-WS-022` to the shared requirements baseline.
- Add `language_options`, `selected_language`, and `language_decision_notes` to coding research readiness.
- Separate architecture evidence into `architecture_theory_sources` and `architecture_practitioner_sources`, and require `architecture_tradeoff_notes`.
- Require folder candidates, folder decision rationale, folder semantics, and maintainability rationale through `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, and `maintainability_notes`.

## Evidence

- Spring Boot, Next.js, PyPA, and Go documentation show that structure conventions differ by ecosystem.
- arc42, C4, and SEI provide architecture explanation and review frames.
- Multivocal literature review guidance supports mixing formal/academic sources with practitioner grey literature.
- Stack Overflow, Reddit, GitHub Discussions, and Martin Fowler-style practitioner sources are useful for trade-off discovery but not standalone factual proof.

## Impact

- `coding-research-agent` implementation-readiness criteria are stricter.
- The coding research template, profile, operating prompt, docs, and persistent instructions are updated together.
