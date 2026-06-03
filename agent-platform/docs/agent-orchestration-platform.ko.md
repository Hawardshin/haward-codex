# 에이전트 생성 및 오케스트레이션 플랫폼

## 목적

이 플랫폼은 단일 챗봇을 만드는 공간이 아니라, 반복되는 인간의 작업을 작은 에이전트로 만들고 필요할 때 여러 에이전트를 연결해 실행하는 작업 공간이다. 새 에이전트는 임시 프롬프트가 아니라 입력, 출력, 도구, 정책, 상태, 핸드오프, 검증 조건을 가진 재사용 가능한 capability로 관리한다.

기준 설정은 `agent-platform/configs/orchestration/agent-orchestration-registry.json`이다.

## 기본 원칙

- 에이전트는 명확한 입력과 출력 계약을 가져야 한다.
- 에이전트가 사용할 도구, 스킬, CLI, 파일 범위는 spec 또는 workflow에 드러나야 한다.
- 여러 에이전트를 엮을 때는 supervisor/router, 순차 pipeline, 병렬 fan-out/merge, handoff network 같은 패턴을 먼저 고른다.
- 상태, 핸드오프, 사람 결정, 관찰성, 리소스, 평가가 암묵적으로 남으면 안 된다.
- 특정 프레임워크에 종속하지 않는다. LangGraph, AutoGen, CrewAI, OpenAI Agents SDK 같은 외부 프레임워크는 구현 후보나 참고 자료로 보고, 플랫폼의 계약은 framework-neutral하게 유지한다.

## 새 에이전트 생성 흐름

1. 요청 의도와 프로젝트 경계를 정한다.
2. `research_agent`, `planning_agent`, `execution_agent`, `evaluation_agent`, `integration_agent`, `domain_project_agent` 중 가장 작은 blueprint를 선택한다.
3. 필요한 조사와 기존 에이전트/도구 재사용 여부를 확인한다.
4. 의미 있는 변경이면 요구사항과 spec artifacts를 남긴다.
5. `agent-platform/configs/agents/`에 agent spec을 만든다.
6. 도구, 스킬, CLI adapter, 설치 필요성을 명시한다.
7. 여러 에이전트가 연결되면 orchestration pattern과 controls를 기록한다.
8. 검증 명령을 실행하고 history/evaluation을 남긴다.

## 오케스트레이션 패턴

- `single_agent`: 하나의 agent가 독립적으로 끝낼 수 있을 때.
- `supervisor_router`: 요청 유형이나 위험도에 따라 supervisor가 전문 agent를 고를 때.
- `sequential_pipeline`: 조사, 계획, 구현, 평가처럼 단계 산출물이 다음 단계 입력이 될 때.
- `parallel_fanout_merge`: 독립 lane을 병렬로 처리하고 merge gate에서 합칠 때.
- `handoff_network`: 전문 agent 사이에서 동적으로 제어를 넘겨야 할 때.

## Manager-As-Tools 계획 도구

`plan-agent-orchestration`은 실제 LLM runtime을 실행하지 않고, 등록된 agent spec을 읽어 중앙 manager가 subagent를 도구처럼 호출하는 계획 JSON을 만든다. 기본 manager는 `agent-orchestrator-agent`이고, 기본 패턴은 `supervisor_router`다.

이 도구의 역할은 세 가지다.

- manager가 route, subagent tool 호출, merge, evaluation을 계속 소유하게 만든다.
- subagent마다 `run_<agent_name>` 형태의 tool name, input/output contract, 허용/차단 도구, policy, docs target을 명시한다.
- 실제 LangGraph, CrewAI, OpenAI Agents SDK 같은 runtime adapter를 붙이기 전에 agent roster, handoff/state/control, validation command를 검증 가능한 구조로 만든다.

예시:

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli plan-agent-orchestration configs/orchestration/manager-tool-plan-template.json
```

## 검증 명령

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli plan-agent-orchestration configs/orchestration/manager-tool-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
```

## 운영상 주의

여러 agent를 연결하는 작업은 느려지거나 리소스를 오래 붙잡을 수 있다. 장시간 실행, subprocess, 브라우저, queue, cache, stream, 파일 핸들, 서버가 생기면 `resource-guard-agent`로 cleanup path와 측정 근거를 확인한다. 병렬 처리라면 `parallel-work-planner-agent`로 touch path, dependency, merge gate를 먼저 분리한다.
