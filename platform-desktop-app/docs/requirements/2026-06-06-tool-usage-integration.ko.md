# Tool Usage Integration 요구사항

작성일: 2026-06-06
소유 프로젝트: `platform-desktop-app`
범위: Workspace Monitor Tool Studio, snapshot collector, product feature registry

## 사용자 요구

사용자가 현재 Codex가 쓰는 도구들과 사용 방식을 플랫폼에도 녹여 달라고 요청했다. 단순 설명 문서가 아니라 소스와 UI에 반영되어야 한다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-TUI-001 | 플랫폼은 웹 조사, 로컬 탐색, 패치 편집, 렌더러 검증, 데스크톱 패키징, 리소스 정리, Git 마감 루프를 데이터로 표현해야 한다. | must | `tool-usage-integration-registry.json` |
| REQ-TUI-002 | Workspace snapshot은 도구 사용 패턴, 검증 ladder, adoption backlog를 `toolUsageIntegration`으로 수집해야 한다. | must | collector test |
| REQ-TUI-003 | Tool Studio는 source-backed Agent Tool Playbook을 표시하고 선택, 복사, 검증 명령 확인을 지원해야 한다. | must | UI static test, browser smoke |
| REQ-TUI-004 | customer snapshot에서는 내부 소스 경로와 backlog target path를 제거하되 공개 가능한 패턴과 공식 출처는 유지해야 한다. | should | customer snapshot test |
| REQ-TUI-005 | 제품 기능 레지스트리는 이 기능을 Root Tool Management의 현재 자산과 검증 gate로 연결해야 한다. | should | product feature registry diff |

## 비범위

- 이번 변경은 플레이북을 실제 버튼 하나로 자동 실행하는 runner까지 만들지 않는다.
- 설치, 외부 비용, destructive git 동작, secret-bearing 동작은 자동화하지 않는다.
