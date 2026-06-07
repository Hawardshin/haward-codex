# 계획 기록: desktop project management sliced implementation

## 완료한 사전 확인

- 공식 문서 기반 web-first intake를 수행했다.
- 기존 `ProjectManagementPanel`, `collectProjectManagement`, `WorkspaceProjectManagement`, `MonitorShell` 라우팅을 확인했다.
- 이전 commit의 product split 구현을 기반으로 이번 slice의 범위를 정했다.

## 실행 계획

1. 프로젝트 관리 snapshot에 실행 준비도, 보고 준비도, 액션 큐, 보고서 묶음을 추가한다.
2. 프로젝트 관리 UI를 metric/workflow/portfolio/detail/side panel로 분리한다.
3. 프로젝트 액션이 기존 source/desktop/eval/history/documents/requirements로 바로 이동하도록 라우팅한다.
4. collector와 정적 UI 테스트를 보강한다.
5. build, Browser smoke, close-out evaluator를 실행한다.

## 병합 게이트

- renderer collect/check/test/build
- platform desktop test/check
- Browser desktop/mobile smoke
- omission/resource/evaluation guards
- commit/push
