# 설치형 데스크톱 앱 제품 경계

## 목적

`platform-desktop-app/`은 이 저장소 플랫폼을 최종 사용자가 설치하는 소프트웨어로 만드는 제품화 프로젝트다. 기존 `agent-platform`의 `install_mode`는 레포지토리 개발/사용 환경을 준비하는 설정이고, 이 프로젝트는 DMG, MSIX, MSI, NSIS 같은 배포 패키지와 데스크톱 앱 경험을 다룬다.

## 소유 범위

- 데스크톱 앱 제품 요구사항
- 데스크톱 shell 또는 native wrapper 선택
- macOS, Windows, Linux 설치 패키지 전략
- code signing, notarization, update, uninstall, rollback release gate
- 사용자 설정, workspace 선택, private data 보호 경계
- 외부 CLI를 실행해야 할 때 command allowlist, workspace path allowlist, permission 설정, missing-CLI fallback 경계

## 소유하지 않는 범위

- `agent-platform/`의 핵심 에이전트/평가/조사 구현
- `platform-desktop-app/renderer/workspace-monitor/`의 renderer UI 구현
- 레포지토리 세팅용 사용자/개발자 `install_mode`
- Codex CLI, Claude Code, GitHub CLI, package manager, 배포 CLI 같은 외부 CLI 자체의 동작이나 인증 세션
- 발표 에이전트 같은 도메인 프로젝트 기능

## 첫 제품 가정

첫 버전은 새 UI를 따로 만들기보다 `platform-desktop-app/renderer/workspace-monitor/`를 데스크톱 shell의 project-owned renderer로 사용한다. 단, 제품 정체성은 모니터링 대시보드가 아니라 에이전트 역량 플랫폼이다. 첫 화면과 기능 구조는 `platform-desktop-app/configs/product-feature-registry.json`에 정의된 두 핵심 기능, 즉 커스텀 에이전트와 서브에이전트를 쉽게 만드는 Agent Core, 그리고 Claude Code 같은 guest CLI 작업을 decision inbox와 task-run store로 이어가는 CLI orchestration을 primary로 드러내야 한다. 루트 툴 관리, 작업 가시성, workbench, learning/evaluation loop는 이 두 핵심 기능을 가능하게 하는 supporting layer다.

히스토리, 문서, 프로젝트 구조, 평가, source inventory, service readiness 같은 화면은 primary 기능을 신뢰하고 개선하기 위한 supporting observability다. 이 표면들이 제품의 첫 약속이나 중심 네비게이션을 대체하면 안 된다.

이후 다음 요구가 확실해지면 별도 데스크톱 UI 또는 native 기능을 추가한다.

- 로컬 Python 에이전트를 앱에서 실행해야 한다.
- 파일 시스템 감시, 알림, OS credential store 같은 native API가 필요하다.
- 여러 CLI를 앱에서 호출하되 특정 CLI에 종속되지 않는 adapter/permission UI가 필요하다.
- update channel, workspace profile, plugin 관리 같은 데스크톱 제품 기능이 필요하다.

## 핵심 규칙

- 설치형 앱은 레포지토리 개발 환경이 아니다.
- 이 레포지토리는 플랫폼을 만드는 개발 원천이며, 고객이 설치해서 쓰는 제품은 플랫폼 source tree를 노출하지 않는 앱/런타임/데이터 경계로 배포한다.
- 사용자 workspace, platform data store, log store, agent workspace는 플랫폼 source code와 분리된 runtime data plane으로 취급한다.
- agent definition은 `agent-platform/configs/agents/`에 모으고, 설치 앱에서 agent가 실제 작업하는 input/output/log/handoff/temp 파일은 agent workspace plane에 모은다.
- 사용자가 별도 터미널에서 `git clone` 후 그 폴더에서 앱을 실행하는 흐름은 제품 표면이 아니다. 설치 앱은 Workspace Host에서 기존 workspace import, repository clone, active workspace 선택, workspace state 저장을 직접 제공해야 한다.
- 로그는 runtime health, task execution, CLI IO, agent work, support diagnostic처럼 분류한 뒤 retention, redaction, support export 정책을 적용한다.
- 실제 token, webhook URL, browser cookie, private snapshot은 번들에 넣지 않는다.
- 배포 가능한 앱이라고 부르려면 signing, notarization 또는 OS별 신뢰 체인, 설치/삭제 smoke test, privacy review가 끝나야 한다.
- Tauri/Electron 중 하나를 설치하기 전에는 dependency audit와 설치 감사 계획을 먼저 남긴다.
- 설치형 앱은 특정 CLI wrapper가 아니다. 플랫폼이 먼저 실행되는 host runtime이며, 외부 CLI는 `agent-platform/configs/integrations/cli-adapter-registry.json`에 등록된 guest adapter capability로만 붙인다.
- 코드/데이터/로그/에이전트 작업영역의 세부 steering은 `platform-desktop-app/configs/runtime-data-boundary-registry.json`을 따른다.
- 제품 기능의 primary/supporting 역할, desktop home 우선순위, capability promotion loop는 `platform-desktop-app/configs/product-feature-registry.json`을 따른다.
