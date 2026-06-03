# 제품 Workbench 대공사 추적성

## 요청 연결

- `UR-2026-06-03-044`: 핵심 기능 메인 탭 중심으로 사용 흐름을 재구성한다.
- `UR-2026-06-03-045`: 전체 변경이 두렵다고 멈추지 말고 대공사를 시작해 계획하고 진행한다.

## 산출물 연결

- Spec: `platform-desktop-app/specs/2026-06-03-product-workbench-overhaul/spec.ko.md`
- Plan: `platform-desktop-app/specs/2026-06-03-product-workbench-overhaul/plan.ko.md`
- Tasks: `platform-desktop-app/specs/2026-06-03-product-workbench-overhaul/tasks.ko.md`
- Validation: `platform-desktop-app/specs/2026-06-03-product-workbench-overhaul/validation.ko.md`

## Slice 연결

- `slice-01-home-workbench-shell`
- Requirement: 핵심 기능 메인 탭을 사용자 첫 화면의 기준으로 둔다.
- Source target: `components/workbench/CoreFeatureTabs.tsx`, `components/workbench/PathDisclosure.tsx`, `MonitorShell.tsx`
- Validation: TypeScript/test/customer build/browser smoke.

- `slice-02-workspace-explorer-module`
- Requirement: 파일/코드 화면은 파일시스템 Explorer를 독립 workbench component로 보유한다.
- Source target: `components/workbench/WorkspaceExplorerPane.tsx`, `MonitorShell.tsx`, `globals.css`
- Validation: TypeScript/test/customer build/browser smoke.

- `slice-03-runtime-terminal-module`
- Requirement: 하단 다중 CLI 터미널은 독립 runtime workbench component로 보유하고, titlebar action에서 아래 panel처럼 열린다.
- Source target: `components/workbench/RuntimeTerminalDrawer.tsx`, `MonitorShell.tsx`, `globals.css`
- Validation: TypeScript/test/customer build/browser smoke.

## 공개 결론

- 대공사는 한 번에 전부 갈아엎는 작업이 아니라, 사용자-facing surface를 기능 모듈로 이동하는 연속 slice로 진행한다.
- 이번 작업은 핵심 workbench surface를 단계적으로 component module로 이동하는 방식으로 계속 진행한다.
