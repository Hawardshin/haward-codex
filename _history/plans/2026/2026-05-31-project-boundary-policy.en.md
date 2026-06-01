# Plan History - Project Boundary Policy

## Initial Request

> After building this powerful shared setup, I will directly create projects, and anything belonging to a project should go only into that project. This applies to everyone and shared tools will exist, but later many interests and topics will become projects, so rules to manage that are also necessary.

## Planning Objective

Separate the shared operating environment from individual projects so file ownership and shared-asset promotion stay clear as many interests and projects grow.

## Search Questions

- Are current rules enough to distinguish root projects from shared workspace folders?
- What criteria decide whether a new interest belongs in an existing project or needs a new project?
- How should shared tools differ from project-specific tools?
- Where should project status and boundaries be visible?

## Search Channels

- repository search
- operations documentation search
- template search
- history search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Repository instructions | `AGENTS.md` | Checked existing root project and shared-folder rules |
| Workspace README | `README.md` | Checked project folder and reserved folder rules |
| Workspace rules | `_docs/instructions/workspace-rules.md` | Checked project README, commit, and history policy |
| Capability governance | `_docs/governance/capability-governance.md` | Checked shared tool versus project tool guidance |
| Project template | `_templates/project/README.md` | Found where to add a scope boundary section |
| Create project prompt | `_ops/prompts/20-create-project.md` | Found where to add registry updates during project creation |

## Knowledge Base Validation

- Internal operating docs were used as evidence, so they were validated with `knowledge-skeptic-agent`.
- Validation input targets: `AGENTS.md`, `README.md`, `_docs/instructions/workspace-rules.md`, `_docs/governance/capability-governance.md`, `_templates/project/README.md`, `_ops/prompts/20-create-project.md`
- Result: `ready_to_reference`
- Contrary signals: none

## Derived Insights

- A root project is the boundary of an interest and lifecycle.
- The shared environment supports every project, but it should not absorb project-specific files.
- Shared tools can start inside a project, but should move to `_tools/` only when reuse crosses projects.
- As projects grow, folders alone will not track status well enough; `_ops/projects/registry.json` is needed.

## Plan Steps

1. Add Korean and English project boundary policy docs.
2. Add `_ops/projects/` registry and indexes.
3. Add a project boundary prompt and workflow.
4. Link boundary checks from the create-project prompt and start/close workflows.
5. Add scope boundary sections to the general and Python project templates.
6. Update README, AGENTS, persistent instructions, workspace rules, platform operating model, and philosophy docs.
7. Save this plan and evaluation, run maps/tests/evaluation, then commit and push.

## Rejected Or Deferred Options

- Nesting all projects under `_projects/` is deferred. Existing rules use root `kebab-case` project folders, and direct root visibility fits the current workflow.
- A registry generator tool is deferred. Start with JSON and Markdown indexes, then automate when project count grows.

## Risks And Uncertainty

- Manual registry maintenance can be missed. The create-project prompt and close workflow should check registry updates.
- Promoting shared assets too early can pollute shared folders. Start inside projects and promote only after reuse is clear.

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
| 2026-05-31 | Decided to add `_ops/projects/` registry | Track many project interests and statuses in one place |
| 2026-05-31 | Decided to update both project boundary policy and capability governance | Keep shared tools from mixing with project-specific files |
| 2026-05-31 | Recorded internal knowledge validation result in this plan file | Keep the repository evidence for project boundary rules traceable |
