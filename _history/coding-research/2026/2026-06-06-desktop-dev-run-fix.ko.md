# Coding research: desktop dev/run fix

## technology_stack

- Tauri v2.11.2 desktop shell
- tauri-plugin-updater 2.10.1
- Next.js 16 static renderer
- pnpm workspace scripts

## technology_official_docs

- Tauri Develop: https://v2.tauri.app/develop/
- Tauri Configuration: https://v2.tauri.app/reference/config/
- Tauri Updater: https://v2.tauri.app/plugin/updater/
- Next.js Static Exports: https://nextjs.org/docs/pages/guides/static-exports

## stack_version_constraints

- Existing `@tauri-apps/cli` 2.11.2 and Rust dependencies are retained.
- No dependency installation occurred.

## source_types

- official_docs
- local_source
- local_runtime_reproduction

## reference_config_paths

- `platform-desktop-app/src-tauri/tauri.conf.json`
- `platform-desktop-app/package.json`
- `package.json`
- `_ops/workflows/63-installable-software-productization.md`
- `_ops/workflows/69-resource-leak-prevention.md`

## language_options

- JSON/package scripts: needed for command exposure and Tauri config path. Selected.
- Rust conditional plugin registration: needed because updater panic occurs inside Tauri runtime startup. Selected.
- Shell-only workaround: rejected because README commands would remain brittle.

## selected_language

JSON, JavaScript, Rust.

## language_decision_notes

The failure crossed package scripts, Tauri JSON config, and Rust plugin initialization. Fixing only one layer did not restore the full README build/run path.

## architecture_options

- Conditional updater plugin registration based on embedded Tauri config: selected. Internal/dev config can run while public generated config still enables updater.
- Always configure dummy updater keys: rejected. Dummy public keys and endpoints would blur release gates and could create misleading update behavior.
- Remove updater plugin entirely: rejected. Public release readiness tests expect updater integration to remain present.

## code_reference_sources

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/scripts/public-release-config.mjs`
- `platform-desktop-app/scripts/readiness/desktop-build-pipeline.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## code_reference_notes

Public release config already injects `plugins.updater` only for public builds. The runtime now mirrors that boundary by registering the updater plugin only when the embedded config has an updater object.
