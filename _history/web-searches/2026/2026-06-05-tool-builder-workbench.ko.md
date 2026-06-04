# 2026-06-05 Tool Builder Workbench 웹 검색

## 질의

- `tool builder UI workflow create tool configure inputs test deploy best practices`
- `JetBrains IDE tool window action context menu create run configuration UI patterns official`
- `Amazon Bedrock AgentCore Gateway create tools MCP API official docs`
- `OpenAPI tool creation UI schema inputs outputs validation developer experience best practices`

## 확인한 출처

- AWS AgentCore Gateway docs: Gateway는 AI agent가 tools/services를 discovery하고 호출하는 표준 방법을 제공하며 OpenAPI/MCP target과 credential provider를 연결한다.
- AWS AgentCore Gateway quickstart/toolkit docs: Gateway는 tool build, deploy, discover, connect 흐름을 지원하며 MCP gateway/target 생성 명령이 분리되어 있다.
- JetBrains UI docs: tool window는 작업별 pane로 구성되며 action과 shortcut, context menu가 사용자의 IDE 흐름에 맞게 배치된다.
- JetBrains run configuration docs: 실행 설정은 UI에서 관리되고 저장되며 context에서 생성될 수 있다.

## 계획 영향

- Tool Studio `툴 만들기` 화면을 template 선택, manifest, source/schema, run/package command, output contract, 액션으로 나눈 제작 작업대로 바꿨다.
- 실제 외부 Gateway 생성은 제외하고, 로컬 제작 계약을 먼저 보여주는 UI로 제한했다.

## 불확실성

- 실제 파일 scaffold와 배포 실행은 별도 구현 범위다.
- 현재 template는 UI 계약이며 실제 repository scaffold 생성과는 연결하지 않았다.
