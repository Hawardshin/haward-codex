# 2026-06-05 AgentCore Multi-Capability 웹 검색

## 질의

- `AWS Bedrock AgentCore Runtime Memory Gateway Tools Observability capabilities official`
- `AWS Bedrock AgentCore multi agent tool gateway memory runtime official docs`
- `agent core capabilities runtime memory tools gateway observability design`
- `site:docs.aws.amazon.com bedrock agentcore runtime memory gateway identity observability code interpreter`

## 확인한 출처

- AWS AgentCore runtime docs: Runtime은 agent/tool code를 호스팅하는 기본 구성요소이며 long-running session과 observability를 전제로 한다.
- AWS AgentCore observability docs: runtime, memory, gateway, built-in tools, identity resource type에 대해 metrics/logs/spans 관측을 제공한다.
- AWS AgentCore generated built-in tools docs: Code Interpreter와 Browser built-in tools가 별도 observability/metrics 대상이다.
- AWS AgentCore gateway/memory observability docs: gateway와 memory는 각각 metrics, logs, spans 또는 기록 단위로 관측 가능하다.
- `awslabs/agentcore-samples`: runtime, memory, gateway, evaluation 샘플 구조를 UI 블루프린트의 참고 원천으로 유지한다.

## 계획 영향

- AgentCore Quick Builder에 Runtime, Memory, Gateway, Browser, Code Interpreter, Identity, Policy, Observability, Evaluations capability bundle을 추가했다.
- 선택된 capability bundle이 agent proposal의 tools, guardrails, output contract에 반영되게 했다.

## 불확실성

- 실제 AWS AgentCore 리소스 생성은 이 변경 범위가 아니다. 현재 구현은 로컬 데스크톱 agent proposal을 만들기 위한 AgentCore-style capability 모델이다.
