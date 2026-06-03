# 평가: Provider 계정 기반 직접 작업 실행

## 결과

- 연결된 OpenAI, Anthropic, Gemini credential을 기반으로 provider API를 직접 호출하는 `run_provider_agent_task` Tauri command를 추가했다.
- Search Agent Work Chat에서 실행 계정과 모델을 선택할 수 있게 했다.
- 연결된 provider 계정이 있으면 `작업 시작`이 직접 provider API 작업을 우선 실행하고, 실패하거나 계정이 없으면 기존 optional CLI lane으로 fallback한다.
- 직접 실행 결과는 채팅 메시지로 표시하고, task-run store에 `record.json`, `stdout.log`, `stderr.log`로 저장한다.
- provider direct task record에는 raw secret을 저장하지 않는다.

## 요구 충족 평가

- 사용자의 “그걸 기반으로 실제로 작업도 하는거야” 요구는 단순 계정 연결이 아니라 provider 계정 기반 직접 실행으로 반영됐다.
- 기존 검색 에이전트 작업 채팅이 실제 작업 진입점이 됐다.
- 앱이 primary host runtime으로 task state와 accumulated data를 소유하고, CLI는 fallback/guest lane으로 남았다.

## 검증

- `cargo check` passed
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check` passed
- `corepack pnpm --filter platform-desktop-app test` passed, 21 tests
- `corepack pnpm --filter platform-desktop-app run check` passed
- `corepack pnpm --filter workspace-monitor test` passed, 17 tests
- `corepack pnpm --filter workspace-monitor run build:customer` passed
- JSON parse checks passed
- changed config contract checks passed
- `git diff --check` passed
- Browser smoke passed: `검색 에이전트 작업 채팅`, `실행 계정`, provider options, `모델`, `gpt-5.2`, `CLI 대체` 확인

## 남은 리스크

- 실제 provider API call은 사용자의 API key가 필요하므로 자동 검증에서 live call은 실행하지 않았다.
- public release 전에는 local app config secret file을 OS keychain/credential manager adapter로 교체해야 한다.
- 모델명은 provider별 최신 상태가 바뀔 수 있어 UI에서 수정 가능하게 뒀다.

## Close-Out Targets

- mode_selection_record_targets: `_history/mode-selections/2026/2026-06-04-provider-direct-agent-work.json`
- omission_check_targets: `_history/evaluations/2026/2026-06-04-provider-direct-agent-work-omission-check.json`
- resource_check_targets: `_history/evaluations/2026/2026-06-04-provider-direct-agent-work-resource.json`
- installation_record_targets: `_history/installations/2026/2026-06-04-provider-direct-api-reqwest.ko.md`
- request_trace_targets: `_history/request-traces/2026/2026-06-04-provider-direct-agent-work.ko.md`
- work_timing_targets: `_history/work-timings/2026/2026-06-04-provider-direct-agent-work.json`
