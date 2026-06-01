# Requirements: Workspace Monitor

## Status

- Status: `baseline`
- Baseline date: 2026-06-01
- Owning project: `workspace-monitor/`
- Source request: `UR-2026-06-01-008`

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-WM-001 | The project shall be a Vercel-deployable Next.js project. | must | `npm run build` passes and `README.md` records Vercel setup |
| REQ-WM-002 | The app shall let the user browse repository history, work summaries, request traces, projects, agent/task status, requirements, specs, and evaluations from one UI. | must | Generated snapshot and UI sections reviewed |
| REQ-WM-003 | Markdown documents shall be viewable as readable HTML previews. | must | Snapshot documents include escaped HTML previews |
| REQ-WM-004 | The app shall work locally while the repository is private and be deployable to Vercel after the repository is made public. | must | Static snapshot build and deployment docs reviewed |
| REQ-WM-005 | The structure shall be extensible, separating document parsing, UI components, data models, and deployment settings. | should | Folder structure and types reviewed |
| REQ-WM-006 | The project shall support pre-publication review for sensitive data in generated snapshots. | must | README and deployment docs include public-release checks |
| REQ-WM-007 | The app shall collect work summaries, user requests, request traces, web searches, plans, evaluations, and daily history under `_history/` into a date-indexed web UI that can be filtered by date and type. | must | `historyDays` in the snapshot and History UI date filter |
| REQ-WM-008 | The web UI should show root folder structure, `_docs` categories, project top-level homes, and history source roots so folder boundaries and data provenance are understandable. | should | `folderStructure` in the snapshot and Structure UI |
| REQ-WM-009 | The UI shall combine agent definitions from `agent-platform/configs/agents/` with coordination runtime state so users can visually see which agents exist. | must | Check snapshot `agentCatalog` and the Agents inventory map |
| REQ-WM-010 | The UI shall visualize `_history/` document density by date and distribution by history type. | must | Check the History density chart and category bars |
| REQ-WM-011 | The UI shall read `agent-platform/configs/access/view-mode-registry.json` and allow selecting `user`, `developer`, and `superadmin_developer` view modes, with superadmin development view as the current default. | must | Check snapshot `viewModeCatalog`, the top view mode selector, and `check-view-modes` |
| REQ-WM-012 | The UI shall let developer and superadmin development views browse source code from key projects and tools as read-only content. | must | Check snapshot `sourceFiles`, the Source tab, and `npm run build` |
| REQ-WM-013 | The UI shall show which work lane each agent is moving through and which task/project each agent is connected to through a collaboration board and flow map. | must | Check snapshot `collaborationBoard`, Agents UI collaboration lanes/flow, and `npm run build` |
| REQ-WM-014 | The web UI should allow a subtly cute, quietly delightful visual tone while preserving operational density and trust. | should | Check UI tone policy, `globals.css`, and `npm run build` |

## Scope

- Next.js UI
- Repository snapshot generator
- Document summaries, HTML previews, project/history/requirement/evaluation cards
- Date-indexed history timeline and folder structure map
- Agent inventory plus history density/type visualization
- User/developer/superadmin development view mode selector
- Developer/superadmin read-only source-code viewer
- Agent collaboration lanes, agent-task-project flow map, and blocker/next-action display
- Small accents and micro-interactions that do not weaken operational readability
- Vercel deployment docs

## Non-Goals

- Authentication, login, or real-time server monitoring
- Treating client-side view mode as a security boundary
- Editing or saving source code from the browser UI
- GitHub API integration
- Remote database storage
- Publishing private secrets or full raw conversations
