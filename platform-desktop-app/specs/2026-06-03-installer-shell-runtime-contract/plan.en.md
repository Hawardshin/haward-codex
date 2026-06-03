# Plan: Installer Shell Runtime Contract

1. Run web-first intake for Tauri shell, resource, filesystem, and updater boundaries.
2. Inspect the current `platform-desktop-app` structure, registry, README, runtime data boundary, readiness/test, and Rust command surface.
3. Create `runtime-contracts/` with the shell-readable contract and bootstrap docs.
4. Implement Tauri resource mapping and the Rust contract-read command.
5. Add a contract validator and connect it to package check/readiness/test.
6. Update requirements, architecture docs, project registry, specs, history, and evaluation records.
7. Validate contract/config/test/check/Rust/evaluation, then commit and push.
