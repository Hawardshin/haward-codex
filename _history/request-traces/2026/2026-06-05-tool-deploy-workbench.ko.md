# 요청 추적: Tool Deploy Workbench

## 요청

- Tool Studio의 툴 배포 화면 개선.

## 산출물

- 요구사항: REQ-WM-051
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-tool-deploy-workbench/`
- 구현: `ToolStudioPanel.tsx`, `globals.css`
- 테스트: `tool-studio.test.mjs`

## 현재 상태

- 구현, 정적 테스트, check, build, desktop/mobile smoke 완료.
- in-app Browser desktop에서 workbench, target 3개, action 4개, release/preflight/guardrails/rollback, 수평 overflow 0을 확인했다.
- in-app Browser desktop에서 AgentCore Gateway target 전환 후 `--tool-schema-file`, credential, rollback 문구를 확인했다.
- Playwright mobile 390x844에서 deploy grids 1열 접힘과 수평 overflow 0을 확인했다.
