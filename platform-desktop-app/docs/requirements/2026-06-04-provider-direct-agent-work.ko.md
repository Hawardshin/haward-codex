# 제공자 계정 기반 직접 작업 실행 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-082 | 데스크톱 앱은 연결된 OpenAI, Anthropic, Gemini 계정을 기반으로 외부 CLI 없이 모델 API 작업을 직접 실행할 수 있어야 한다. | must | `run_provider_agent_task`, `ProviderAgentTaskReport` |
| REQ-PDA-083 | 검색 에이전트 작업 채팅은 provider 계정과 모델을 선택하고, 연결된 계정이 있으면 직접 provider API 실행을 우선해야 한다. | must | `SearchAgentWorkChatPanel`, `agent-provider-run-controls`, `run_provider_agent_task` invoke |
| REQ-PDA-084 | 직접 provider 실행 결과는 채팅 메시지로 보여주고, 동일한 실행을 task-run store의 `record.json`, `stdout.log`, `stderr.log`로 저장해야 한다. | must | `persist_provider_agent_task_run`, `task_runs_base_path` |
| REQ-PDA-085 | provider 직접 실행 record는 원문 secret을 저장하거나 support bundle에 내보내지 않아야 하며, provider id, model, status, http status 같은 안전한 메타데이터만 남겨야 한다. | must | `credential_policy: secret_not_persisted`, support export exclusion |
| REQ-PDA-086 | provider 직접 실행이 실패하거나 계정이 없을 때 앱은 기존 optional CLI lane으로 fallback하거나 설정 위치를 안내해야 하며, 전체 앱 사용을 막지 않아야 한다. | should | chat fallback messages, `capability_missing` behavior |

## 결정

- 연결된 계정이 있으면 검색 에이전트 작업 채팅의 `작업 시작`은 provider API 직접 실행을 우선한다.
- 외부 CLI는 계속 보조 실행 lane으로 남기며, provider 계정이 없거나 직접 실행이 실패하면 fallback 경로로 사용한다.
- 직접 실행은 source edit이나 shell command 실행을 했다고 주장하지 않도록 system prompt에서 실행 경계를 고정한다.
- 이번 slice는 API key 기반 직접 실행만 포함한다. OAuth desktop flow와 OS keychain adapter는 public release 보안 개선으로 분리한다.
