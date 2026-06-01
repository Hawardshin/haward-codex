# macOS Execution Structure Plan

## Request

The installable platform needs a structure that can run on macOS.

## Work Mode

- Selected: `governance`
- Reason: This is a durable change to installable app structure, release gates, persistent instructions, requirements, and memory anchors.

## Plan

1. Use web search to confirm macOS distribution requirements in official Apple, Tauri, and Electron docs.
2. Choose a structure that does not conflict with the existing `platform-desktop-app` productization, user flow, runtime/language direction, or CLI adapter boundary.
3. Add `macos-execution-profile.json` as the source of truth.
4. Connect project docs, requirements, specs, and traceability.
5. Add the macOS execution profile to persistent instructions and memory bootstrap.
6. Run config contract, JSON parse, memory bootstrap, docs/naming/structure/workspace health, omission, grounding, and evaluator checks.

## Decision

- Keep a Tauri-first macOS `.app` shell as the default direction.
- Reuse `workspace-monitor` UI and keep Python `agent-platform` behind a sidecar, local service, or command boundary.
- Treat optional missing CLIs as capability-level degradation rather than app-wide failure.
- Actual Tauri installation and `.app` implementation will happen in a separate installation audit and implementation spec.

