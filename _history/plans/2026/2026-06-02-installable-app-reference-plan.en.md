# Plan: Applying Installable Multi-Agent App References

## Direction

Keep the current Tauri-first installable app direction. The new references do not overturn that decision; they clarify implementation priorities.

## Implementation Roadmap

### Phase 1: App Trust and First Run

- Build workspace chooser and privacy scope preview first.
- Make CLI capability cards clearer than the current Desktop tab: install/auth/version/setup-later states.
- Prepare Tauri developer-local run smoke.
- Strictly separate public-ready from developer-local-ready in UI and docs.

### Phase 2: Agent Terminal Surface

- Add xterm.js after installation audit.
- Connect existing pipe session stdout/stderr buffers to xterm.js lanes.
- Add output parser for question, error, test, and file-link events.
- Terminal lanes should support session persistence, cancellation, output bounds, clear, and export.

### Phase 3: Code Editing and Review Surface

- Add Monaco Editor after installation audit.
- Replace the current textarea scoped editor with Monaco.
- Make diff preview, backup, and validation command the default save flow.
- Add branch/worktree/diff/commit review UI inspired by GitHub Desktop.

### Phase 4: Multi-CLI Orchestration

- Share a process graph schema between UI and backend.
- Start with two-CLI fan-out.
- Attach isolated worktrees to each source-affecting lane.
- Let merge gates classify accepted, rejected, conflicting, and deferred outcomes.

### Phase 5: Knowledge Accumulation and Reuse

- Freeze a run record schema.
- Bundle terminal summary, artifacts, decisions, validation, and source diff into one record.
- Route repeated work into prompt/workflow/tool/skill promotion candidates.
- Compare vector DB only after measuring a retrieval bottleneck.

## Next Implementation Candidates

1. Add Tauri developer-local smoke script to `platform-desktop-app`.
2. Improve capability card UI in the `workspace-monitor` Desktop tab.
3. Audit xterm.js installation and build a terminal lane POC.
4. Audit Monaco Editor installation and build a scoped editor POC.
5. Add run record and process graph schemas.

## Reference Application Principles

- Build strong terminal/editor surfaces like VS Code, but do not become a VS Code clone.
- Visualize Git safely like GitHub Desktop, but focus on agent review and merge gates.
- Use Docker Desktop-like capability surfaces, but keep external CLIs as optional adapters.
- Provide Raycast-like command palette and quick actions, while preserving decisions, validation, and records.
- Offer Warp/Cursor/OpenCode-like agentic UX, while remaining a vendor-neutral supervisor.
