# Spec: OSS Pattern Adoption Gate

## 범위

`agent-platform`에 오픈소스 구조 패턴 채택 계획을 검증하는 deterministic validator와 CLI 명령을 추가한다.

## 기능

- 입력: self-documenting JSON plan.
- 출력: `ready_to_implement` 또는 `rework_required` 리포트.
- CLI: `PYTHONPATH=src python3 -m agent_platform.cli check-oss-pattern-adoption <path>`.

## 검증 항목

- top-level adoption plan 필드 존재.
- 3개 이상 source repositories, 3개 이상 pattern candidates.
- source repo별 license posture, stars, inspected paths, useful patterns.
- pattern별 source repo 참조 무결성.
- language/runtime, architecture, folder structure 각각 최소 2개 option과 selected option.
- clone/import policy의 direct import gates.
- hybrid module plan의 build boundary, interface contract, validation, rollback.
- adoption decision의 decision/mode enum, active decision evidence, direct import/hybrid mode gate.

## 설계 결정

- 구현 언어는 Python을 선택한다. 기존 CLI, JSON config, unittest 경계와 맞고 dependency 설치가 필요 없다.
- 폴더는 `agent_platform.oss`를 사용한다. 이 기능은 external framework adapter가 아니라 OSS provenance/adoption governance다.
- 직접 code import는 기본 false다. 이번 slice는 구조 패턴을 로컬 validator로 구현한다.

## 리스크

- GitHub metadata는 2026-06-06 기준 snapshot이며 바뀔 수 있다.
- 라이선스가 unclear인 레포는 reference-only로 제한한다.
- 전체 test suite에는 기존 `workspace-monitor` 경로 참조 실패가 남아 있다.
