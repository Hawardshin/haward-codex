# Desktop Product Folder Restructure Spec

## Background

The installable platform is no longer a Tauri wrapper around a root-level web UI candidate. The desktop product launches first and owns task state, runtime data, the installer shell contract, workspace hosting, source editing, CLI adapters, and accumulated data surfaces. The product UI therefore belongs under `platform-desktop-app/renderer/workspace-monitor/`, not as an independent root project.

## Requirement

- `PDA-REQ-034`: remove the independent root `workspace-monitor/` project and enforce `platform-desktop-app/renderer/workspace-monitor/` as the product renderer source path.

## Design Decisions

- Language/runtime option A: keep the existing TypeScript/Next.js renderer, Rust/Tauri shell, and Python platform tools, changing only the ownership boundary.
- Language/runtime option B: rewrite the renderer as Rust/native UI or a new Electron main/renderer structure.
- Selection: option A. It preserves the existing workbench, Monaco, CLI supervisor, and runtime data UI while correcting product ownership with lower risk and maintenance cost.

- Architecture option A: keep `workspace-monitor/` as a root project and let Tauri reference that external project.
- Architecture option B: move the renderer to `platform-desktop-app/renderer/workspace-monitor/` and align Tauri, pnpm, readiness checks, and registries to the same product boundary.
- Selection: option B. It matches the requirement that the installable app is the primary host runtime with UI authority and avoids making the product look like a developer clone/workdir workflow.

## Scope

- Move tracked `workspace-monitor/` source to `platform-desktop-app/renderer/workspace-monitor/`.
- Update `pnpm-workspace.yaml`, `pnpm-lock.yaml`, Tauri `frontendDist`, dev command, build/audit scripts to the new renderer path.
- Update project registry, root structure policy, repository map, docs, policies, and operating models around the new root boundary.
- Update the snapshot collector and readiness checks to use the new repository root calculation and renderer path.

## Non-Scope

- Public signing/notarization, signed updater, and clean-machine install smoke are not completion criteria for this folder restructure.
- Historical specs that recorded past `workspace-monitor/` paths are not rewritten wholesale. The source of truth for the new structure is the requirement, registry, current docs, generated maps, and readiness checks.
