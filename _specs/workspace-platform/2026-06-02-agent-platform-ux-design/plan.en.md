# Agent Platform UX/Design Improvement Plan

## Strategy

1. Record the deep research result as a valid `deep-research-input.json`.
2. Add `REQ-WS-077` to the baseline.
3. Add command center, UX spine, and attention/evidence panels to the `workspace-monitor` overview.
4. Adjust CSS for hierarchy, color roles, and mobile stability.
5. Redesign `platform-desktop-app/artifacts/user-flow-map.html` as an installable product UX flow.
6. Add project UX docs.
7. Verify with tests, typecheck, build, and Playwright screenshot smoke.

## File Scope

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/docs/research-backed-ux.*.md`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `platform-desktop-app/docs/research-backed-ux.*.md`
- `_research/topics/ux/`
- `_requirements/`
- `_specs/workspace-platform/2026-06-02-agent-platform-ux-design/`
- `_history/`

## Risks

- Too much first-viewport information can create complexity.
- This redesign is not validated by a live user study.
- Playwright screenshots catch rendering/overlap risks but do not prove full usability.

## Verification

- `complete-deep-research`
- `npm run test`
- `npm run check`
- `npm run build`
- Playwright screenshot smoke for `workspace-monitor/out/index.html`
- `platform-desktop-app npm run check`
- `workspace-health --include-build`
