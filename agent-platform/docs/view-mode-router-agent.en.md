# View Mode Router Agent

## Purpose

`view-mode-router-agent` is the agent contract for selecting user, developer, and superadmin development views.

## Use When

- Changing which sections Workspace Monitor shows
- Separating user and developer surfaces in a desktop or admin UI
- Splitting public user snapshots from internal operations snapshots
- Changing the viewing lens without changing `install_mode` or `work_mode`

## Source Of Truth

- Config: `agent-platform/configs/access/view-mode-registry.json`
- Policy: `_docs/policies/view-mode-policy.en.md`
- Workflow: `_ops/workflows/73-view-mode-selection.md`
- Prompt: `_ops/prompts/103-view-mode-selection.md`

## Validation

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/view-mode-router-agent.json
```

## Notes

- `view_mode` is a UI lens.
- Client-side hiding is not a security boundary.
- Before public or multi-user deployment, enforcement must happen through snapshot collection, server routing, authentication and authorization, and tests.
