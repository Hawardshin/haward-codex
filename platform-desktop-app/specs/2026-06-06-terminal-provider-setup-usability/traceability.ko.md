# Traceability: Terminal and Provider Setup Usability

| Requirement | Evidence |
| --- | --- |
| REQ-TPS-001 | `RuntimeTerminalDrawer.tsx`, `.terminal-usage-guide`, `tool-studio.test.mjs` |
| REQ-TPS-002 | `ProviderAccountsPanel`, `.provider-login-fast-lane`, `data-provider-login-card` |
| REQ-TPS-003 | `onOpenUrl(provider, localRuntime ? "setup" : "login")` primary action |
| REQ-TPS-004 | `src-tauri/src/lib.rs`, fallback provider report URLs, usage doc official links |
| REQ-TPS-005 | `docs/usage/terminal-and-ai-provider-setup.ko.md`, README link |
| REQ-TPS-006 | Existing save/clear/list provider commands unchanged; tests and package validation |
