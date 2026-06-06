# Coding Research: Terminal and Provider Setup Usability

날짜: 2026-06-06

## Technology Stack

- Frontend: React/Next renderer in `platform-desktop-app/renderer/workspace-monitor`
- Native shell: Rust/Tauri v2 in `platform-desktop-app/src-tauri`
- Terminal: native PTY command bridge with xterm.js surface
- Provider credentials: local app config credential file with redacted reports

## Official Docs Checked

- OpenAI API authentication: https://platform.openai.com/docs/api-reference/authentication
- OpenAI project API keys: https://platform.openai.com/docs/api-reference/project-api-keys
- Gemini API keys: https://ai.google.dev/gemini-api/docs/api-key
- Vertex AI authentication: https://docs.cloud.google.com/vertex-ai/docs/authentication
- xterm.js addons: https://xtermjs.org/docs/guides/using-addons/

## Language Options

- TypeScript/React only: fastest for visible settings and terminal guidance, but cannot update native URL registry.
- Rust only: can update provider registry, but cannot improve renderer usability alone.
- Selected: TypeScript/React plus small Rust registry edits and Markdown docs.

## Architecture Options

- Full OAuth/device login: not selected because OpenAI API key issuance still requires user authorization and Gemini OAuth/ADC needs separate registered provider flow.
- Official key-page fast lane: selected because it respects provider docs, avoids web session cookie storage, and improves user path immediately.
- Terminal profile system: deferred because it requires persistent terminal profile store and process lifecycle changes beyond the current request.

## Reference Code Sources

- Existing `ProviderAccountsPanel` and Tauri provider credential commands.
- Existing `RuntimeTerminalDrawer` native PTY command center.
- Existing provider account connection spec from `platform-desktop-app/specs/2026-06-04-provider-account-connection`.

## Implementation Decision

- Keep credential storage model unchanged.
- Change OpenAI/Gemini `login_url` to official API key pages.
- Add fast-lane cards and remove duplicate provider setup/login buttons.
- Add terminal start usage cards and a durable Korean usage doc.

## Post-Research Questions

- Is true login-only setup possible now? Not safely for OpenAI API work without an official OAuth/provider app flow; API key remains required.
- Can Gemini support login-based auth? Vertex AI/ADC can, but it is a separate production flow with Google Cloud project setup.
- What is the reversible path? Remove fast-lane UI, restore provider URLs, and keep credential store unchanged.
