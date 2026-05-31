# Spec: Architecture-First Coding

## Background

The user instructed that source-code work should naturally look for the best architecture. Existing coding research required open-source code references, but did not separately enforce architecture option comparison and decision rationale as readiness conditions.

## Goals

- Check architecture references before writing source code.
- Compare at least two architecture options.
- Record selected structure, rejected alternatives, boundaries, quality attributes, and validation impact.
- Make `complete-coding-research` block implementation when these fields are missing.

## Scope

- `coding-research-agent` readiness checker
- Coding research settings, templates, and docs
- Source registry and coding research profile
- Persistent instructions, workflow, and prompt
- Requirements, history, and evaluation artifacts

## Non-Scope

- Selecting a product architecture for a specific project
- Installing external architecture tools
- Automatic C4/arc42 artifact generation

## Success Criteria

- `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes` are added to coding research input.
- Readiness checker returns gaps when architecture fields are missing.
- Related policy and history documents exist in Korean and English.

