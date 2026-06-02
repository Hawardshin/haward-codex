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
- `workspace-monitor/`의 일반 웹 대시보드 구현
- 레포지토리 세팅용 사용자/개발자 `install_mode`
- Codex CLI, Claude Code, GitHub CLI, package manager, 배포 CLI 같은 외부 CLI 자체의 동작이나 인증 세션
- 발표 에이전트 같은 도메인 프로젝트 기능

## 첫 제품 가정

첫 버전은 새 UI를 만들기보다 `workspace-monitor/`를 데스크톱 shell에서 재사용한다. 이유는 현재 플랫폼의 사용자 경험이 히스토리, 문서, 프로젝트 구조, 평가를 보는 것에서 시작하기 때문이다.

이후 다음 요구가 확실해지면 별도 데스크톱 UI 또는 native 기능을 추가한다.

- 로컬 Python 에이전트를 앱에서 실행해야 한다.
- 파일 시스템 감시, 알림, OS credential store 같은 native API가 필요하다.
- 여러 CLI를 앱에서 호출하되 특정 CLI에 종속되지 않는 adapter/permission UI가 필요하다.
- update channel, workspace profile, plugin 관리 같은 데스크톱 제품 기능이 필요하다.

## 핵심 규칙

- 설치형 앱은 레포지토리 개발 환경이 아니다.
- 실제 token, webhook URL, browser cookie, private snapshot은 번들에 넣지 않는다.
- 배포 가능한 앱이라고 부르려면 signing, notarization 또는 OS별 신뢰 체인, 설치/삭제 smoke test, privacy review가 끝나야 한다.
- Tauri/Electron 중 하나를 설치하기 전에는 dependency audit와 설치 감사 계획을 먼저 남긴다.
- 설치형 앱은 특정 CLI wrapper가 아니다. 플랫폼이 먼저 실행되는 host runtime이며, 외부 CLI는 `agent-platform/configs/integrations/cli-adapter-registry.json`에 등록된 guest adapter capability로만 붙인다.
