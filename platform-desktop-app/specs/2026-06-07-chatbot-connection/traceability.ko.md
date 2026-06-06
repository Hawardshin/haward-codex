# Traceability: Chatbot Connection

날짜: 2026-06-07

## 요구사항 추적

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 챗봇 연결 상태 표시 | `SearchAgentWorkChatPanel`의 `agent-chat-connection-strip` | `tool-studio.test.mjs`, Browser smoke |
| 모델 API 연결 필요/연결됨 표시 | `provider-api` connection item | `data-chatbot-connection-item={item.id}` contract |
| 모델 라우팅 표시 | `model-route` connection item, 기존 `routeDecision` 재사용 | `model-routing-controls.test.mjs`, renderer test |
| 터미널 fallback 표시 | `terminal-fallback` connection item, `onOpenTerminal` action | Browser smoke |
| 작업 실행 저장소 표시 | `task-run-store` connection item | 로컬라이제이션 test, Browser smoke |
| provider 설정 진입 | `onOpenProviderSettings` prop | `tool-studio.test.mjs`, Browser smoke |
| 명령 팔레트 진입 | `connect-chatbot` command item | `tool-studio.test.mjs` |

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 기록 파일

- `platform-desktop-app/docs/requirements/2026-06-07-chatbot-connection.ko.md`
- `platform-desktop-app/specs/2026-06-07-chatbot-connection/spec.ko.md`
- `_history/request-traces/2026/2026-06-07-chatbot-connection.ko.md`
