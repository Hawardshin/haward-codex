# Spec: 미뤄둔 구현 큐 폐쇄

- 날짜: 2026-06-08
- 소유 범위: root workspace superproject, `platform-desktop-app/`, `agent-tool-desktop-app/`, `workspace-history-ledger/`

## 문제

이전 구조 개편으로 제품 경계는 나뉘었지만, 사용자가 바로 체감할 수 있는 런타임 작업 생성, 별도 agent/tool 앱 실행면, legacy history 호환, smoke 검증, 설치 audit 일부가 후속 큐로 남아 있었다.

## 목표

프로젝트 관리 데스크톱 앱은 사용자의 현재 작업과 Git workspace를 쉽게 다루는 제품으로 남기고, agent/tool/Ollama/provider 관리는 별도 데스크톱 앱으로 분리한다. 기존 history는 ledger repository에서 호환 색인과 shadow copy로 접근 가능하게 한다.

## 기능 요구

- `platform-desktop-app`는 managed workspace를 생성하고 선택할 수 있는 Tauri command와 renderer action을 제공한다.
- 생성된 workspace는 기본 문서와 선택 가능한 Git 초기화를 가진다.
- projects topology 화면은 release unit, workspace action, smoke readiness를 검증할 수 있어야 한다.
- `workspace-history-ledger`는 root workspace의 기존 history 파일을 색인하고 안전한 일부 shadow copy batch를 만든다.
- `agent-tool-desktop-app`는 Electron 기반 developer desktop shell을 제공하며 agent factory, tool registry, Ollama model, provider run, runtime gate를 분리해 보여준다.
- 설치된 Electron 의존성은 lockfile, audit, 설치 기록으로 닫는다.

## 품질 요구

- 새 소스 파일은 기능별로 작게 유지한다.
- 사용자 화면의 주 기능은 프로젝트 관리와 작업 추적에 집중한다.
- 외부 CLI와 public release capability는 없는 경우 platform 전체를 막지 않는 선택 기능으로 남긴다.
- public release readiness는 signing/notarization gate 없이는 완료로 표기하지 않는다.
