# Runtime And Language Selection Policy

## Purpose

The platform should not force every component into one language. Agent logic, web UI, installable desktop shells, local services, and high-performance native modules have different quality requirements, so runtime selection must stay component-specific.

## Default Direction

- Python: default for agent planning, research, evaluation, document processing, and config validation.
- TypeScript/Next.js: default for `workspace-monitor`, dashboards, HTML artifacts, and Vercel-ready UI.
- Rust/Tauri: first candidate for installable desktop shells, small native command bridges, security-sensitive native operations, and stable performance hot paths.
- Go: first candidate for long-running local daemons, file watchers, network or notification bridges, operational CLIs, and simple cross-platform binaries.
- Electron/Node: fallback when JavaScript ecosystem depth and Chromium consistency matter more than bundle size or memory cost.

## Selection Rules

1. Classify the component boundary first: UI, agent logic, local service, desktop shell, native command, or hot loop.
2. If performance motivates a runtime change, record bottleneck metrics first. Do not migrate to Rust or Go without measurement.
3. Installable desktop productization follows the release gates under `platform-desktop-app/`.
4. If Rust, Go, or Electron dependencies are actually installed, record installation audit and rollback plans.
5. Community reactions, GitHub stars, and Reddit opinions are adoption or risk signals only; decisions need official docs and local prototype measurements.

## Research And Design Procedure

Runtime selection must move from research into a design record.

1. Follow `research_design_process` in `agent-platform/configs/runtime/language-decision-registry.json`.
2. Separate official docs, architecture/ADR references, maintained open-source implementations, issue/discussion signals, and contrary examples.
3. Compare at least two candidate designs when blast radius is meaningful.
4. Record an ADR-style decision using `_templates/runtime-language-decision/`.
5. If performance or packaging is a reason for the choice, write a prototype measurement plan before implementation or installation.
6. If dependency installation occurs, create the installation audit record first.

## Current Recommendation

The current platform should use a hybrid structure.

- Core platform: keep Python.
- Monitor/web UI: keep TypeScript/Next.js.
- Desktop productization: keep Tauri-first prototype direction.
- If a local background service becomes necessary: evaluate Go first.
- If stable indexing/search/parser hot paths become bottlenecks: evaluate Rust modules first.

## Verification

Before creating a new component or changing runtime, fill the `decision_gates` and `prototype_measurements` from `agent-platform/configs/runtime/language-decision-registry.json`.
