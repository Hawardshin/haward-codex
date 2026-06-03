# 추적성

| 요구사항 | 구현/문서 | 검증 |
| --- | --- | --- |
| REQ-PDA-082 | `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/src-tauri/Cargo.toml` | `run_provider_agent_task`, `cargo check` |
| REQ-PDA-083 | `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`, `app/globals.css` | renderer `check`, readiness token checks |
| REQ-PDA-084 | `persist_provider_agent_task_run`, `task_runs_base_path` | task-run record compatibility, desktop tests |
| REQ-PDA-085 | `credential_policy: secret_not_persisted`, support bundle exclusion policy | service/readiness checks |
| REQ-PDA-086 | `launchSearchAgent` provider direct try/catch fallback | renderer `check`, chat fallback messages |

## 출처

- OpenAI API authentication and Responses API docs
- Anthropic API authentication and Messages API docs
- Gemini API key and generateContent API docs
- 기존 `2026-06-04-provider-account-connection` 요구사항/스펙
