# Request Trace: product split handoff

## 요청 요약

사용자는 AI 도구 사용자를 위한 데스크톱 공간을 Git 작업공간/프로젝트 추적 중심으로 재정의하고, agent/tool/Ollama/provider/AgentCore-style 운영 기능은 별도 데스크톱 앱으로 분리하라고 요청했다.

## 산출물

- Platform handoff command: `platform-desktop-app/src-tauri/src/lib_parts/29_agent_tool_desktop_handoff.rs`
- Platform handoff UI: `platform-desktop-app/renderer/workspace-monitor/components/features/SeparatedOperationsHandoffPanel.tsx`
- Monitor integration: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- Agent/tool desktop receiving shell: `agent-tool-desktop-app/src/main.mjs`, `agent-tool-desktop-app/src/renderer/`
- Tests/contracts: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`, `agent-tool-desktop-app/tests/desktop-shell.test.mjs`

## 검증 링크

- `_specs/workspace-platform/2026-06-08-product-split-handoff/validation.ko.md`
- `_history/evaluations/2026/2026-06-08-product-split-handoff.ko.md`
- `_history/omission-checks/2026/2026-06-08-product-split-handoff.json`
- `_history/resource-checks/2026/2026-06-08-product-split-handoff.json`

## 결과

요청의 핵심 제품 경계는 구현됐다. 플랫폼 앱은 프로젝트 추적과 guest AI coding tool 실행/관찰에 집중하고, 분리 대상 운영 기능은 별도 데스크톱 앱으로 인계된다.
