# Runtime Data Boundary Implementation Plan

## Work Mode

- Selected: `governance`
- Reason: The user instruction changes durable steering for installed-product structure, customer source visibility, and accumulated agent/log/data locations.

## Steps

1. Check official sources for runtime app data, bundle/resource, and OS app-data boundaries.
2. Define repository source, installed app bundle, runtime data/log/cache/agent workspace planes in a registry.
3. Update product boundary docs, persistent instructions, and memory bootstrap anchor.
4. Add readiness/test tokens that catch boundary drift.
5. Record requirements, spec, web-search, request trace, and evaluation artifacts.
6. Run JSON/config/test/Rust/Tauri build verification, then commit and push.

## Decisions

- Actual storage adapter implementation is deferred to a later slice.
- The customer-hidden platform source rule is first locked through installer payload policy and customer visibility policy.
- Agents separate reusable definitions/registries from runtime work planes.
