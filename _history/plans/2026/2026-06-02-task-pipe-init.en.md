# Task Pipe Init Plan

## Goal

Move beyond single CLI session start and implement a structure where one task intake initializes several optional CLI lanes through a pipe graph.

## Scope

1. Add task pipe preset listing and multi-lane init command to the Rust/Tauri backend.
2. Add a `Task Pipe Init` panel to the Workspace Monitor Desktop tab.
3. Update the CLI adapter registry, desktop registry, user-flow registry, requirements, specs, and readiness tests.
4. Run TypeScript, readiness, config contract, build, and CLI pipeline validation.

## Non-Scope

- Installing or auto-installing external CLIs.
- Installing Tauri shell plugin, sidecars, PTY, xterm.js, or Monaco.
- Managing provider authentication or claiming public installer readiness.
