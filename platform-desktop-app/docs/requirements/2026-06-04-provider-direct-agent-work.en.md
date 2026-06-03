# Provider Account Direct Work Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-082 | The desktop app shall run model work directly from a local Ollama model or connected OpenAI, Anthropic, and Gemini accounts without requiring an external CLI. | must | `run_provider_agent_task`, `ProviderAgentTaskReport`, `call_ollama_provider_api` |
| REQ-PDA-083 | The Search Agent Work Chat shall let the user select a provider and model, then prefer direct model execution when a local runtime or connected account is available. | must | `SearchAgentWorkChatPanel`, `agent-provider-run-controls`, `agent-model-picker`, `run_provider_agent_task` invoke |
| REQ-PDA-084 | Direct provider results shall appear in chat and be persisted as task-run `record.json`, `stdout.log`, and `stderr.log` artifacts. | must | `persist_provider_agent_task_run`, `task_runs_base_path` |
| REQ-PDA-085 | Direct provider task records shall not store raw secrets or export them through support bundles; they shall keep only safe metadata such as provider id, model, status, and HTTP status. | must | `credential_policy: secret_not_persisted`, support export exclusion |
| REQ-PDA-086 | When direct provider execution fails or no account is connected, the app shall fallback to optional CLI lanes or guide the user to settings without blocking the whole app. | should | chat fallback messages, `capability_missing` behavior |
| REQ-PDA-087 | The desktop app shall refresh local Ollama model lists through `list_provider_models` and show `/api/tags` failures as catalog state rather than whole-app failure. | must | `ProviderModelCatalogReport`, `list_provider_models`, `local_model_runtime_unavailable` |
| REQ-PDA-088 | Settings shall present Ollama as a keyless local runtime with install, docs, and endpoint state instead of an API-key form. | must | `provider-local-runtime-note`, `Ollama / Local`, Settings provider accounts |

## Decisions

- When a local Ollama runtime or connected account is available, the Search Agent Work Chat `Start Work` action prefers direct model execution.
- External CLIs remain optional fallback lanes.
- The direct-run system prompt constrains the model from claiming source edits or shell commands unless the prompt contains evidence.
- Ollama is treated as a local HTTP runtime at `127.0.0.1:11434`; no API key is stored.
- OAuth desktop flow and OS keychain storage remain separate public-release security improvements.
