# 2026-06-05 Tool Deploy Workbench 웹 검색

## 질의

- `tool deployment UI preflight package release rollback developer tool best practices`
- `Amazon Bedrock AgentCore Gateway deploy tool target preflight official docs`
- `JetBrains deploy run configuration before launch rollback UI official docs`
- `MCP tool deployment package validation rollback workflow best practices`

## 확인한 출처

- AWS AgentCore Gateway target CLI docs: gateway target 추가는 tool schema file과 target 설정을 분리해 다룬다.
- AWS AgentCore overview/docs: Gateway는 tools를 build, deploy, discover, connect하는 AgentCore 구성요소다.
- JetBrains run/debug configuration docs: 실행 전 configuration error를 사용자가 수정할 수 있게 드러내고 설정은 공유/백업 가능한 파일로 관리된다.
- MCP best practice reference: production tool 배포에는 schema validation, least privilege, observability, signed/minimal packaging, rollback/runbook이 필요하다.

## 계획 영향

- Tool Studio `툴 배포` 화면에 target 선택, release command, artifact, preflight, auth/observability, rollback preview를 추가했다.
- 실제 배포 실행이 아니라 사전점검과 배포 계획을 분리한 UI 계약으로 제한했다.

## 불확실성

- 실제 AgentCore Gateway target 생성과 credential provider 연결은 별도 구현 범위다.
- 현재 배포 명령은 preview/dry-run 안내이며 실제 command runner에 연결하지 않았다.
