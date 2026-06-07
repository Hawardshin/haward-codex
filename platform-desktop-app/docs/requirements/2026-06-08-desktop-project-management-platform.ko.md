# Desktop 요구사항: desktop project management platform

- 날짜: 2026-06-08
- 소유 프로젝트: `platform-desktop-app/`
- 관련 shared requirement: `_requirements/changes/2026-06-08-desktop-project-management-platform.ko.md`

## 제품 요구사항

| ID | 요구사항 | 구현 표면 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-084 | 프로젝트 탭은 Git repository 기반 프로젝트 관리 허브여야 한다. | `ProjectManagementPanel.tsx`, `MonitorShell.tsx` | renderer tests, Browser smoke |
| REQ-WM-085 | 프로젝트별 portfolio health, task count, requirement/report/evidence count를 보여야 한다. | `collectProjectManagement`, `WorkspaceProjectManagement` | collector tests |
| REQ-WM-086 | 프로젝트 작업 흐름은 가져오기, 계획, 실행, 보고 순서로 보여야 한다. | `workflowLanes`, `ProjectManagementPanel` | tool-studio tests, readiness tests |
| REQ-WM-087 | 고객용 snapshot에서는 내부 project resource가 제거되어야 한다. | `sanitizeProjectManagementForCustomer` | collector tests |
| REQ-WM-088 | 제품 분리 registry는 프로젝트 포트폴리오/마일스톤을 desktop tracker 핵심 산출물로 기록해야 한다. | `workspace-tracker-product-split-registry.json` | config contract, collector tests |

## 설계 원칙

- 프로젝트 관리는 기본 사용자 UI의 중심이다.
- agent/tool/Ollama 운영은 분리 플랫폼 또는 고급 영역으로만 연결한다.
- 화면은 설정 설명보다 바로 실행 가능한 프로젝트 흐름을 먼저 보여준다.
