# 요구사항 변경: desktop project management sliced implementation

- 날짜: 2026-06-08
- 상태: baseline
- 관련 이전 요구사항:
  - `_requirements/changes/2026-06-08-workspace-tracker-product-split.ko.md`
  - `_requirements/changes/2026-06-08-desktop-project-management-platform.ko.md`

## 변경 이유

기존 프로젝트 탭은 포트폴리오 요약을 제공했지만, 사용자가 “지금 어떤 프로젝트를 실행하고 어떤 보고서를 확인해야 하는지”를 한 화면에서 선택하기에는 부족했다. 프로젝트 관리 기능은 데이터 수집, 화면 컴포넌트, 런타임 라우팅, 검증 계약으로 나누어 구현되어야 한다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-DPMS-001 | 프로젝트 관리 모델은 프로젝트별 실행 준비도와 보고 준비도를 제공해야 한다. | `WorkspaceProjectManagement.portfolio[]`가 `readiness`, `reportReadiness`, `progressPercent`, `primarySection`을 포함한다. |
| REQ-DPMS-002 | 프로젝트별 다음 액션은 화면에서 바로 실행 가능해야 한다. | 각 프로젝트가 `actionQueue`를 갖고 UI가 `source/desktop/eval/history/documents/requirements`로 라우팅한다. |
| REQ-DPMS-003 | 프로젝트별 보고서 묶음은 요구사항, 보고서, 근거, 최근 기록을 분리해야 한다. | `reportBundle.requirements/evidence/reports/recent/resources`가 snapshot과 UI에 노출된다. |
| REQ-DPMS-004 | 프로젝트 관리 UI 파일은 기능별 하위 컴포넌트로 분리되어야 한다. | `components/features/project-management/` 하위 파일들이 metric/workflow/portfolio/detail/side panel을 담당한다. |
| REQ-DPMS-005 | 프로젝트 화면의 터미널 액션은 하단 터미널까지 바로 열어야 한다. | `openProjectManagementTarget("desktop")`가 `openTerminalDrawer()`를 호출한다. |
| REQ-DPMS-006 | customer snapshot은 내부 프로젝트 경로와 보고서 묶음을 제거해야 한다. | customer snapshot에서 `portfolio`, `recentTrail`이 비어 있고 summary는 fallback 0값이다. |

## 비범위

- 새 CLI 설치, 글로벌 환경 변경
- 원격 Git hosting repository 생성
- Rust/Tauri native workspace command 재작성
- 전체 `MonitorShell.tsx`/`snapshot.ts` 대규모 분해
