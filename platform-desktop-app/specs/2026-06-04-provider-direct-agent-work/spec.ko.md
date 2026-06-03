# 제공자 계정 기반 직접 작업 실행 스펙

## 목표

연결된 ChatGPT/OpenAI, Claude/Anthropic, Gemini/Google 계정을 단순 설정 상태로 두지 않고, 검색 에이전트 작업 채팅에서 실제 모델 API 작업 실행에 사용한다.

## 범위

- Tauri 백엔드에 provider direct task command를 추가한다.
- provider credential store 또는 환경변수에서 API key를 읽어 allowlisted provider API만 호출한다.
- 검색 에이전트 작업 채팅에서 provider와 model을 선택하고 직접 실행한다.
- 결과를 채팅에 표시하고 task-run store에 `record.json`, `stdout.log`, `stderr.log`로 저장한다.
- provider 직접 실행 실패 시 기존 optional CLI lane으로 fallback한다.

## 비범위

- ChatGPT, Claude, Gemini consumer web session 쿠키 저장 또는 WebView 임베드 로그인
- OAuth desktop flow 전체 구현
- OS keychain adapter 전환
- 모델이 직접 파일을 수정하거나 shell command를 실행하는 tool-calling runtime

## 수용 기준

- `run_provider_agent_task` 명령이 Rust/Tauri invoke handler에 등록된다.
- OpenAI Responses API, Anthropic Messages API, Gemini generateContent API 호출 경로가 provider id별로 분리된다.
- 직접 provider task record가 원문 secret 없이 task-run store에 남는다.
- 검색 에이전트 채팅에서 provider/model 선택 UI가 보인다.
- `cargo check`, renderer check, desktop tests/check가 통과한다.
