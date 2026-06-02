# Spec: Real Service Readiness Surface

## Purpose

Feature breadth is not enough for a real service. Operators must be able to see release, support, update, privacy, and onboarding risks inside the app. This improvement keeps internal builds usable while mechanically reporting public service release blockers.

## Feature Scope

- Add `platform-desktop-app/configs/service-readiness-registry.json`.
- Add `scripts/check-service-readiness.mjs` to report service readiness score, group status, blockers, warnings, and next actions in internal/public modes.
- Add `service:readiness` and `service:readiness:public:report` package scripts, and include internal service readiness in the default `check`.
- Add the Tauri `get_service_readiness_report` command.
- Add a Workspace Monitor Desktop `Service Readiness` panel with domain chips, score, public blockers, group checks, and next actions.

## Non-Goals

- Do not issue Developer ID certificates, store notarization secrets, or operate updater endpoints in this slice.
- Do not claim public release readiness.
- Do not yet persist the customer workspace chooser; expose it as a public blocker.

## Acceptance Criteria

- Internal readiness passes without internal blockers while reporting public blockers.
- Public readiness report shows signing/notarization, signed updater, clean-machine smoke, and runtime workspace chooser blockers.
- Desktop UI shows Service Readiness, Public blockers, Signed Distribution, and Update & Recovery.
- Node, TypeScript, Rust, and Tauri validation pass.
