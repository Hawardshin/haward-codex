# 평가: 에이전트 작업 채팅

## 결과

- 검색 에이전트 표면을 `SearchAgentWorkChatPanel`로 바꿔 사용자가 채팅 composer에서 작업을 시작하게 했다.
- `작업 시작`은 채팅 메시지를 남기고 `start_cli_adapter_session`에 `taskKind=research_insight_agent`를 전달한다.
- command palette와 Desktop quick start는 터미널 직행이 아니라 `검색 에이전트 작업 채팅`으로 진입한다.
- 제품 기능/사용자 흐름/런타임 계약/readiness 토큰과 요구사항/스펙을 갱신했다.

## 검증

- TypeScript/check, JSON/config contract, platform tests, workspace-monitor tests, product readiness, customer build/audit, browser smoke 통과.
- Browser smoke screenshot: `outputs/browser-smoke/agent-chat-workbench.png`
- `check-omissions`: `coverage_ready`
- `check-resources`: `resource_ready`
- `evaluate-work`: `ready_to_close`

## 남은 리스크

- 정적 미리보기에서는 native Tauri 런타임이 없어 실제 CLI 세션 시작을 화면에서 확인할 수 없다.
- 하단 터미널 drawer는 아직 `DesktopRuntimePanel` 내부 상태에 묶여 있어 Agents 채팅 내부에서 live terminal stream을 직접 보여주려면 runtime state를 상위로 끌어올리는 추가 리팩터링이 필요하다.
