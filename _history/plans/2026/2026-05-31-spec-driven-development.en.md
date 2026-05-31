# 2026-05-31 Plan Record: Spec-Driven Development Structure

## Initial Instruction Summary

The user instructed that the requirements management structure should resemble spec-driven development.

## Research

- Ran web search first.
- Checked GitHub Spec Kit, Kiro Feature Specs, IBM spec-driven development, and the ReqToCode paper.
- Decided that a repository-native spec-anchored structure fits this workspace better than full automated spec-as-source.

## Plan

1. Add `_specs/` as the shared spec layer.
2. Record this change as spec, plan, tasks, validation, and traceability artifacts.
3. Add spec-driven policy, prompt, workflow, and templates.
4. Add `spec-driven-planner-agent`.
5. Make `work-evaluator-agent` treat missing `spec_targets` as blocking gaps.
6. Add `REQ-WS-013` to the requirements baseline and record change/review files.
7. Update operating docs, memory bootstrap, history, research, coordination board, and maps.

## Public Decision

Requirements management alone is not enough to call the structure spec-driven. Specs need implementable acceptance criteria plus plan, tasks, validation, and traceability so AI does not implement from single-prompt guesswork.

## Completion Criteria

- `_specs/` and this work's spec artifacts exist.
- Evaluation input requires `spec_targets`.
- Tests and evaluation pass.
- Commit and push complete.
