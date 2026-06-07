# Workspace Operating Model Change

## 사용자 요구 요약

사용자는 데스크톱 앱의 목적을 프로젝트 관리와 작업 추적으로 명확히 고정하라고 요청했다. 각 프로젝트는 별도 Git 저장소로 관리되어야 하고, 작업 순서, 문서, 근거, 보고서가 사용자에게 더 중요하다. 사용자가 부재해도 전체 작업은 강제 대기하지 않고 필요한 결정만 보류해야 한다. 에이전트 직접 구축, 툴 관리, Ollama, 공급자 런타임 운영은 별도 데스크톱 앱으로 분리해야 한다.

## 변경된 요구사항 기준

- 기본 제품: `platform-desktop-app/`는 Git 작업공간 프로젝트 관리 데스크톱 앱이다.
- 분리 제품: `agent-tool-desktop-app/`는 에이전트, 툴, 모델, 공급자 실행, AgentCore형 운영 데스크톱 앱이다.
- 공유 엔진: `agent-platform/`는 재사용 가능한 정책, 검증기, 런타임 계약, 에이전트/툴 정의의 엔진 계층이다.
- 기본 사용자는 자연어 작업 요청, Git 작업공간 가져오기, 실행 상태, 보고서/근거 확인만으로 시작할 수 있어야 한다.
- 사용자 결정 대기는 전체 중단이 아니라 결정함 기록과 의존 작업 보류로 처리한다.

## 반영 대상

- `platform-desktop-app/configs/workspace-operating-model-registry.json`
- `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/WorkspaceOperatingModelPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProjectManagementPanel.tsx`

## 현재 검증 기준

- 운영 모델 설정 파일은 self-documenting config contract를 통과해야 한다.
- Workspace Monitor 수집기와 UI 계약 테스트가 통과해야 한다.
- 생성 스냅샷에서 등록 프로젝트 6개가 모두 Git 분리 상태로 계산되어야 한다.
