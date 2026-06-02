# 다중 CLI 오케스트레이션 데스크톱 계획

## 작업 모드

- 선택: `governance`
- 이유: 설치형 제품 경계, CLI 실행 정책, 데이터 축적, decision inbox, resource/CLI pipeline gate를 바꾸는 고영향 작업이다.

## large-scope decomposition 요약

- source inventory: `platform-desktop-app/`, `agent-platform/configs/integrations/`, `_requirements/`, `_history/`
- 제외: 실제 dependency 설치, interactive PTY, autonomous source-affecting long-running CLI task execution
- 대표 샘플: desktop requirements, user-flow registry, desktop distribution registry, CLI adapter registry, human decision inbox spec, CLI pipeline spec
- slice IDs:
  - `slice-1-contract`: 요구사항/스펙/아키텍처 계약
  - `slice-2-config`: CLI/user-flow/desktop registry 보강
  - `slice-3-supervisor-mvp`: Tauri bounded CLI health-check command와 Desktop 탭
  - `slice-3b-session-editor-mvp`: Tauri pipe session command, stdin/defer/cancel, human decision inbox append, scoped source editor
  - `slice-3c-user-controls`: CLI setup guide, 작업 모드 프리셋, human decision inbox 조회/답변 UI
  - `slice-3d-decision-resume`: linked active CLI session decision의 answer-and-resume
  - `slice-4-readiness`: readiness/test 검증 강화
  - `slice-5-closeout`: history, omission, resource, grounding, evaluation
- touch paths: 위 범위의 문서와 설정 파일만
- merge gate: JSON/config/readiness/evaluation 통과 후 close-out

## 구현 순서

1. 웹 검색과 기존 memory anchor를 확인한다.
2. 프로젝트 경계를 `platform-desktop-app/`으로 확정한다.
3. CLI adapter registry에 concrete AI CLI와 interactive contract를 추가한다.
4. desktop/user-flow registry에 multi-CLI supervisor와 orchestration flow를 추가한다.
5. project-local requirements와 architecture/spec 문서를 추가한다.
6. Tauri backend에 allowlist CLI 탐지와 bounded health/version check command를 추가한다.
7. Tauri backend에 pipe session start/poll/stdin/defer/cancel, defer 질문의 human decision inbox append, workspace-scoped file read/write command를 추가한다.
8. Tauri backend에 human decision inbox 조회/답변 command를 추가한다.
9. Tauri backend에 linked active CLI session의 answer-and-resume command를 추가한다.
10. Workspace Monitor에 Desktop 탭, Tauri/browser fallback bridge, CLI setup guide, 작업 모드 프리셋, decision inbox answer/resume UI, session console, scoped source editor를 추가한다.
11. readiness script/test를 보강한다.
12. JSON, config contract, readiness, tests, omission/resource/grounding/evaluation을 실행한다.

## 리스크와 통제

- CLI 실행 리스크: 이번 변경은 allowlist된 CLI에 한해 bounded version probe와 pipe session만 실행한다.
- 권한 리스크: shell plugin/PTY는 adapter별 permission gate 전까지 비활성이다.
- 리소스 리스크: health check와 session child process는 timeout, max output, kill path를 가진다. PTY supervisor는 후속 리소스 측정이 필요하다.
- 파일 리스크: source editor는 workspace 상대 경로, `_private/`/`outputs/` 차단, symlink escape 차단, backup write로 제한한다.
- 데이터 리스크: raw output은 durable knowledge가 아니며 redaction/provenance/validation 후에만 승격한다.
