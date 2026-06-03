# Provider Account Connection Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-076 | The desktop app shall let users manage ChatGPT/OpenAI, Claude/Anthropic, and Gemini/Google account connections directly from Settings. | must | `ProviderAccountsPanel`, `list_provider_credentials` |
| REQ-PDA-077 | Account connection shall use provider-supported API keys or official auth flows, not unofficial embedded web sessions or copied cookies. | must | provider docs links, `setupUrl`, `docsUrl` |
| REQ-PDA-078 | Stored provider credentials shall never expose raw secrets in UI, reports, or support bundles; only short previews and connection state may be shown. | must | `ProviderCredentialSummary`, `credential_secret_preview`, support export exclusions |
| REQ-PDA-079 | Stored credentials shall be injected into matching guest CLI adapter sessions through provider-specific environment variables so connections affect real work execution. | must | `provider_env_for_adapter`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` |
| REQ-PDA-080 | Users shall be able to open official key setup, login, and docs links, then save, clear, and refresh provider credentials from each provider row. | must | `open_provider_auth_url`, settings provider actions |
| REQ-PDA-081 | The provider credential store shall be separated under app config and surfaced through runtime data boundary and service readiness status. | should | `provider_credentials_path`, `provider_credential_store`, service readiness |

## Decision

- Do not embed ChatGPT, Claude, or Gemini web apps in a WebView or capture browser session cookies.
- This slice uses a local app config secret file as the storage adapter; before public release, replace it with an OS keychain or credential-manager adapter.
- Saved keys are injected only into the matching adapter's environment variables.
- Missing provider credentials do not block the whole app; the runtime and settings surfaces show `account needed` instead.
