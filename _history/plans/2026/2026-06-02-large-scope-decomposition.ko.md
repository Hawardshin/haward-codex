# 계획 기록: Large Scope Decomposition

- 날짜: 2026-06-02
- 요청: `UR-2026-06-02-033`
- 요구사항: `REQ-WS-073`
- 작업 모드: `governance`

## 목표

너무 큰 범위와 너무 많은 파일을 다루는 작업에서 모든 파일을 한 번에 읽지 않고, 먼저 source inventory와 slice를 만들어 검증 가능한 작은 단위로 줄이는 운영 구조를 추가한다.

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-large-scope-decomposition.ko.md`
- 내부 기존 구조:
  - `_ops/workflows/52-parallel-work-planning.md`
  - `_ops/workflows/45-context-archive.md`
  - `agent-platform/configs/memory/bootstrap-manifest.json`
  - `agent-platform/configs/orchestration/agent-orchestration-registry.json`

## 실행 계획

1. 기존 병렬/컨텍스트/누락 방지 구조와 겹치는 부분을 확인한다.
2. 새 profile은 병렬 실행이 아니라 pre-gate로 설계한다.
3. agent spec, docs, policy, workflow, prompt를 추가한다.
4. AGENTS, persistent instructions, start workflow, prompt router, memory bootstrap에 연결한다.
5. requirements/spec/history/evaluation을 연결한다.
6. config, agent, memory, docs, naming, snapshot, omission, grounding, evaluator를 검증한다.

## 분해 결정

- 단일 구현 slice: 정책/설정/문서 추가
- 단일 연결 slice: router/start workflow/persistent/memory 연결
- 단일 close-out slice: 요구사항, 스펙, 히스토리, 평가, 검증

이 작업은 같은 shared files를 연속적으로 수정하므로 실제 병렬 실행은 하지 않는다.
