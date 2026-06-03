# Plan Record: AgentCore Easy Agent Builder

요청 ID: UR-2026-06-04-009

## 목표

AgentCore의 create/add/dev/evaluate 흐름을 데스크톱 앱의 쉬운 에이전트 생성 경험으로 전환한다.

## 실행 요약

- 웹/공식 출처 확인
- 기존 AgentCore blueprint prefill과 Agent Factory proposal writer 연결
- `AgentCore Quick Builder` UI 추가
- Product/user-flow/reference/service readiness registry 업데이트
- Requirements/spec/history/evaluation 기록
- Type check, tests, customer build, browser smoke로 검증

## 결정

- AgentCore CLI를 필수 설치하지 않는다.
- 새 native command를 만들지 않고 기존 `create_agent_factory_proposal`을 재사용한다.
- Preview browser와 installed native app의 저장 가능 여부를 UI에서 분리해 보여준다.

