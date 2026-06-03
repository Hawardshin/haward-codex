# Web Search Record: AgentCore Blueprint Transfer

날짜: 2026-06-04

## 사용자 지시

`awslabs/agentcore-samples`를 참고해 현재 데스크톱 플랫폼에 반영한다.

## 검색어

- `awslabs agentcore-samples GitHub AWS AgentCore samples`
- `AWS AgentCore samples awslabs GitHub README`
- `AWS Bedrock AgentCore samples official documentation`

## 확인한 출처

- `https://github.com/awslabs/agentcore-samples`
  - 유형: 사용자 제공 공개 GitHub repo
  - 신뢰도: 높음
  - 확인 내용: AgentCore samples 구조, getting-started, features, integrations, infrastructure-as-code, blueprints, Apache-2.0 license.
- `https://docs.aws.amazon.com/bedrock-agentcore/`
  - 유형: AWS 공식 문서
  - 신뢰도: 높음
  - 확인 내용: Runtime, Memory, Gateway, Identity, Browser, Code Interpreter, Observability, Evaluation, Policy가 AgentCore capability 축이다.
- `https://github.com/aws/agentcore-cli`
  - 유형: AWS 공식 CLI repo
  - 신뢰도: 높음
  - 확인 내용: `create`, `dev`, `deploy`, `invoke`, `add`, `logs`, `traces`, `evals` lifecycle.

## 계획 영향

- AgentCore를 필수 runtime으로 설치하지 않고 optional deployment adapter로 둔다.
- 샘플 소스 코드를 복사하지 않고, create/dev/invoke/evaluate 및 capability add 구조를 데스크톱 product blueprint로 이전한다.
- Agents 화면에서 blueprint를 선택하면 Search Agent Work Chat과 Agent Factory 입력을 실제로 채우도록 구현한다.

## 무시한 약한 출처

- 제3자 요약 사이트와 커뮤니티 글은 adoption signal로만 취급하고 구현 근거로 쓰지 않았다.

