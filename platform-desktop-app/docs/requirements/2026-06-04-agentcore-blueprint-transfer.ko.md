# AgentCore Blueprint Transfer Requirements

날짜: 2026-06-04
소유 프로젝트: `platform-desktop-app/`

## 배경

사용자가 `awslabs/agentcore-samples`를 참고 대상으로 제시했다. 이 링크는 단순 조사 자료가 아니라, AgentCore 샘플의 생산형 에이전트 구조를 현재 데스크톱 플랫폼 기능으로 녹이라는 요구로 해석한다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-PDA-087 | Agents 화면은 AgentCore식 production blueprint를 실제 선택 가능한 제품 표면으로 제공해야 한다. | `Production Agent Blueprints` 패널이 runtime, memory, gateway/tool, evaluation-guarded blueprint를 표시한다. |
| REQ-PDA-088 | Blueprint 선택은 문서 링크 표시에서 끝나지 않고 runnable input을 변경해야 한다. | 선택한 blueprint가 Search Agent Work Chat 입력과 Agent Factory proposal 입력을 채운다. |
| REQ-PDA-089 | AWS AgentCore는 선택형 배포 adapter로 취급해야 한다. | UI와 registry가 AWS/AgentCore CLI를 필수 로컬 runtime이 아니라 optional deployment adapter로 설명한다. |
| REQ-PDA-090 | AgentCore reference transfer는 공개 출처와 라이선스 경계를 기록해야 한다. | reference registry와 web-search record가 AWS 공식 문서, awslabs repo, Apache-2.0 경계, 코드 미복사 정책을 남긴다. |
| REQ-PDA-091 | Readiness/test는 AgentCore blueprint UI와 registry 계약 누락을 잡아야 한다. | platform check와 Node tests가 `AgentCoreBlueprintPanel`, `agentcore-blueprint-panel`, `agentcore-style-production-agent-blueprints` 토큰을 검증한다. |

## 비범위

- AgentCore CLI 설치 또는 AWS 계정 설정을 자동 수행하지 않는다.
- AgentCore 샘플 소스 코드를 제품에 복사하지 않는다.
- AWS 배포를 공개 출시 완료 상태로 주장하지 않는다.

