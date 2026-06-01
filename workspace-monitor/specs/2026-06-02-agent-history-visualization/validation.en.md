# Validation Plan

- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm run build`
- Use Playwright or browser smoke check to confirm Agents/History render.
- `git diff --check`

## Manual Checks

- The Agents section shows agent config count, runtime/status, and agent cards.
- The History section shows date density and category bars.
- Cards/charts collapse to one column on mobile width.
