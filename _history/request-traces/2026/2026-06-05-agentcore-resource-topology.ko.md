# 요청 추적: AgentCore Resource Topology

## 요청

- AgentCore와 유사한 플랫폼형 UI 구조 개선.

## 산출물

- 요구사항: REQ-WM-049
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-agentcore-resource-topology/`
- 구현: `MonitorShell.tsx`, `globals.css`
- 테스트: `tool-studio.test.mjs`

## 현재 상태

- 구현, 정적 테스트, check, build, desktop/mobile smoke 완료.
- in-app Browser desktop에서 resource card 9개, selected capability 9개, 수평 overflow 0을 확인했다.
- Playwright mobile 390x844에서 resource card 9개, resource grid 1열, lifecycle 2열, 수평 overflow 0을 확인했다.
