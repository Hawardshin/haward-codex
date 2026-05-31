# Architecture-First Coding Policy

## Purpose

Source code should express a chosen architecture, not just a local implementation. Before writing code, check proven architecture frameworks, reference architectures, and well-structured open-source layouts, then record the decision basis.

## Durable Rules

- Use `coding-research-agent` before writing source code.
- Start with web search for current external grounding.
- When technologies use different official docs or standards, such as Java/Spring Boot, C, React, or Next.js, record `technology_stack`, `technology_official_docs`, and `stack_version_constraints` separately.
- Record high-signal Stack Overflow, Reddit, GitHub Issues/Discussions, or similar discussions in `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`, but treat them as adoption, problem-discovery, or risk signals rather than proof.
- Compare at least two language/runtime options and record `language_options`, `selected_language`, and `language_decision_notes` with maintainability, ecosystem, tooling, testing, and project-boundary trade-offs.
- Compare at least two architecture options.
- Record architecture frameworks, reference architectures, ADRs, C4/arc42/SEI material, or project `docs/architecture` examples in `architecture_reference_sources`.
- Separate `architecture_theory_sources` from `architecture_practitioner_sources` so formal/framework evidence and practitioner opinions can be reviewed independently.
- Record candidate structures and trade-offs in `architecture_options`.
- Record selected structure, rejected alternatives, module/service boundaries, quality attributes, and validation impact in `architecture_decision_notes`.
- Record theory-vs-practice disagreements, convergence points, and local validation needs in `architecture_tradeoff_notes`.
- Compare at least two folder-structure options and record `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, and `maintainability_notes` with folder meaning and ownership boundaries.
- Record implementation code references separately in `code_reference_sources` and `code_reference_notes`.

## Preferred Reference Categories

| Category | Examples | Used For |
| --- | --- | --- |
| Well-Architected Framework | AWS, Azure, Google Cloud | Quality attributes, operability, security, reliability questions |
| Architecture Documentation | C4, arc42, SEI Views and Beyond | Making structure explainable and reviewable |
| Reference Architecture | Official reference architecture, mature project architecture docs | Comparing structure candidates and boundaries |
| Source Architecture | Maintained open-source `src/`, `tests/`, `docs/architecture` | Checking real code boundaries and tests |
| ADR | Architecture decision record | Tracking decision rationale and alternatives |
| Technology Official Docs | Spring Boot reference, React docs, Next.js docs, ISO C standard | Aligning structure with API, runtime, and standard differences |
| Issue/Discussion Signals | Stack Overflow, Reddit, GitHub Issues/Discussions | Finding repeated problems, migration risks, and practical edge cases |
| Language/Runtime Structure Docs | PyPA src layout, Go module layout, Spring Boot structuring code, Next.js project structure | Comparing language-specific maintainable package/folder conventions |
| Practitioner Opinion | Martin Fowler, high-signal Q&A, Reddit/GitHub discussions | Finding practical trade-offs and friction that theory may understate |

## Prohibitions

- Do not implement from a single document or example.
- Do not treat popularity, stars, or likes as architectural correctness.
- Do not treat practitioner opinion as standalone factual proof.
- Do not copy a reference architecture directly.
- Do not introduce a structure that does not fit local scope, data flow, operational complexity, or testability.

## Verification

- `complete-coding-research` treats missing language selection, theory/practitioner architecture evidence, folder options, folder semantics, and maintainability rationale as gaps.
- Post-implementation validation should check the selected architecture's boundaries, error handling, integration points, and regression risks.
