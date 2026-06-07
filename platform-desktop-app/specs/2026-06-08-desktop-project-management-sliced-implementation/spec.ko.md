# 스펙: desktop project management sliced implementation

## 목표

프로젝트 탭을 단순 포트폴리오 목록에서 실행 가능한 프로젝트 관리 표면으로 확장한다. 사용자는 프로젝트별 준비도, 다음 액션, 보고서/근거 묶음, 작업 순서를 보고 기존 source/desktop/eval/history/documents/requirements 표면으로 즉시 이동할 수 있어야 한다.

## 범위

- `WorkspaceProjectManagement` snapshot model 확장
- `collectProjectManagement`의 readiness, report readiness, action queue, report bundle 생성
- `ProjectManagementPanel` 기능별 컴포넌트 분리
- 프로젝트 상세 패널과 액션 큐 UI 추가
- 프로젝트 액션 라우터를 `MonitorShell`에 추가
- customer snapshot sanitization 유지
- renderer check/test/build와 Browser smoke 검증

## 비범위

- 원격 저장소 생성 API
- 새 CLI/오픈소스 dependency 설치
- provider credential 또는 private file inspection
- 전체 `MonitorShell.tsx` 대규모 분해

## 수용 기준

- 프로젝트 화면은 `data-project-detail-panel`, `data-project-action-queue`, `data-project-report-bundle`을 렌더링한다.
- 프로젝트 action queue의 `desktop` target은 하단 터미널을 연다.
- collector test가 readiness/report bundle/customer sanitization을 확인한다.
- 모든 새 project-management TS/TSX 파일은 500줄 미만이다.
- renderer check/test/build, platform desktop test/check, Browser desktop/mobile smoke가 통과한다.
