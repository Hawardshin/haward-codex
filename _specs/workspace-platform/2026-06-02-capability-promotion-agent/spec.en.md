# Capability Promotion Agent Spec

## Requirement

- `REQ-WS-070`

## Goal

The platform detects repetition, bottlenecks, omissions, and manual rework across varied tasks, creates capability candidates, and promotes safe candidates into validated reusable assets.

## Scope

- Add capability promotion registry.
- Add capability promotion agent spec.
- Add policy, workflow, and prompt.
- Connect requirements, memory bootstrap, history, and evaluation.

## Out Of Scope

- Long-running background worker implementation.
- Automatic installs, permission changes, or public deployments.
- High-risk capability execution without user approval.

## Key Decisions

- Use `capability-promotion-agent` rather than `blackbox-agent`; the user-facing flow may feel automatic, but internals must stay transparent.
- Prefer the smallest asset in this order: `prompt`, `workflow`, `template`, `tool`, `skill`, `agent`, `project_feature`.
- Route high-risk decisions through the human decision inbox.

## Acceptance Criteria

- The registry passes the self-documenting config contract.
- The agent spec is readable through `inspect-agent`.
- The memory bootstrap exposes the registry as a warm anchor.
- Requirements, plan, request trace, and evaluation records exist.
