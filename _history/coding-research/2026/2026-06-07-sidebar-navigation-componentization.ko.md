# Coding Research: Sidebar Navigation Componentization

- 작업: Workspace Monitor `MonitorShell` 구조 부채 축소
- 소유 프로젝트: `platform-desktop-app`
- 기술 스택: Next.js 16 App Router, React Client Components, TypeScript, Tauri v2 host
- 참조 설정: `agent-platform/configs/research/coding-research-profile.json`, `agent-platform/configs/integrations/cli-adapter-registry.json`

## 언어/런타임 선택

- 옵션 A: TypeScript/React 컴포넌트 분리
  - 장점: 현재 UI 소스와 같은 런타임, 기존 테스트와 빌드에 바로 연결된다.
  - 단점: 큰 `MonitorShell`의 상태는 여전히 남는다.
- 옵션 B: Rust/Tauri 네이티브 경계 변경
  - 장점: OS 기능 구현에는 적합하다.
  - 단점: 이번 문제는 렌더러 컴포넌트 소유권이므로 범위가 맞지 않는다.
- 선택: TypeScript/React. UI 구조 부채를 줄이는 작업이며 새 native command가 필요하지 않다.

## 아키텍처 선택

- 옵션 A: `DesktopActivityRail`을 별도 shell 컴포넌트로 분리
  - 장점: props가 작고 회귀 위험이 낮다. `SidebarNavigation` acceptance의 첫 경계를 만든다.
  - 단점: 설정 다이얼로그, 런타임 패널, 소스 워크벤치 분리는 후속 조각으로 남는다.
- 옵션 B: `SettingsDialog` 전체를 한 번에 분리
  - 장점: 줄 수를 크게 줄인다.
  - 단점: provider/runtime/source 상태와 콜백이 많아 넓은 회귀 위험이 있다.
- 선택: 옵션 A. 먼저 작고 검증 가능한 shell navigation 경계를 만든다.

## 참조 코드

- 기존 `components/workbench/NativeGitWorkbench.tsx`: 큰 기능 패널을 별도 컴포넌트로 분리한 선례.
- 기존 `components/features/OperatorCenterDialog.tsx`: 다이얼로그를 독립 컴포넌트로 소유하는 선례.
- 기존 `components/MonitorShellBoundary.tsx`: `MonitorShell` 진입 경계를 분리한 선례.

## 검증 계획

- renderer `check`
- renderer `test`
- componentization token test
- customer snapshot collect/build
- platform desktop check
