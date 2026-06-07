# Spec: product split handoff

## 목적

`platform-desktop-app`를 Git 작업공간 트래커로 좁히고, agent/tool/Ollama/provider 직접 운영은 `agent-tool-desktop-app`로 보내는 코드 계약을 만든다.

## 결정

- `agents`와 `tools` 섹션은 platform 앱에서 실제 운영 패널을 렌더링하지 않고 `SeparatedOperationsHandoffPanel`을 렌더링한다.
- 결정함과 작업 근거는 platform 앱에 남긴다.
- 별도 앱 실행은 Tauri command `open_agent_tool_desktop_app`로 제공한다.
- command는 workspace root 아래 `agent-tool-desktop-app/`만 대상으로 하고, `corepack pnpm --dir <path> start`를 shell 없이 spawn한다.
- Electron 기반 `agent-tool-desktop-app`은 별도 운영 shell로 agent factory, tool registry, local models, provider runs, runtime gates를 표시한다.

## Acceptance

- `platform-desktop-app` tests/check/build 통과.
- `agent-tool-desktop-app` tests 통과.
- `agents/tools` 렌더 계약이 `SeparatedOperationsHandoffPanel` 중심으로 변경된다.
- root와 두 submodule의 변경이 각각 커밋/푸시된다.
