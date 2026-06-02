# 다중 CLI 오케스트레이션 데스크톱 계획

## 작업 모드

- 선택: `governance`
- 이유: 설치형 제품 경계, CLI 실행 정책, 데이터 축적, decision inbox, resource/CLI pipeline gate를 바꾸는 고영향 작업이다.

## large-scope decomposition 요약

- source inventory: `platform-desktop-app/`, `agent-platform/configs/integrations/`, `_requirements/`, `_history/`
- 제외: 실제 dependency 설치, 실제 CLI 실행 구현, workspace-monitor UI 구현 변경
- 대표 샘플: desktop requirements, user-flow registry, desktop distribution registry, CLI adapter registry, human decision inbox spec, CLI pipeline spec
- slice IDs:
  - `slice-1-contract`: 요구사항/스펙/아키텍처 계약
  - `slice-2-config`: CLI/user-flow/desktop registry 보강
  - `slice-3-readiness`: readiness/test 검증 강화
  - `slice-4-closeout`: history, omission, resource, grounding, evaluation
- touch paths: 위 범위의 문서와 설정 파일만
- merge gate: JSON/config/readiness/evaluation 통과 후 close-out

## 구현 순서

1. 웹 검색과 기존 memory anchor를 확인한다.
2. 프로젝트 경계를 `platform-desktop-app/`으로 확정한다.
3. CLI adapter registry에 concrete AI CLI와 interactive contract를 추가한다.
4. desktop/user-flow registry에 multi-CLI supervisor와 orchestration flow를 추가한다.
5. project-local requirements와 architecture/spec 문서를 추가한다.
6. readiness script/test를 보강한다.
7. JSON, config contract, readiness, tests, omission/resource/grounding/evaluation을 실행한다.

## 리스크와 통제

- CLI 실행 리스크: 이번 변경은 실행 구현을 하지 않고 계약만 만든다.
- 권한 리스크: shell/PTY/stdin write는 adapter별 permission gate 전까지 비활성이다.
- 리소스 리스크: 실제 child process가 없으므로 측정 대신 lifecycle 계약을 기록한다.
- 데이터 리스크: raw output은 durable knowledge가 아니며 redaction/provenance/validation 후에만 승격한다.
