# Plan: Manager Tool Orchestration Planner

## 모드 선택

- `work_mode`: `governance`
- 이유: reusable agent orchestration 도구와 CLI, 요구사항 baseline, registry, 문서, 평가 기록이 바뀐다.

## 구현 계획

1. 웹 검색으로 최신 manager/subagent/tool 패턴을 확인한다.
2. 기존 `REQ-WS-060`, agent orchestration registry, agent specs, CLI 패턴을 확인한다.
3. Python-first 구현을 선택하고 TypeScript/외부 framework 설치는 제외한다.
4. `agent_platform.orchestration.manager_tool` 모듈을 추가한다.
5. `plan-agent-orchestration` CLI를 추가한다.
6. `manager-tool-plan-template.json`을 자기 설명형 config로 추가한다.
7. `agent-orchestrator-agent`와 agent orchestration registry에 새 도구를 연결한다.
8. 단위 테스트, CLI, config contract, agent orchestration check를 실행한다.
9. history, omission, grounding, evaluation, timing, request trace를 남긴다.

## 아키텍처 옵션

- 옵션 A: framework-neutral deterministic planner
  - 장점: 설치 불필요, 기존 agent spec/registry와 바로 맞고 테스트 가능하다.
  - 단점: 실제 LLM 실행, streaming, trace persistence는 아직 없다.
- 옵션 B: OpenAI Agents SDK 또는 LangGraph runtime adapter 즉시 설치
  - 장점: 실제 manager-as-tools 실행까지 빠르게 갈 수 있다.
  - 단점: 설치 감사, adapter 경계, provider 설정, runtime resource guard가 필요하고 이번 요청의 “쉽게 만들 구조”보다 범위가 커진다.

## 결정

옵션 A를 선택한다. 이번 변경은 실행 전 계획 도구이며, 실제 runtime adapter는 별도 요구사항과 설치 감사가 준비된 뒤 붙인다.
