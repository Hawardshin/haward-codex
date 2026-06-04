# Requirements: Workspace Monitor

## Status

- Status: `baseline`
- Baseline date: 2026-06-01
- Owning project: `platform-desktop-app/renderer/workspace-monitor/`
- Source request: `UR-2026-06-01-008`

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-WM-001 | The project shall be a Vercel-deployable Next.js project. | must | `pnpm run build` passes and `README.md` records Vercel setup |
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
| REQ-WM-012 | The UI shall let developer and superadmin development views browse source code from key projects and tools as read-only content. | must | Check snapshot `sourceFiles`, the Source tab, and `pnpm run build` |
| REQ-WM-013 | The UI shall show which work lane each agent is moving through and which task/project each agent is connected to through a collaboration board and flow map. | must | Check snapshot `collaborationBoard`, Agents UI collaboration lanes/flow, and `pnpm run build` |
| REQ-WM-014 | The web UI should allow a subtly cute, quietly delightful visual tone while preserving operational density and trust. | should | Check UI tone policy, `globals.css`, and `pnpm run build` |
| REQ-WM-015 | The web UI shall read `agent-platform/configs/access/language-mode-registry.json` and allow selecting all-language, Korean-only, and English-only document views, applying the same language lens to documents, history, and summary counts. | must | Check snapshot `languageModeCatalog`, the language selector, `pnpm run collect`, `pnpm test`, `pnpm run check`, and `pnpm run build` |
| REQ-WM-016 | The web UI shall not embed the large workspace snapshot directly in the client JavaScript bundle, and shall provide a regression check that keeps initial JavaScript chunks within the performance budget. | must | Check `pnpm run build`, `pnpm run perf:budget`, and static Playwright smoke |
| REQ-WM-017 | The static export shall render the main dashboard not only from an HTTP root, but also from desktop shell, file/subpath-like contexts, and repository subpath static serving by loading `_next` assets and `workspace-snapshot.json` through relative paths. | must | Check `pnpm run build`, `pnpm run perf:budget`, and Playwright smoke for `/workspace-monitor/out/index.html` from a repository-root static server |
| REQ-WM-018 | The web UI shall merge separated history records, evaluations, web searches, work timings, request traces, collaboration tasks, blockers, and next actions into a single `unifiedOps` event stream that can be browsed from one screen. | must | Check snapshot `unifiedOps`, Overview/History `Unified Ops` UI, `pnpm run collect`, `pnpm test`, `pnpm run check`, `pnpm run build`, and `pnpm run perf:budget` |
| REQ-WM-019 | The web UI shall explicitly show view/work/install/language/desktop session/task pipe/CLI adapter/monitor section modes and functions in one place, including where each item can be selected or opened. | must | Check snapshot `modeFunctionCatalog`, Overview `Mode & Function Switchboard`, desktop readiness test, `pnpm run collect`, `pnpm test`, `pnpm run check`, and `pnpm run build` |
| REQ-WM-020 | The web UI should provide a compact operating surface near the top of Overview that shows current section state, attention level, next action, evidence counts, and a runtime shortcut. | should | Check section tab badges and `operator-strip` rendering, `pnpm test`, `pnpm run check`, and `pnpm run build` |
| REQ-WM-021 | The web UI shall read the latest user-intent feature map from history and let developer/superadmin views browse intent counts, feature themes, implemented capabilities, next candidates, the Now/Next/Later roadmap, and source freshness. | must | Check snapshot `intentFeatureMap`, the `Intent Map` tab, customer snapshot sanitization, `pnpm run collect`, `pnpm test`, `pnpm run check:intent-map`, `pnpm run check:intent-map:customer`, `pnpm run check`, and `pnpm run build` |
| REQ-WM-022 | The repository snapshot collector should keep feature-specific data extraction logic behind clear module boundaries so continuous refactoring preserves behavior and testable ownership boundaries. | should | Check the `intent-feature-map` collector module boundary, existing collector export compatibility, `pnpm test`, `pnpm run collect`, `pnpm run check:intent-map`, and `pnpm run check` |
| REQ-WM-023 | The web UI shall show the platform's operating memory, platform core, desktop product, monitor UI, domain projects, and runtime/local data planes at a glance, including ownership boundaries, primary paths, prohibited boundaries, and structural pressure points. | must | Check snapshot `structureOverview`, the Structure tab Architecture Backbone/Boundary Rules/Pressure surfaces, customer snapshot sanitization, `pnpm test`, `pnpm run check`, `pnpm run build`, and `pnpm run check:intent-map:customer` |
| REQ-WM-024 | The web UI shall make core function locations visible in the first screen and group monitor section tabs by functional area so users can understand their current location and next navigation path immediately. | must | Check the top `core-feature-rail`, Overview `Core Functions`, grouped `section-tab-groups`, `pnpm test`, `pnpm run check`, `pnpm run build`, and desktop customer bundle |
| REQ-WM-025 | The web UI should behave more like a real app by letting users run sections, view modes, language modes, document filters, and key actions through a global command palette plus pinned/recent quick controls. | should | Check `app-control-bar`, `command-palette`, pinned/recent controls, keyboard lifecycle cleanup, `pnpm test`, `pnpm run check`, `pnpm run build`, and static export smoke |
| REQ-WM-026 | The desktop product UI shall render runtime, task pipe, service readiness, and source editor operations as full-width workbench surfaces instead of cramped web cards, and shall not include the large workspace snapshot as a JavaScript fallback chunk. | must | Check `pnpm run perf:budget`, customer bundle audit, Browser smoke with body/viewport overflow 0, and runtime/source panel visual review |
| REQ-WM-027 | The desktop source editor shall act as a platform-specific editing workbench rather than a generic web editor, providing requirement/spec/validation/Tauri command/agent config/decision item templates, path-based editing profiles, and patch-context copying. | must | Check `source-customization-bar`, Monaco custom theme/options, template insertion, patch context copy, `pnpm run check`, `pnpm run build:customer`, and Browser smoke |
| REQ-WM-028 | Desktop Source Review shall behave as a real code editing workbench by providing runtime workspace file-index refresh, an open editor tab strip, Monaco command toolbar, edit/diff mode, and an editor settings popup. | must | Check `Refresh Files`, `Open Editors`, `source-command-toolbar`, `MonacoDiffEditor`, `Editor Settings`, `pnpm run check`, `pnpm test`, and Browser smoke |
| REQ-WM-029 | Desktop Source Review shall not run an unnecessary runtime source catalog scan before the user enters the Source surface, and file-list rendering shall avoid duplicate lists and fully expanded trees by default. | must | `pnpm run check`, `pnpm test`, `pnpm exec next build`, `pnpm run perf:budget`, localhost smoke |
| REQ-WM-030 | Repeated action buttons, segments, toolbars, and Source/Explorer controls shall use consistent click target sizes, with larger targets on touch/mobile environments. | must | `globals.css` button token audit, `pnpm run check`, `pnpm test`, `pnpm exec next build`, localhost visual smoke |
| REQ-WM-031 | The desktop product UI shall avoid fixed-height/compressed layouts that only work fullscreen, show the primary task first, and expose secondary information through collapsed or vertical flows. | must | `pnpm run check`, `pnpm test`, `pnpm exec next build`, responsive Browser smoke, body/viewport horizontal overflow check |
| REQ-WM-032 | Visible features, panels, buttons, and workflow steps shall each perform one clearly named job, without mixing status, settings, navigation, execution, and evidence views inside one control or panel. | must | Overview home single-purpose control audit, disclosure count/label Browser smoke, `pnpm run check`, `pnpm test`, `pnpm exec next build` |
| REQ-WM-033 | The desktop product UI shall avoid placing several functional panels into one shallow tab; when a tab starts holding multiple functions, the default tab shall become a selection menu and each function shall open as a deeper single-purpose screen. | must | Overview drill-down smoke, default home panel count, drill-down back interaction, `pnpm run check`, `pnpm test`, `pnpm exec next build` |
| REQ-WM-034 | Primary desktop product sections shall reflow without root horizontal overflow at 900px, 720px, 540px, and 390px window widths, while primary navigation and repeated controls keep at least 44px visible targets. | must | Static export Playwright audit across 5 sections x 5 viewports, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `platform-desktop-app check` |
| REQ-WM-035 | Desktop product text shall follow the `Pretendard Variable`/`Pretendard` first mixed Korean/English sans fallback stack and role-based typography scale; small supporting text shall stay explicitly small without browser-default shrinking or arbitrary component font sizes. | must | `globals.css` font family/font-size token audit, in-app Browser computed font-family smoke, static export Playwright typography audit across 5 sections x 5 viewports, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` |
| REQ-WM-036 | Text on dark backgrounds, dark theme, dark rail, primary actions, active tabs, and code/source/terminal surfaces shall use an explicit white foreground token instead of translucent gray text. | must | `globals.css` dark foreground token audit, in-app Browser dark foreground smoke, static export Playwright dark surface audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` |
| REQ-WM-037 | Primary desktop product sections shall not overwhelm the user by opening diagnostics, records, inventory, builders, execution helpers, and evidence panels at once; the initial screen shall show one primary work surface and limited summaries, with the rest behind named detail disclosures. | must | Agents/Desktop initial visible panel count audit, closed-by-default disclosure audit, disclosure interaction, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, static export Playwright audit |
| REQ-WM-038 | Agent Core chat UI shall use a familiar ChatGPT/Claude/Gemini-style structure with a central conversation log and bottom composer as the primary work surface, compact provider/model controls, and context/contract information separated into a drawer or summary area that does not push the chat input away. In the Agents screen, the common status strip, document filter, metrics, and contract cards must not push away the default chat surface, and the composer must be visible in the first viewport at 390px mobile width. | must | Agents static export Browser chat audit, 390px composer first-viewport fit audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` |
| REQ-WM-039 | Primary tab switching shall not slow down by mounting closed secondary feature groups; heavy panels inside Agents/Desktop Runtime section-level disclosures shall stay out of the React tree until the user opens them. | must | CPU throttle 6 static export tab switch audit, closed disclosure DOM mount audit, disclosure open interaction, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` |
| REQ-WM-040 | The Terminal/CLI execution UI shall use a familiar open-source developer-tool terminal structure instead of a generic card panel: terminal chrome, tab strip, dark emulator surface, monospace output, prompt input, and a status/cwd bar. Global terminal buttons shall route to a mounted terminal surface before opening the drawer. | must | Record xterm.js/VS Code/GNOME Terminal references, in-app Browser terminal-button smoke, 1280/900/390px static-export terminal overflow audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` |
| REQ-WM-041 | Button clicks shall not block the first response paint with heavy workbench mount, native refresh, source filtering, evidence assembly, or other secondary work. Representative primary-section button samples shall keep p95 click-to-paint at or below 60ms with no long tasks under CPU throttle 6 static-export audit. | must | 67-button click-to-paint sample audit, staged Desktop/Source shell settled smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` |

