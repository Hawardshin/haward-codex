# 기존 검색 에이전트 실행 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-066 | 데스크톱 앱은 이미 정의된 `research-insight-planner-agent`를 사용자가 설정 파일이나 셸 명령을 직접 찾지 않고 실행할 수 있게 해야 한다. | must | Agents 화면 `SearchAgentWorkChatPanel`, command palette |
| REQ-PDA-067 | 검색 에이전트 실행은 목표, 검색 질문, 검색 채널, 저장 위치, 실행 메모를 구조화해 `research-insight-plan-template` 기준의 초기 입력으로 만들어야 한다. | must | `renderSearchAgentPrompt` |
| REQ-PDA-068 | 실행은 플랫폼 런타임이 소유하는 하단 터미널 lane에서 시작되어야 하며, 결과와 질문은 task-run store와 decision inbox로 축적되어야 한다. | must | `start_cli_adapter_session`, `taskKind=research_insight_agent` |
| REQ-PDA-069 | 검색 에이전트는 새 에이전트 생성 UI보다 앞에 노출되어야 하며, 사용자는 “만들기” 전에 “기존 에이전트 실행”을 먼저 볼 수 있어야 한다. | should | Agents 화면 순서, readiness token |
| REQ-PDA-070 | 검색 에이전트 실행은 데스크톱 quick start와 command palette에서도 접근 가능해야 한다. | should | Desktop quick start, `run-search-agent` command item |
| REQ-PDA-071 | 검색 에이전트의 기본 사용자 표면은 실행 폼이 아니라 작업 채팅이어야 하며, 사용자는 그 채팅에서 실제 작업을 시작해야 한다. | must | `SearchAgentWorkChatPanel`, `SearchAgentChatMessage`, `작업 시작` |

## 결정

- 새 별도 런타임을 만들지 않고 기존 guest adapter 세션 실행 경로를 재사용한다.
- 단, 실행 기록을 찾기 쉽도록 `taskKind=research_insight_agent`와 `research_insight_agent_pipe`를 추가한다.
- 사용자 시작점은 채팅 composer이며, 하단 터미널은 작업 로그와 장기 출력 확인용 보조 표면이다.
- 누락된 선택 CLI는 전체 앱을 막지 않고 기존 `capability_missing` 처리 흐름을 유지한다.
