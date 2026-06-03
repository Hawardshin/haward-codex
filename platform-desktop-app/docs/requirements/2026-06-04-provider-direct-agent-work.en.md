# Provider Account Direct Work Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-082 | The desktop app shall run model API work directly from connected OpenAI, Anthropic, and Gemini accounts without requiring an external CLI. | must | `run_provider_agent_task`, `ProviderAgentTaskReport` |
| REQ-PDA-083 | The Search Agent Work Chat shall let the user select a provider account and model, then prefer direct provider API execution when an account is connected. | must | `SearchAgentWorkChatPanel`, `agent-provider-run-controls`, `run_provider_agent_task` invoke |
| REQ-PDA-084 | Direct provider results shall appear in chat and be persisted as task-run `record.json`, `stdout.log`, and `stderr.log` artifacts. | must | `persist_provider_agent_task_run`, `task_runs_base_path` |
| REQ-PDA-085 | Direct provider task records shall not store raw secrets or export them through support bundles; they shall keep only safe metadata such as provider id, model, status, and HTTP status. | must | `credential_policy: secret_not_persisted`, support export exclusion |
| REQ-PDA-086 | When direct provider execution fails or no account is connected, the app shall fallback to optional CLI lanes or guide the user to settings without blocking the whole app. | should | chat fallback messages, `capability_missing` behavior |

## Decisions

- When an account is connected, the Search Agent Work Chat `Start Work` action prefers direct provider API execution.
- External CLIs remain optional fallback lanes.
- The direct-run system prompt constrains the model from claiming source edits or shell commands unless the prompt contains evidence.
- This slice covers API-key direct execution only. OAuth desktop flow and OS keychain storage remain separate public-release security improvements.
