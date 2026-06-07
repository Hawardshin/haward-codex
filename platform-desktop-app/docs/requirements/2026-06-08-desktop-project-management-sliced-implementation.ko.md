# Desktop 요구사항: desktop project management sliced implementation

- 날짜: 2026-06-08
- 소유 프로젝트: `platform-desktop-app/`
- 관련 shared requirement: `_requirements/changes/2026-06-08-desktop-project-management-sliced-implementation.ko.md`

## 제품 요구사항

| ID | 요구사항 | 구현 표면 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-089 | 프로젝트 관리 화면은 프로젝트별 실행 준비도, 보고 준비도, 진행률을 보여야 한다. | `collect-workspace.mjs`, `snapshot.ts`, `ProjectPortfolioList.tsx` | collector/test/build |
| REQ-WM-090 | 프로젝트 상세 화면은 작업 큐와 보고서 묶음을 보여야 한다. | `ProjectDetailPanel.tsx` | renderer tests, Browser smoke |
| REQ-WM-091 | 프로젝트 화면 컴포넌트는 기능별 파일로 분리되어야 한다. | `components/features/project-management/` | line count, tsc |
| REQ-WM-092 | 프로젝트 액션은 기존 workspace host, terminal, report, history, documents surface로 라우팅해야 한다. | `MonitorShell.tsx`, `ProjectManagementPanel.tsx` | tool-studio tests |
| REQ-WM-093 | customer snapshot은 내부 프로젝트 자료를 제거해야 한다. | `sanitizeProjectManagementForCustomer` | collector tests |

## 설계 원칙

- 프로젝트 관리는 “설정 설명”이 아니라 “다음 작업 선택” 중심이어야 한다.
- 실제 네이티브 파일 선택/clone/terminal은 기존 runtime surface를 재사용한다.
- 새 하위 컴포넌트는 500줄을 넘지 않도록 작게 유지한다.
