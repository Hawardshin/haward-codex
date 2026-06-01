# 2026-05-31 Web Search Record: Spec-Driven Development Structure

## User Instruction Summary

The user instructed that the requirements management structure should resemble spec-driven development.

## Search Execution

- Search date: 2026-05-31
- Queries:
  - `spec driven development workflow requirements specification tasks implementation validation best practices`
  - `GitHub Spec Kit spec driven development specifications plan tasks constitution`
  - `AWS Kiro spec driven development requirements design tasks workflow`
  - `requirements specification driven development traceability implementation validation best practices`
- Search tool: Codex web search

## Checked Sources

| Source | Type | Checked | Why Used |
| --- | --- | --- | --- |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | open source | 2026-05-31 | Used for spec-driven phases and artifacts such as constitution, specify, plan, tasks, implement, clarify/analyze/checklist. |
| [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/) | official product docs | 2026-05-31 | Used for Requirements-First and Design-First flows, requirements → design → tasks structure, and EARS-style testable requirements. |
| [IBM: Spec-Driven Development](https://www.ibm.com/think/topics/spec-driven-development) | technical explainer | 2026-05-31 | Used for the spectrum of spec-first, spec-anchored, and spec-as-source development plus tests as a sync bridge. |
| [ReqToCode paper](https://arxiv.org/abs/2603.13999) | paper | 2026-05-31 | Used for the direction of making bidirectional requirements-to-code/test traceability structural. |

## Weak Or Secondary Sources

- Reddit and generic blogs were treated only as practice signals.
- Tool installation is out of scope for this change; the repository-first document structure comes first.

## Plan Impact

- Requirements alone are not enough for spec-driven operation. Add separate `spec`, `plan`, `tasks`, `validation`, and `traceability` artifacts.
- This repo should currently use a spec-anchored approach: specs guide implementation/evaluation but are not the fully automated source of code generation.
- Combine Kiro-style requirements/design/tasks flow and Spec Kit-style specify/plan/tasks/implement flow into a lightweight repository-native structure.

## Remaining Uncertainty

- No external tool was installed, so automatic generation/validation is not present yet. If specs grow, a spec coverage checker under `_tools/` is a good candidate.

## Links

- Spec: `_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.en.md`
- Policy: `_docs/policies/spec-driven-development-policy.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-spec-driven-development.en.md`
