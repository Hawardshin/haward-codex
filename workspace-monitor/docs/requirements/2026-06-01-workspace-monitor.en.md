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

## Scope

- Next.js UI
- Repository snapshot generator
- Document summaries, HTML previews, project/history/requirement/evaluation cards
- Date-indexed history timeline and folder structure map
- Vercel deployment docs

## Non-Goals

- Authentication, login, or real-time server monitoring
- GitHub API integration
- Remote database storage
- Publishing private secrets or full raw conversations
