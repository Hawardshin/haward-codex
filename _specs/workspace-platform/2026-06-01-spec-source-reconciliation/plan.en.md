# Implementation Plan

## Work Mode

- Selected mode: `standard`
- Reason: the change updates durable workflow, CLI, notification events, memory anchors, and the requirements baseline.

## Evidence

- ISO/IEC/IEEE 29148 provides requirements engineering processes and information-item guidance across the lifecycle.
- IBM traceability guidance describes requirement links to development/test artifacts and change impact analysis.
- Existing repository policy requires meaningful implementation work to use spec-driven artifacts and traceability.

## Steps

1. Inspect the existing spec-driven workflow, prompt router, notification config, and CLI structure.
2. Add a spec/source reconciliation input template and deterministic checker.
3. Wire the CLI subcommand and agent config.
4. Add `clarification_needed` to notification routing.
5. Update workflow, prompt, docs, and memory anchors.
6. Write requirements, spec artifacts, history, and evaluation records.
7. Run unit tests plus config, memory, and workspace checks.
8. Commit and push the change.

## Risks And Mitigations

- Risk: the new workflow slows down every task.
- Mitigation: use it only when a spec is ambiguous or differs from source/tests/artifacts.

- Risk: clarification questions are too abstract to answer.
- Mitigation: require stable question IDs, options, answer format, and decision impact.
