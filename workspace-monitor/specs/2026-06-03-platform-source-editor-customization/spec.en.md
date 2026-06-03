# Spec: Platform Source Editor Customization

## Purpose

Desktop Source Review must be a developer/superadmin workbench for this platform, not a generic web code viewer. Users should be able to start repeated requirement, spec, validation, Tauri command, agent config, and decision item edits inside the editor, then copy the current draft as patch context for agent handoff.

## Scope

- Keep Monaco editor as the existing editing engine.
- Add a platform template selector and `Insert Template` action to the desktop source editor.
- Recommend Requirements, Spec Work, Runtime Command, Platform Config, Validation, or Source Patch profiles from the current file path.
- Patch-context copy includes path, profile, template, dirty state, diff summary, backup gate, and draft body.
- Monaco theme and editor options provide a desktop workbench tone plus developer defaults such as bracket guides, rulers, sticky scroll, and syntax-aware copy.

## Non-Goals

- Do not embed all of VS Code or clone a separate open-source app in this slice.
- Do not add pure-browser source saving without the Tauri scoped write and backup gate.
- Do not implement language servers, Git staging, or advanced multi-cursor automation in this slice.

## Acceptance Criteria

- The Runtime Source Review panel renders `source-customization-bar`.
- Recommended profile and template change by open file path.
- Template insertion updates the Monaco selection or draft tail and is visible in dirty diff.
- Patch-context copy includes metadata needed for agent handoff.
- `pnpm run check`, `pnpm run build:customer`, `pnpm run perf:budget`, `pnpm test`, desktop check/test, and Browser smoke pass.
