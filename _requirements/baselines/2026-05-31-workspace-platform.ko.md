# 2026-05-31 Workspace Platform 요구사항 기준선

## 범위

이 기준선은 2026-05-31 현재 사용자 요청과 완료 작업에서 도출된 공통 workspace/platform 요구사항을 정의한다. 프로젝트 전용 요구사항은 해당 프로젝트의 `docs/requirements/`에 둔다.

## 기준선 상태

- 상태: `baseline`
- 기준일: 2026-05-31
- 소유 영역: shared workspace, `agent-platform/`
- 출처 요청: `_history/user-requests/2026/2026-05-31.ko.md`
- 요청-결과 추적: `_history/request-traces/2026/2026-05-31.ko.md`

## 요구사항 목록

| ID | 요구사항 | 출처 요청 | 우선순위 | 상태 | 소유 영역 | 검증 방법 | 관련 산출물 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REQ-WS-001 | 저장소는 개인 에이전트 구축 플랫폼과 여러 프로젝트를 장기 관리하는 monorepo로 운영해야 한다. | UR-2026-05-31-001, 002 | must | baseline | workspace | README/registry 검토 | `README.md`, `_ops/projects/registry.json` |
| REQ-WS-002 | 의미 있는 변경은 커밋하고 즉시 `origin/main`에 push해야 한다. | UR-2026-05-31-003, 004 | must | baseline | workspace | git log와 push 상태 확인 | `AGENTS.md`, `README.md` |
| REQ-WS-003 | 모든 새 사용자 지시는 웹 검색으로 시작하고 공개 검색 기록을 남겨야 한다. | UR-2026-05-31-023, 031 | must | baseline | workspace | 웹 검색 기록과 평가 target 확인 | `_history/web-searches/`, `_ops/workflows/05-web-first-intake.md` |
| REQ-WS-004 | 사용자 요청은 의미 요약으로 저장하고, 요청-결과 추적표에서 산출물/평가/커밋과 연결해야 한다. | UR-2026-05-31-033, 035 | must | baseline | workspace | request summary와 trace 확인 | `_history/user-requests/`, `_history/request-traces/` |
| REQ-WS-005 | 요구사항은 사용자 작업에서 도출하고, 검토/변경/기준선화한 뒤 구현과 평가의 기준으로 사용해야 한다. | UR-2026-05-31-036 | must | baseline | workspace | requirements target과 review file 확인 | `_requirements/`, `_docs/requirements-management-policy.ko.md` |
| REQ-WS-006 | 의미 있는 작업은 작업 요약, 계획 기록, 평가 보고서, 상세 히스토리를 남겨야 한다. | UR-2026-05-31-012, 014, 019, 034 | must | baseline | workspace | 각 `_history/` target 확인 | `_history/work-summaries/`, `_history/plans/`, `_history/evaluations/` |
| REQ-WS-007 | 작업 결과가 초기 지시와 요구사항에 맞는지 평가하고, gap은 재작업해야 한다. | UR-2026-05-31-011 | must | baseline | agent-platform | `evaluate-work` 결과 확인 | `work-evaluator-agent`, `_ops/workflows/40-evaluate-and-rework.md` |
| REQ-WS-008 | AI가 세팅을 잊지 않도록 세션 시작 시 메모리 부트스트랩 anchor를 확인해야 한다. | UR-2026-05-31-009, 032 | must | baseline | agent-platform | `check-memory-bootstrap` 결과 확인 | `agent-platform/configs/memory/bootstrap-manifest.json` |
| REQ-WS-009 | 코딩 작업은 Python-first, 조사-first, 오픈소스 검토-first를 기본으로 해야 한다. | UR-2026-05-31-008, 026, 028, 030 | should | baseline | agent-platform/projects | 테스트와 조사 기록 확인 | `agent-platform/`, `_docs/open-source-installation-policy.ko.md` |
| REQ-WS-010 | 최종 산출물의 사실 주장은 근거 기반으로 검증하고, 지식 베이스는 틀릴 수 있다고 가정해야 한다. | UR-2026-05-31-017, 022 | must | baseline | workspace | knowledge/grounding checks 확인 | `knowledge-skeptic-agent`, `hallucination-guard-agent` |
| REQ-WS-011 | 병렬 작업과 진행 중인 에이전트는 한 곳에서 상태를 볼 수 있어야 한다. | UR-2026-05-31-015 | should | baseline | `_ops` | task board check | `_ops/coordination/` |
| REQ-WS-012 | 프로젝트 전용 산출물은 해당 프로젝트에 두고, 공통 자산만 `_` 폴더로 승격해야 한다. | UR-2026-05-31-021 | must | baseline | workspace/projects | project boundary review | `_docs/project-boundary-policy.ko.md` |
| REQ-WS-013 | 의미 있는 구현 작업은 spec-driven 방식처럼 스펙, 계획, 작업 목록, 검증, traceability 산출물을 거쳐야 한다. | UR-2026-05-31-037 | must | baseline | workspace/projects | spec target과 evaluator check 확인 | `_specs/`, `_docs/spec-driven-development-policy.ko.md` |
| REQ-WS-014 | 커스텀 스킬 생성/수정은 명시적인 원본, trigger 예시, 검증, 전진 테스트, 개선 backlog, 평가 target을 남겨야 한다. | UR-2026-05-31-038 | must | baseline | workspace/agent-platform | skill validation과 evaluator check 확인 | `_skills/`, `_docs/skill-lifecycle-policy.ko.md`, `skill-lifecycle-agent` |
| REQ-WS-015 | 소스 코드 작성 전에는 best-fit 아키텍처와 reference architecture를 조사하고 최소 두 개의 구조 후보와 선택 근거를 기록해야 한다. | UR-2026-05-31-039 | must | baseline | agent-platform/projects | `complete-coding-research` 결과와 architecture fields 확인 | `_docs/architecture-first-coding-policy.ko.md`, `coding-research-agent` |
| REQ-WS-016 | 대기업 엔지니어링, 공식 연구소, architecture center, 고신뢰 독립 출처 목록은 일반 source taxonomy와 분리된 registry로 관리해야 한다. | UR-2026-05-31-040 | must | baseline | agent-platform/_research | `check-config-contract`와 source list 확인 | `agent-platform/configs/research/enterprise-source-registry.json`, `_research/source-lists/` |

## 변경 관리

- 요구사항 변경은 `_requirements/changes/`에 남긴다.
- 요구사항 검토는 `_requirements/reviews/`에 남긴다.
- 구현 전에는 관련 요구사항 ID를 계획/작업 요약/평가 입력에 연결한다.
- 구현 전에는 관련 스펙 산출물을 `_specs/` 또는 프로젝트 `specs/`에 연결한다.
- 소스 코드 구현 전에는 관련 아키텍처 reference, architecture options, decision notes를 코딩 조사 기록에 연결한다.
- 대기업/고신뢰 출처를 조사 시작점으로 쓰면 `enterprise-source-registry.json`과 `_research/source-lists/`를 갱신하거나 참조한다.
- 스킬 작업이 있으면 `_skills/` 원본, 검증 결과, 개선 아이디어를 연결한다.
- 구현 후에는 요청-결과 추적표와 요구사항의 관련 산출물을 갱신한다.

## 현재 검토 결과

- 기준선은 2026-05-31 현재 workspace/platform 공통 요구사항으로 사용 가능하다.
- 프로젝트별 제품 요구사항이 생기면 해당 프로젝트의 `docs/requirements/`에 별도 기준선을 만든다.
