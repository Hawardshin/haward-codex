# Desktop User Flow Design Workflow

## Purpose

Use this workflow when the installable desktop app needs a user-facing flow, first-run onboarding, workspace chooser, decision inbox, task timeline, settings flow, or recovery path.

## Inputs

- User request
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/configs/integrations/cli-adapter-registry.json`

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when the request changes durable product behavior.
4. Confirm that the owning project is `platform-desktop-app/`.
5. Read the desktop user-flow registry before UI, installer, or runtime implementation.
6. Check first-run flow:
   - open existing workspace
   - create new workspace
   - demo workspace
   - workspace boundary review
   - view mode selection
   - required readiness scan
   - optional capability setup later
7. Check task flow:
   - goal/project/output input
   - preflight
   - run timeline
   - decision inbox
   - result review
8. Check recovery:
   - unreadable workspace
   - missing optional CLI
   - pending user decision
   - stale snapshot
   - update failure
9. Update project-local requirements/specs, docs, and visual artifacts.
10. Validate config, docs, monitor snapshot, tests, grounding, and evaluation.

## Output Contract

- user segment and default view mode
- first-run path
- dashboard information architecture
- task run flow
- decision inbox behavior
- optional setup deferral behavior
- developer/superadmin flow
- failure recovery paths
- validation results

## Rule

Do not design the installable app as a settings-first tool. It must reach workspace value quickly, then reveal complexity progressively.
