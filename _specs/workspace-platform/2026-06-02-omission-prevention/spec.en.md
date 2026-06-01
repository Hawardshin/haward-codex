# Omission Prevention Gate Spec

## Background

The user noted that agents can miss something. The current evaluator catches missing target fields, but it did not provide a dedicated item-level coverage gate that compares the user's instruction against artifacts and validation.

## Requirement

- `REQ-WS-056`

## Goals

- Make `omission_check_targets` a required close-out target for non-`quick` work.
- Add `omission-guard-agent` and `check-omissions` CLI validation for required item coverage.
- Update policy, workflow, prompt, persistent instructions, memory bootstrap, and work mode registry.

## Non-Goals

- Do not force the full governance loop on all `quick` tasks.
- Do not store raw internal reasoning.
- Do not turn the checklist into a long narrative retrospective.

## Success Criteria

- `check-omissions` returns gaps for required missing items, evidence-free covered items, and rationale-free deferred/not-applicable items.
- `evaluate-work` returns gaps when the selected mode requires `omission_check_targets` and they are missing.
- `check-work-modes`, `check-memory-bootstrap`, and unit tests pass.
