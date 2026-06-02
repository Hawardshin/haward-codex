# 2026-06-02 Agent Platform UX/Design Deep Research Report

## Conclusion

The platform UX should not be a decorative admin page. It should be an operating surface where a person can understand and control agent work. The first view should prioritize current status, blockers, next actions, evidence, and view controls over raw counts.

## Research Question

Which design and UX principles should guide an agent-building and orchestration platform, and what should be reflected in `workspace-monitor` and `platform-desktop-app`?

## Evidence Synthesis

| Evidence | Interpretation | Application |
| --- | --- | --- |
| Microsoft HAX says AI systems should make capability and limitations clear early. | Users need to know what agents can do and where they may stop. | Put mode, capability gap, and blocker status in a command center. |
| HAX says AI systems should show contextually relevant information. | The current next action matters more than showing every document. | Put next actions and blockers in the overview first viewport. |
| HAX says systems should make clear why they behaved as they did. | Agent output without evidence is hard to trust. | Group web search, evaluation, requirement, and spec links as an evidence trail. |
| HAX and Google PAIR emphasize automation plus user control. | The desktop app can automate work, but important decisions must stay recoverable by the user. | Include decision inbox and mode controls in the desktop UX spine. |
| Carbon dashboard guidance emphasizes hierarchy, limited metrics, and whitespace. | More numbers do not automatically make a dashboard better. | Reorder overview as `command center -> action/evidence -> metrics -> drill-down`. |
| Material data-table guidance treats large data as queryable and filterable. | Documents, source, and requirements need scannable lists and filters more than decorative cards. | Keep search/filter behavior while making the command center orient the user. |
| NN/g heuristics emphasize visibility of system status, user control, recognition over recall, and minimalist design. | Users should not have to remember where to find important status and choices. | Expose status, next step, evidence, and controls in a stable structure. |
| USWDS site-alert guidance says critical status should be prominent but not overwhelming. | Operational alerts should be visible without creating unnecessary anxiety. | Treat public readiness and blocked tasks as quiet alert panels. |

## Current Structure Diagnosis

- `workspace-monitor` already exposes projects, documents, history, agents, source, and requirements.
- Its overview still reads like a set of metrics and panels rather than a clear operating status surface.
- `platform-desktop-app/artifacts/user-flow-map.html` describes first-run flow and modes, but it does not yet show enough about reassurance, blocked decisions, and recovery.

## Design Direction

1. Add a first-viewport `Command Center`.
2. Show `Now`, `Needs Attention`, `Evidence Trail`, and `Mode Control` as an operating spine.
3. Keep metrics below context, connected to drill-down tabs.
4. Preserve user/developer/superadmin mode separation.
5. Upgrade the desktop UX artifact into a user journey covering first run, readiness, decision inbox, recovery, and evidence review.

## Target Files

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `workspace-monitor/docs/research-backed-ux.ko.md`
- `platform-desktop-app/docs/research-backed-ux.ko.md`

## Limits and Follow-Up Validation

- No field usability test was run in this pass.
- Use Playwright screenshots to verify desktop/mobile hierarchy, nonblank rendering, and text overlap risks.
- Future telemetry or user observation should tune section priority and first-run flow.
