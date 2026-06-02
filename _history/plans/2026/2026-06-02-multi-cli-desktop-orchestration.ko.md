# 계획: 다중 CLI 데스크톱 오케스트레이션

## 작업 모드 선택

- 선택: `governance`
- 이유: 설치형 데스크톱 제품 경계, CLI adapter, multi-process orchestration, decision inbox, source editor, 데이터 축적 정책을 바꾸는 작업이다.
- 관련 workflow: web-first intake, memory bootstrap, installable software productization, desktop user flow, CLI adapter integration, CLI pipeline orchestration, omission/resource prevention.

## large-scope-decomposer-agent 시뮬레이션

- source inventory:
  - `platform-desktop-app/` desktop productization docs/configs/specs/tests
  - `agent-platform/configs/integrations/` CLI adapter and pipeline contracts
  - `_requirements/` shared requirement baseline
  - `_history/` web search, request trace, evaluation
- exclusions:
  - `_private/`, `outputs/`
  - actual CLI execution implementation
  - dependency installation
  - signed installer generation
  - broad workspace-monitor UI implementation
- representative samples:
  - `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
  - `platform-desktop-app/configs/user-flow-registry.json`
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `agent-platform/configs/integrations/cli-adapter-registry.json`
  - `_specs/workspace-platform/2026-06-02-human-decision-inbox/spec.ko.md`
  - `_specs/workspace-platform/2026-06-02-cli-pipeline-orchestration/spec.ko.md`
- slices:
  - `contract`: requirements/spec/architecture
  - `registry`: CLI/user-flow/desktop registry updates
  - `readiness`: readiness script and Node tests
  - `closeout`: history/evaluation/verification
- merge gate: JSON syntax, config contract, readiness check, tests, omission/resource/grounding/evaluation.

## 실행 계획

1. 웹 검색으로 최신 공식 문서와 후보 OSS 구성요소를 확인한다.
2. memory bootstrap으로 desktop/CLI/inbox 관련 hot/warm anchor를 확인한다.
3. `platform-desktop-app/` 소유 경계를 유지한다.
4. `cli-adapter-registry.json`에 concrete AI CLI와 interactive contract를 추가한다.
5. desktop/user-flow registry에 multi-CLI supervisor와 데이터 축적 flow를 추가한다.
6. project-local requirements, architecture, spec package를 추가한다.
7. readiness/test를 새 계약에 맞춘다.
8. close-out 검증과 평가를 수행한다.
