# Large Scope Decomposition Spec

## Requirement

- `REQ-WS-073`

## Goal

Create a shared platform gate that prevents broad or file-heavy requests from jumping straight into implementation. The gate reduces work through source inventory, exclusions, representative samples, slices, execution strategy, merge gates, and verification planning.

## Scope

- Add a large-scope decomposition profile.
- Add `large-scope-decomposer-agent` spec.
- Add policy, workflow, and prompt.
- Connect `AGENTS.md`, persistent instructions, prompt router, and memory bootstrap.
- Connect requirements, history, and evaluation records.

## Out Of Scope

- New long-running worker implementation.
- Installing an IDE or code search engine.
- Automatically executing a large refactor.
- Requiring dependency graph tools in every project.

## Key Decisions

- Keep this separate from parallel work. Large-scope decomposition happens first; parallel planning is optional after slices exist.
- Do not treat reading every file as the default.
- Representative samples guide understanding; targeted, affected, or global checks provide verification.
- Generated, derived, and vendor files are excluded by default and sampled only when relevant.

## Acceptance Criteria

- The profile passes `check-config-contract`.
- The agent spec is readable through `inspect-agent`.
- Memory bootstrap exposes the profile as a warm anchor.
- Workflow and prompt router point to the new flow.
- Persistent instructions and `AGENTS.md` state that this pre-gate precedes parallel planning.
- Requirements, plan, request trace, and evaluation records are linked.
