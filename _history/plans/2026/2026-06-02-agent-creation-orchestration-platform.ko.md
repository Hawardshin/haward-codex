# 계획 기록: Agent Creation And Orchestration Platform

## 모드 선택

- 선택 모드: `governance`
- 이유: 사용자 요청이 플랫폼의 durable operating rule, agent creation contract, orchestration structure, validation gate를 바꾸는 요구였기 때문에 requirements/spec/history/evaluation이 blocking인 governance 작업으로 처리했다.
- override: 없음.

## 근거

- 웹 검색: `_history/web-searches/2026/2026-06-02-agent-creation-orchestration-platform.ko.md`
- 요구사항: `REQ-WS-060`
- spec: `_specs/workspace-platform/2026-06-02-agent-creation-orchestration-platform/`
- 내부 참조: 기존 `configs/agents/`, CLI command pattern, memory bootstrap, prompt router, ops index.

## 계획

1. 공식 multi-agent framework 문서와 내부 agent/CLI 구조를 확인한다.
2. agent creation/orchestration을 공통 요구사항으로 추가한다.
3. framework-neutral registry를 만들고 자체 설명 계약을 충족시킨다.
4. registry 검증 모듈과 CLI를 만든다.
5. agent-orchestrator spec, docs, workflow, prompt를 추가한다.
6. memory/bootstrap, navigation, history, evaluation을 연결한다.
7. 테스트, config contract, memory bootstrap, workspace health를 검증한다.

## 완료 기준

- `check-agent-orchestration`이 `ready`를 반환한다.
- 전체 agent-platform 테스트가 통과한다.
- history/request trace/work summary/evaluation이 남는다.
