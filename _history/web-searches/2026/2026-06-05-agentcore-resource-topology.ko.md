# 2026-06-05 AgentCore Resource Topology 웹 검색

## 질의

- `Amazon Bedrock AgentCore Runtime Memory Gateway Identity built-in tools official docs`
- `Amazon Bedrock AgentCore Runtime Memory Gateway browser code interpreter official docs`
- `Amazon Bedrock AgentCore observability evaluations official docs`

## 확인한 출처

- AWS AgentCore FAQ: Runtime, Memory, Gateway, Browser, Code Interpreter, Identity, Policy, Observability, Evaluations를 AgentCore capabilities로 설명한다.
- AWS AgentCore overview: Runtime, Gateway, memory stores, governed access, open framework support를 AgentCore 플랫폼 구성요소로 설명한다.
- AWS AgentCore evaluations docs: Evaluations는 agent 성능 평가 resource를 만들고 관리하는 기능이다.
- AWS AgentCore quotas docs: Runtime, Memory, Identity, Gateway, Browser, Code Interpreter, Evaluations, Policy resource type을 별도 quota 대상으로 나열한다.

## 계획 영향

- AgentCore Quick Builder에 선택된 capability를 Runtime, Memory, Gateway, Built-in Tools, Identity, Policy, Observability, Evaluations 리소스 lane으로 보여주는 topology UI를 추가한다.
- 실제 AWS resource 생성이 아니라 로컬 데스크톱 agent proposal 흐름을 AgentCore-style resource model로 이해시키는 UI 계층으로 제한한다.

## 불확실성

- AWS 서비스의 실제 provisioning/authorization API는 이번 범위가 아니다.
- UI의 lifecycle label은 공식 API 상태명이 아니라 사용자 이해를 위한 제품 표현이다.
