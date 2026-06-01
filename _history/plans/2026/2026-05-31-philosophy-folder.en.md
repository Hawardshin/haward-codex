# Plan History - Philosophy Folder

## Initial Request

> The philosophy contained in this should be in a philosophy folder.

## Planning Objective

Separate the philosophy behind agent operations into a dedicated `_philosophy/` folder instead of leaving it embedded only in policies and workflows.

## Search Questions

- Where is the philosophical content currently spread across the repository?
- How should `_philosophy/`, `_docs/`, and `_ops/` differ?
- How should existing policy docs reference the new philosophy docs?

## Search Channels

- repository search
- operations documentation search
- history search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Workspace README | `README.md` | Checked operating principles and reserved folder structure |
| Repository instructions | `AGENTS.md` | Checked persistent rules and responsibilities |
| Search insight policy | `_docs/policies/search-insight-planning-policy.ko.md` | Found the AI/search/insight/planning philosophy currently embedded in policy |
| Knowledge validation policy | `_docs/policies/knowledge-base-validation-policy.ko.md` | Found the stored-knowledge skepticism philosophy currently embedded in policy |
| Platform operating model | `_docs/operating-models/platform-operating-model.md` | Found where to separate philosophy, policy, and workflow roles |
| Operations index | `_ops/index.md` | Found where to link the new folder for navigation |

## Knowledge Base Validation

- Internal docs were used as evidence, so they were validated with `knowledge-skeptic-agent`.
- Validation input targets: `README.md`, `AGENTS.md`, `_docs/policies/search-insight-planning-policy.ko.md`, `_docs/policies/knowledge-base-validation-policy.ko.md`, `_docs/operating-models/platform-operating-model.md`, `_ops/index.md`, `_history/plans/2026/2026-05-31-philosophy-folder.ko.md`
- Result: `ready_to_reference`
- Contrary signals: none

## Derived Insights

- Philosophy explains why the work is done this way. Policy defines what must be followed. Workflows define the execution order.
- Probabilistic AI inference, search-backed insight, knowledge-base skepticism, plan history, and evaluation/rework form one operating philosophy.
- A dedicated philosophy folder gives future policies and agents a shared worldview to reference.

## Plan Steps

1. Add `_philosophy/`.
2. Create Korean and English README and agent operating philosophy docs.
3. Add `_philosophy/` to README, AGENTS, workspace rules, and persistent instructions.
4. Link the philosophy docs from search insight planning and knowledge validation policies.
5. Make the philosophy folder discoverable from the operations index and start workflow.
6. Save this work's plan and evaluation history.
7. Run maps, tests, evaluation, then commit and push.

## Rejected Or Deferred Options

- Putting the philosophy docs under `_docs/` was rejected because the user explicitly requested a philosophy folder and philosophy is above execution policy.
- Creating a plain `philosophy/` root folder was deferred because this is an operating folder, not a project, so `_philosophy/` matches the existing reserved-folder rule.

## Risks And Uncertainty

- If philosophy docs duplicate policy docs, maintenance cost will increase. Keep philosophy focused on reasons and principles; keep execution rules in `_docs/` and `_ops/`.
- If the philosophy changes, linked policies and workflows should be updated together.

## Validation Method

- `knowledge-skeptic-agent` internal doc validation
- workspace index/task board checks
- `agent-platform` tests
- template tests
- work evaluator
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Decided to add `_philosophy/` as a reserved operating folder | Philosophy is not a project, and the user requested a philosophy folder |
| 2026-05-31 | Decided to link policy docs to the philosophy docs | Keep philosophy and execution policy separate but connected |
| 2026-05-31 | Recorded internal knowledge validation result in this plan file | Keep the repository evidence for the philosophy-folder decision traceable |
