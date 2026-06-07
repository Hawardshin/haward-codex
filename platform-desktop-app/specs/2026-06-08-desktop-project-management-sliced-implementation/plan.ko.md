# 구현 계획: desktop project management sliced implementation

## Slice 1: 데이터 모델

- `WorkspaceProjectManagement` 타입에 준비도, 진행률, 액션 큐, 보고서 묶음을 추가한다.
- collector에서 프로젝트별 문서/요구사항/작업을 기반으로 값을 계산한다.
- customer snapshot은 내부 포트폴리오를 제거한다.

## Slice 2: UI 분리

- `ProjectManagementPanel.tsx`는 조립 역할만 담당한다.
- metric, workflow, portfolio, detail, side panel을 `project-management/` 하위 파일로 분리한다.
- CSS는 기존 프로젝트 관리 블록에만 추가한다.

## Slice 3: 액션 라우팅

- `MonitorShell`에 `openProjectManagementTarget`을 추가한다.
- `desktop` target은 터미널 drawer를 즉시 연다.
- `source`와 `eval`은 기존 intent/flow step을 포함해 이동한다.

## Slice 4: 검증

- collector fixture와 정적 UI 테스트를 갱신한다.
- collect/check/test/build, platform desktop test/check, Browser smoke를 실행한다.
- omission/resource/evaluation 기록을 남긴다.
