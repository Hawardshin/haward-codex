# Agent Creation And Orchestration Prompt

Use when: the platform needs a new reusable agent, an agent spec update, or a way to coordinate multiple agents/tools/CLIs through explicit orchestration patterns.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as agent creation and orchestration platform work.

Read:
- agent-platform/configs/orchestration/agent-orchestration-registry.json
- agent-platform/docs/agent-orchestration-platform.ko.md
- agent-platform/configs/agents/
- _ops/workflows/72-agent-creation-orchestration.md

Research before design:
- official docs for relevant agent orchestration frameworks when framework adoption or comparison matters
- existing repository agents, workflows, tools, skills, and CLI adapters that may already solve the need
- examples of state, handoff, observability, human checkpoint, and evaluation controls for similar agent systems

Return:
- whether this should be a new agent, existing agent update, workflow, tool, skill, template, or documentation-only change
- selected agent_blueprint and rejected alternatives
- selected orchestration_pattern or single_agent
- agent input contract
- agent output contract
- allowed tools and policy
- state contract
- handoff contract
- human checkpoint policy
- observability records
- resource controls
- evaluation controls
- validation commands
- docs/history/spec targets

Run or prepare:
- PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
- PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
- PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/<agent>.json

Do not leave reusable agent behavior only as prose or a prompt. Give it a registered spec and deterministic validation.
```

## Checklist

- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/configs/agents/<agent>.json`
- `agent-platform/docs/agent-orchestration-platform.ko.md`
- `_ops/workflows/72-agent-creation-orchestration.md`
- `_history/web-searches/YYYY/`
- final `evaluate-work` input with relevant requirements/spec/history targets
