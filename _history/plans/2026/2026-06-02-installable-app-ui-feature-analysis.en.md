# Plan: Applying Installable App UI and Feature References

## Product Judgment

The app is not one specific CLI, editor, terminal, Git GUI, or launcher. Reference UI patterns are useful only insofar as they help manage six first-class objects.

- `run`: one user goal and its execution record
- `lane`: an independent CLI/agent execution unit
- `decision`: a deferred question or required user judgment
- `artifact`: generated output, file change, report, or log summary
- `evidence`: source/output/diff/validation backing a claim
- `capability`: CLI, prompt, workflow, skill, validator, or tool

## Screen Priority

1. Home: active runs, blocked decisions, capability health, and recent artifacts.
2. Runs: lane cards, terminal output, process graph, and timeline for multi-CLI execution.
3. Decisions: grouped questions with impact, default, and resume actions.
4. Source: GitHub Desktop-style file list, diff, and review flow for agent changes.
5. Capabilities: Docker/Raycast-style capability cards for CLI adapters, prompts, workflows, skills, and tools.
6. Knowledge: promotion inbox for turning repeated work and strong outputs into reusable assets.

## Immediate Implementation Order

1. Upgrade Capability Center into a card-based status/setup UI.
2. Build Run Board v1 over existing pipe sessions as lane cards.
3. Prototype xterm.js terminal lanes, keeping full PTY write behind a later gate.
4. Build Decision Inbox v2 with grouped decisions, answer/resume, and replay.
5. Build Source Review v1 with file list, diff preview, backup/restore, and validation linkage.
6. Freeze run record and process graph schemas.
7. Introduce Monaco gradually as the Source Review editor surface.

## Directions Not to Adopt

- Full VS Code clone
- Single-CLI product branding
- Raw terminal logs as the main knowledge layer
- Quick actions that bypass validation or records
- App-owned provider credentials

## Follow-Up Validation

- Product-by-product screenshot benchmark
- Terminal/editor rendering smoke in macOS Tauri WebView
- xterm.js/Monaco installation audit and dependency/license/security records
- Terminal lane lifecycle and resource-leak checks
- Decision resume replay validation