## Scope

- Next.js UI
- Repository snapshot generator
- Document summaries, HTML previews, project/history/requirement/evaluation cards
- Date-indexed history timeline and folder structure map
- Agent inventory plus history density/type visualization
- User/developer/superadmin development view mode selector
- All/Korean-only/English-only document language mode selector
- Developer/superadmin read-only source-code viewer
- Agent collaboration lanes, agent-task-project flow map, and blocker/next-action display
- Small accents and micro-interactions that do not weaken operational readability
- Public JSON fetching for the large snapshot, lazy loading for `MonitorShell`, and JavaScript chunk performance-budget checks
- Relative static asset paths and snapshot fetching for packaged/subpath safety
- A `unifiedOps` operating event stream that combines history and monitoring signals
- `modeFunctionCatalog` and an Overview switchboard that collect mode and function selection locations
- An Overview operating surface that groups current state, next action, evidence, and runtime shortcuts
- An `intentFeatureMap` snapshot object and `Intent Map` section for the user-intent-derived roadmap
- Feature-specific data extraction module boundaries in the snapshot collector
- A `structureOverview` snapshot object and Structure tab surfaces for platform planes, ownership boundaries, and structural pressure points
- Core function shortcuts and grouped tab information architecture
- Global command palette plus pinned/recent quick controls
- Platform source editor templates, profiles, and patch-context copying that activate only through the Tauri desktop runtime
- Tauri runtime file index, open editor tabs, editor command toolbar, Monaco diff/settings surface
- Deferred source catalog scans, deduplicated source lists, and collapsed source trees before Source entry
- Repeated action and Source/Explorer/toolbar click target sizing
- Removal of fullscreen-dependent fixed-height shells, secondary information progressive disclosure, and responsive reflow
- Single-purpose home controls, panels, workflow steps, and disclosure roles
- Deeper single-purpose child views instead of multi-function shallow home tabs
- Non-fullscreen reflow for primary desktop/source/agent/intent sections and small-window navigation
- Role-based typography scale and explicit small text handling
- White foreground token on dark surfaces
- Agent Core chat with a central conversation log, bottom composer, compact provider/model selector, collapsed context drawer, and Agents-specific primary work surface
- Lazy mounting of closed secondary panels during tab switching plus tab transition latency audits
- Open-source developer-tool terminal chrome, tab strip, emulator output, prompt input, and global terminal button routing
- Separation of button first paint from heavy workbench mount, native refresh, and evidence calculations
- Vercel deployment docs

## Non-Goals

- Authentication, login, or real-time server monitoring
- Treating client-side view mode as a security boundary
- Treating client-side language mode as snapshot redaction or a security boundary
- Editing or saving source code from a pure browser without the Tauri desktop runtime and scoped backup gate
- GitHub API integration
- Remote database storage
- Publishing private secrets or full raw conversations
