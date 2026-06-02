# Runtime Data and Platform Code Boundary

## Purpose

This platform is developed inside this repository, but end customers should not use it by browsing the repository source code. Customers use the installed app, customer-selected workspaces, app-managed data stores, log summaries, and export/import surfaces.

The source-of-truth file is `platform-desktop-app/configs/runtime-data-boundary-registry.json`.

## Core Boundaries

- Development repository: manages platform source, requirements, specs, docs, tests, and generated developer snapshots.
- Installed app bundle: contains the compiled Rust/Tauri executable, static frontend assets, and approved bundled resources only.
- User workspace: customer-selected project/task files, distinct from platform source.
- Platform data store: accumulated task records, decision inbox state, structured evidence, and settings metadata.
- Log store: classified runtime health, CLI IO, task execution, agent work, and support diagnostic logs.
- Agent workspace: runtime area for agent task inputs, outputs, logs, handoffs, and temporary work.

## Product Principles

- Do not expose the platform development repository source tree as an installed customer feature.
- Do not expose source maps, internal history, specs, or unredacted logs in public/support builds without explicit approval.
- Data stores and logs are runtime data planes, not source code.
- Before retaining raw logs long-term or using them as model input, classify them with provenance, redaction, and retention rules.
- Agent definitions belong in `agent-platform/configs/agents/`; agent runtime work belongs in the installed app's agent workspace plane.

## Implementation Sequence

1. Define runtime store schemas first.
2. Build OS-aware app data/log/cache directory adapters.
3. Separate task records, decision inbox, evidence, logs, and agent work packets.
4. Implement retention, redaction, and support export.
5. Run installer payload audit to confirm source tree, `_private`, unredacted logs, and private snapshots are not bundled.

## Current State

- This repository is still the development repository; some generated snapshots and history are tracked for development and validation.
- Tauri local/internal builds work, but public distribution is not ready until signing, notarization, privacy review, and payload audit pass.
- The next implementation should move toward runtime data directory adapters and installer payload audit.
