# 요구사항 변경: desktop project management platform

- 날짜: 2026-06-08
- 상태: baseline
- 관련 이전 요구사항: `_requirements/changes/2026-06-08-workspace-tracker-product-split.ko.md`

## 변경 이유

제품 경계가 `platform-desktop-app/`과 `agent-platform/`으로 나뉜 뒤, 데스크톱 앱의 프로젝트 관리 기능이 실제 사용자 화면과 snapshot model에 구현되어야 한다. 사용자는 agent/tool/Ollama 설정보다 Git 작업공간, 현재 작업, 계획, 마일스톤, 보고서, 근거를 먼저 봐야 한다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-DPMP-001 | 프로젝트 탭은 프로젝트 registry 목록이 아니라 프로젝트 관리 허브여야 한다. | `ProjectManagementPanel`이 portfolio, workflow lanes, milestones, recent trail, default actions를 렌더링한다. |
| REQ-DPMP-002 | workspace snapshot은 프로젝트 관리 모델을 포함해야 한다. | `WorkspaceProjectManagement` 타입과 `projectManagement` snapshot 필드가 있고 collector가 값을 생성한다. |
| REQ-DPMP-003 | 고객용 snapshot은 내부 포트폴리오와 resource path를 제거해야 한다. | `buildCustomerSnapshot`이 project portfolio/recent trail을 비우고 workflow/action 요약만 남긴다. |
| REQ-DPMP-004 | 제품 분리 registry는 프로젝트 포트폴리오와 마일스톤을 home priority/tracked output에 포함해야 한다. | `workspace-tracker-product-split-registry.json`과 collector fallback이 `project_portfolio`, `project_milestone_status`를 포함한다. |
| REQ-DPMP-005 | 한국어 UI에서는 사용자가 보는 기본 작업 흐름이 한국어로 표시되어야 한다. | workflow lane/action labels가 한국어 모드에서 가져오기/계획/실행/보고 중심으로 표시된다. |
| REQ-DPMP-006 | 프로젝트 관리 UI는 desktop/mobile에서 깨지지 않아야 한다. | Browser smoke가 desktop 및 모바일 폭에서 panel/lane/card 표시와 가로 overflow 없음을 확인한다. |

## 비범위

- 실제 원격 Git hosting repository 생성
- 새 CLI/도구/모델 설치
- Ollama 또는 provider 리소스 변경
- 전체 MonitorShell/CSS 파일 분해
