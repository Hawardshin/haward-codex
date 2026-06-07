# 스펙: desktop project management platform

## 목표

`platform-desktop-app/`의 프로젝트 탭을 실제 프로젝트 관리 허브로 구현한다. 사용자는 Git 작업공간을 가져오고, 프로젝트별 상태와 마일스톤을 보고, 계획/실행/보고/근거 흐름으로 현재 작업을 확인한다. Ollama, tool builder, agent operations는 기본 사용자 흐름에서 분리한다.

## 범위

- `WorkspaceProjectManagement` snapshot model 추가
- collector의 프로젝트별 portfolio/milestone/workflow/recent trail 생성
- customer snapshot sanitization
- `ProjectManagementPanel` 추가
- `MonitorShell` projects section 연결
- product split registry의 project portfolio/milestone tracked outputs 보강
- readiness/test/build/Browser smoke 검증

## 비범위

- GitHub/GitLab remote repository 생성
- CLI 자동 설치
- Ollama/provider/cloud agent runtime 실행
- 기존 대형 파일 전체 분해

## 수용 기준

- 프로젝트 탭이 `data-project-management-panel`을 렌더링한다.
- 프로젝트 관리 summary가 managed/repo-backed/milestone/report/evidence 수치를 제공한다.
- workflow lanes는 import/plan/execute/verify를 포함한다.
- customer snapshot은 project portfolio와 recent trail을 제거한다.
- renderer check/test/build와 platform desktop test/check가 통과한다.
- Browser smoke가 desktop/mobile 프로젝트 탭을 확인한다.
