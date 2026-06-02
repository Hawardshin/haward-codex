# 2026-06-02 Agent Platform UX/Design Deep Research Web Search Record

## Request Summary

The user asked to use deep research to find better design and UX elements, then redesign the platform properly.

## Queries

- `Human-AI interaction UX guidelines Microsoft agent systems dashboard transparency control handoff`
- `Google People AI Guidebook human AI interaction UX guidelines transparency control feedback`
- `Nielsen Norman Group AI UX design guidelines user control transparency trust`
- `developer tools dashboard UX design best practices observability task orchestration`
- `site:microsoft.com HAX Toolkit human-AI interaction guidelines user control transparency`
- `site:pair.withgoogle.com People AI Guidebook UX AI transparency control feedback`
- `site:nngroup.com AI UX guidelines user control transparency trust`
- `site:carbondesignsystem.com data visualization dashboards design system`
- `site:material.io design data visualization dashboard cards tables controls density`
- `site:designsystem.digital.gov dashboard usability metrics alerts task status design system`
- `site:atlassian.design dashboard navigation admin UI design system`
- `site:nngroup.com visibility of system status heuristic user interface design`

## Checked Sources

| Source | Type | Impact on this work |
| --- | --- | --- |
| Microsoft HAX Toolkit: Guidelines for Human-AI Interaction | official AI UX guidance | AI/agent UI should set expectations, show contextual information, explain behavior when needed, and provide user controls over time. |
| Microsoft HAX: Make clear what the system can do | official AI UX guidance | Put capability, limitation, mode, status, and control cues in the interface. |
| Microsoft HAX: Show contextually relevant information | official AI UX guidance | Put next actions, blockers, and evidence near the current task context. |
| Microsoft HAX: Make clear why the system did what it did | official AI UX guidance | Keep evidence, evaluation, and source trails visible as inspectable artifacts. |
| Microsoft HAX: Provide global controls | official AI UX guidance | Keep global view/language controls prominent and predictable. |
| Google People + AI Guidebook | official AI UX guidance | Balance automation with user control, especially in desktop flows and decision inbox behavior. |
| Carbon Design System: Dashboards | design system | Use strong hierarchy, fewer high-priority metrics, consistent color, whitespace, and drill-down paths. |
| Material Design: Data tables | design system | Large information sets need scannable query/filter/manipulation controls. |
| Nielsen Norman Group: Ten Usability Heuristics | UX analysis/foundational guidance | Apply system status visibility, user control, recognition over recall, and minimalist design. |
| Nielsen Norman Group: Visual Design Principles | UX analysis/foundational guidance | Use scale, hierarchy, and contrast to make the first viewport readable. |
| U.S. Web Design System: Site Alert | government design system | Put critical system status near the top without stacking alerts or overusing alarm colors. |

## Weak Sources Ignored

- Generic inspiration galleries and blog posts were useful for taste discovery but not used as implementation evidence.
- Likes and views were treated as discovery signals only, not UX proof.

## Plan Impact

- Redesign the `workspace-monitor` overview around a command center, next actions, blocker/evidence trail, and mode/language controls instead of metric-only overview.
- Upgrade the `platform-desktop-app` user-flow artifact so it shows the installable product UX spine, system status, decision inbox, and recovery behavior.
- Save the deep-research report under `_research/topics/ux/` and keep the `complete-deep-research` input under the active spec folder.

## Uncertainty

- This pass is research/design-system based rather than field-tested with real users.
- Future user observation or usage telemetry should tune metric priority and first-run flow.
