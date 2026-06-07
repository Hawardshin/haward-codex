# Work Summary: Workspace Operating Model

## 결과

`platform-desktop-app/`의 프로젝트 관리 화면에 운영 모델을 실제 데이터와 UI로 추가했다. 이제 데스크톱 앱은 Git으로 분리된 프로젝트, 작업 순서/근거, 결정 보류, 초보자 대화형 흐름, 분리된 에이전트/툴 운영 앱을 한 화면에서 확인한다.

## 구현

- `workspace-operating-model-registry.json` 추가.
- 스냅샷에 `operatingModel` 추가.
- 고객용 스냅샷에서 내부 프로젝트 목록 제거.
- `WorkspaceOperatingModelPanel` 추가.
- `ProjectManagementPanel`에 운영 모델 패널 삽입.
- product split fallback의 agent/tool 대상 홈을 `agent-tool-desktop-app/`로 수정.
- 수집기/UI 계약 테스트 추가.

## 검증

- 설정 계약 검사 통과.
- 코딩 연구 기록 검사 통과.
- Workspace Monitor check 통과.
- 대상 테스트 81개 통과.
- Workspace Monitor build 통과.
- Playwright 스모크 통과.

## 남은 일

- 원격 Git clone/create/import 런타임 자동화.
- `MonitorShell.tsx` 추가 분해.
- `agent-tool-desktop-app/` 내부 제품 기능 구현.
