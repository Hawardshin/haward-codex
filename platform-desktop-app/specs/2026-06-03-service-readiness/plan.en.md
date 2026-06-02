# Plan: Real Service Readiness Surface

1. Check official and standards sources for desktop production readiness criteria.
2. Separate implemented runtime data/support/release preflight from missing service gates.
3. Add the service readiness registry and check script.
4. Add a Rust/Tauri command.
5. Add the Workspace Monitor Desktop service readiness panel.
6. Update requirements, specs, history, and evaluation.
7. Validate with Next, Node, Rust, Tauri, and browser smoke checks.

## Decisions

- This slice exposes public blockers in the app and report rather than claiming they are resolved.
- Signed updater and notarization credential setup remains follow-up work requiring a human checkpoint.
