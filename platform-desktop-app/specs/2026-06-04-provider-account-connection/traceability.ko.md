# 추적성: Provider 계정 연결

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PDA-076 | `ProviderAccountsPanel`, settings subsection `providers` | renderer check, browser smoke |
| REQ-PDA-077 | provider setup/login/docs URLs, web-session non-goal docs | readiness tokens, source review |
| REQ-PDA-078 | `ProviderCredentialSummary`, `credential_secret_preview`, support exclusions | Rust check, readiness |
| REQ-PDA-079 | `provider_env_for_adapter`, `create_cli_session` env injection | Rust check, token tests |
| REQ-PDA-080 | `open_provider_auth_url`, provider row actions | renderer check, browser smoke |
| REQ-PDA-081 | `provider_credentials_path`, runtime boundary, service readiness | readiness, JSON parse |
