# 작업 요약

- 날짜: 2026-06-04
- 프로젝트: `platform-desktop-app`

## 완료

- Tauri provider 목록에 `Ollama / Local` keyless local HTTP provider를 추가했다.
- `list_provider_models` command를 추가하고 Ollama `GET /api/tags` catalog를 읽게 했다.
- `run_provider_agent_task`에서 Ollama `POST /api/chat` 실행을 지원하게 했다.
- 검색 에이전트 작업 채팅에 모델 목록 새로고침 버튼, datalist 기반 직접 입력, local/provider 상태 문구를 추가했다.
- 설정 > 초기화 > 계정 연결에서 Ollama를 API key 폼이 아니라 로컬 런타임 카드로 표시했다.
- runtime contract, service readiness, product feature, user flow, 요구사항/스펙 추적성을 갱신했다.

## 검증

- `cargo check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app run service:readiness`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Playwright smoke: Agents 화면에서 `Ollama / Local`, `모델`, `로컬 실행`, `.agent-model-picker`, `.agent-model-refresh-button` 확인
- Playwright smoke: 설정 > 초기화 > 계정 연결에서 `Ollama / Local`, `로컬 런타임`, `127.0.0.1:11434`, `API key 없음` 확인
