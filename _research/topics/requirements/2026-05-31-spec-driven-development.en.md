# Spec-Driven Development Structure

## Question

What artifacts and evaluation criteria are needed to make requirements management resemble spec-driven development?

## Checked Sources

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | open source | 2026-05-31 | Used for specification, plan, tasks, implementation, clarify/analyze/checklist phases. |
| [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/) | official docs | 2026-05-31 | Used for requirements-first/design-first flow, requirements → design → tasks structure, and testable requirements. |
| [IBM: Spec-Driven Development](https://www.ibm.com/think/topics/spec-driven-development) | technical explainer | 2026-05-31 | Used for spec-first, spec-anchored, and spec-as-source distinction. |
| [ReqToCode](https://arxiv.org/abs/2603.13999) | paper | 2026-05-31 | Used for the direction of structurally validating requirements-to-implementation/test traceability. |

## Insights

- A spec-anchored approach fits this repository better than full automated spec-as-source.
- Shared workspace specs belong under `_specs/`; project specs belong under the project `specs/` folder.
- Close-out evaluation should check `spec_targets` in addition to `requirements_targets`.
- The minimum artifact set is `spec`, `plan`, `tasks`, `validation`, and `traceability`.

## Application

- Added `_specs/`.
- Added `spec-driven-planner-agent`.
- Added `spec_targets` to `work-evaluator-agent`.
