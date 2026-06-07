# Workspace Operating Model Plan

## 결정

이번 구현은 `platform-desktop-app/`를 Git 분리 프로젝트 관리 데스크톱 앱으로 고정하는 slice다. `agent-tool-desktop-app/`는 에이전트/툴/모델/공급자 실행을 담당하는 별도 데스크톱 앱으로 유지한다.

## 실행 순서

1. 공식 문서 기반 web-first intake.
2. 루트 Git submodule 분리 상태 확인.
3. 운영 모델 registry 추가.
4. 스냅샷 수집기와 타입에 `operatingModel` 추가.
5. 프로젝트 관리 화면에 운영 모델 패널 추가.
6. 테스트와 스냅샷 재생성.
7. 브라우저 스모크와 close-out guard 실행.

## 현재 Git 분리 상태

`git submodule status --recursive` 기준 활성 프로젝트 6개가 모두 submodule이다.

- `agent-platform`
- `agent-tool-desktop-app`
- `design-asset-library`
- `platform-desktop-app`
- `presentation-agent`
- `vscode-agent-workbench`

## 후속 작업 큐

- 원격 clone/create/import UX를 실제 Tauri runtime action으로 연결.
- `MonitorShell.tsx`의 장기 componentization 계속.
- `agent-tool-desktop-app/` 내부 제품 화면 구현.
- 각 AI 도구별 설치/계정 진단을 초보자 흐름으로 단순화.
