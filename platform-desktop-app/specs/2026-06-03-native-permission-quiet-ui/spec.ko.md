# Spec: Native Permission & Quiet UI

## 목표

웹 대시보드처럼 큰 폰트와 강한 카드 효과를 줄이고, 데스크톱 앱답게 native folder permission request를 기본 작업공간 진입점으로 만든다.

## 구현 범위

- `globals.css`: system font stack, smaller heading, quieter metadata, reduced shadow and hover lift
- `MonitorShell.tsx`: workspace access request copy, permission granted notice, active workspace to CLI working directory binding
- `WorkspaceExplorerPane.tsx`: permission hint surface
- readiness/test: permission and typography tokens

## 수용 기준

- `Inter` 강제 우선 대신 macOS/Windows system font stack을 사용한다.
- 주요 heading/metric/hero typography가 낮아진다.
- hover가 카드 이동을 만들지 않는다.
- Workspace Explorer와 Quick Start의 첫 action은 작업공간 접근 권한 요청으로 보인다.
- folder picker 성공 후 working directory가 비어 있으면 active workspace path로 설정된다.
- TypeScript, tests, customer build, platform check가 통과한다.
