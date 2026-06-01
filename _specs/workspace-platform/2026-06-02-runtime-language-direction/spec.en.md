# Spec: Runtime Language Direction

## Purpose

Implement `REQ-WS-051` by recording component-specific language and runtime selection criteria.

## Requirement

- `REQ-WS-051`

## Behavior

- Do not make Python, TypeScript/Next.js, Rust/Tauri, Go, or Electron a universal standard.
- Select by component boundary and measured bottleneck.
- Current defaults are Python agent layer, TypeScript/Next.js UI, Rust/Tauri desktop shell, Go local service/CLI, and Electron fallback.
- Before moving to Rust or Go, record prototype measurements and rollback plan.

## Change Targets

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_docs/policies/runtime-language-selection-policy.*.md`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/docs/packaging-strategy.*.md`
- Requirements, specs, history, and evaluation records

## Acceptance Criteria

- The new language decision registry passes self-documenting config contract.
- The desktop distribution registry includes Go/Wails/local service comparison.
- Policy docs exist as Korean and English companions.
- Memory bootstrap includes runtime language direction as a warm anchor.
- Web search, research, and evaluation records preserve evidence and limits.
