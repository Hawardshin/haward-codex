# Requirements Change: View Mode Selection

## Change Summary

- Added requirements: `REQ-WS-061`, `REQ-WM-011`
- Request summary: The user said user and developer views are different, but for now the platform should allow selecting a superadmin-focused development mode.
- Scope:
  - Add a shared platform view mode registry
  - Add a Workspace Monitor view mode selector
  - Keep view mode separate from `install_mode` and `work_mode`

## Reason

Existing `install_mode` separates user and developer setup, but does not decide what a screen shows. `work_mode` controls task strictness, so mixing it with UI audience would weaken evaluation gates.

## Decision

- Add `view_mode` as a shared concept.
- Keep `superadmin_developer` as the current default.
- For public or multi-user deployments, client-side hiding is not a security boundary; enforcement must happen at snapshot collection or server authentication/authorization layers.

## Related Artifacts

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- `agent-platform/configs/agents/view-mode-router-agent.json`
- `_docs/policies/view-mode-policy.en.md`
- `_ops/workflows/73-view-mode-selection.md`
- `_ops/prompts/103-view-mode-selection.md`
- `workspace-monitor/components/MonitorShell.tsx`
