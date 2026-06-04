# 요구사항: 핵심 기능 우선순위

## 배경

사용자는 이 플랫폼의 핵심 기능을 두 가지로 명확히 정의했다. 첫째, 커스텀 에이전트와 서브에이전트를 매우 쉽게 만들 수 있는 Agent Core다. 둘째, Claude Code, Codex, Gemini, OpenCode 같은 guest CLI 작업을 연속적으로 오케스트레이션하고 중간 의사결정을 모아 나중에 처리할 수 있는 CLI Orchestration이다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-PDA-094 | 첫 화면은 Agent Core와 CLI Orchestration을 두 primary 기능으로 강조해야 한다. | Home과 product feature registry에서 primary feature가 `agent_factory`, `agent_orchestration` 두 개로 제한된다. |
| REQ-PDA-095 | root tool management는 두 core 기능이 공유하는 별도 supporting layer로 보여야 한다. | Home과 설정 표면에 provider accounts, CLI adapters, workspace files, decision routing이 root tool setup으로 노출된다. |
| REQ-PDA-096 | 현재 진행 중인 작업량과 막힌 의사결정은 한눈에 보여야 한다. | Home workload strip이 active tasks, pending decisions, task runs, agents ready를 보여준다. |
| REQ-PDA-097 | 비핵심 기능은 숨기되 접근은 유지해야 한다. | 사용자 기본 navigation은 `overview`, `agents`, `desktop`, `source`, `intent`이고 operator sections는 Operator Center로 분리된다. |
| REQ-PDA-098 | 핵심 기능을 쓰기 전에 필요한 설정이 직관적으로 보여야 한다. | Home과 execution settings에 provider account, Agent Core, CLI lane, auto-defer question setup 단계가 표시된다. |

## 비범위

- 새로운 guest CLI adapter 구현
- 실제 cloud deployment 필수화
- 과거 history 문서의 모든 Agent Factory 표기 일괄 개명

