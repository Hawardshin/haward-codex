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
| REQ-WS-005 | 요구사항은 사용자 작업에서 도출하고, 검토/변경/기준선화한 뒤 구현과 평가의 기준으로 사용해야 한다. | UR-2026-05-31-036 | must | baseline | workspace | requirements target과 review file 확인 | `_requirements/`, `_docs/policies/requirements-management-policy.ko.md` |
| REQ-WS-006 | 의미 있는 작업은 작업 요약, 계획 기록, 평가 보고서, 상세 히스토리를 남겨야 한다. | UR-2026-05-31-012, 014, 019, 034 | must | baseline | workspace | 각 `_history/` target 확인 | `_history/work-summaries/`, `_history/plans/`, `_history/evaluations/` |
| REQ-WS-007 | 작업 결과가 초기 지시와 요구사항에 맞는지 평가하고, gap은 재작업해야 한다. | UR-2026-05-31-011 | must | baseline | agent-platform | `evaluate-work` 결과 확인 | `work-evaluator-agent`, `_ops/workflows/40-evaluate-and-rework.md` |
| REQ-WS-008 | AI가 세팅을 잊지 않도록 세션 시작 시 메모리 부트스트랩 anchor를 확인해야 한다. | UR-2026-05-31-009, 032 | must | baseline | agent-platform | `check-memory-bootstrap` 결과 확인 | `agent-platform/configs/memory/bootstrap-manifest.json` |
| REQ-WS-009 | 코딩 작업은 Python-first, 조사-first, 오픈소스 검토-first를 기본으로 해야 한다. | UR-2026-05-31-008, 026, 028, 030 | should | baseline | agent-platform/projects | 테스트와 조사 기록 확인 | `agent-platform/`, `_docs/policies/open-source-installation-policy.ko.md` |
| REQ-WS-010 | 최종 산출물의 사실 주장은 근거 기반으로 검증하고, 지식 베이스는 틀릴 수 있다고 가정해야 한다. | UR-2026-05-31-017, 022 | must | baseline | workspace | knowledge/grounding checks 확인 | `knowledge-skeptic-agent`, `hallucination-guard-agent` |
| REQ-WS-011 | 병렬 작업과 진행 중인 에이전트는 한 곳에서 상태를 볼 수 있어야 한다. | UR-2026-05-31-015 | should | baseline | `_ops` | task board check | `_ops/coordination/` |
| REQ-WS-012 | 프로젝트 전용 산출물은 해당 프로젝트에 두고, 공통 자산만 `_` 폴더로 승격해야 한다. | UR-2026-05-31-021 | must | baseline | workspace/projects | project boundary review | `_docs/policies/project-boundary-policy.ko.md` |
| REQ-WS-013 | 의미 있는 구현 작업은 spec-driven 방식처럼 스펙, 계획, 작업 목록, 검증, traceability 산출물을 거쳐야 한다. | UR-2026-05-31-037 | must | baseline | workspace/projects | spec target과 evaluator check 확인 | `_specs/`, `_docs/policies/spec-driven-development-policy.ko.md` |
| REQ-WS-014 | 커스텀 스킬 생성/수정은 명시적인 원본, trigger 예시, 검증, 전진 테스트, 개선 backlog, 평가 target을 남겨야 한다. | UR-2026-05-31-038 | must | baseline | workspace/agent-platform | skill validation과 evaluator check 확인 | `_skills/`, `_docs/policies/skill-lifecycle-policy.ko.md`, `skill-lifecycle-agent` |
| REQ-WS-015 | 소스 코드 작성 전에는 best-fit 아키텍처와 reference architecture를 조사하고 최소 두 개의 구조 후보와 선택 근거를 기록해야 한다. | UR-2026-05-31-039 | must | baseline | agent-platform/projects | `complete-coding-research` 결과와 architecture fields 확인 | `_docs/policies/architecture-first-coding-policy.ko.md`, `coding-research-agent` |
| REQ-WS-016 | 대기업 엔지니어링, 공식 연구소, architecture center, 고신뢰 독립 출처 목록은 일반 source taxonomy와 분리된 registry로 관리해야 한다. | UR-2026-05-31-040 | must | baseline | agent-platform/_research | `check-config-contract`와 source list 확인 | `agent-platform/configs/research/enterprise-source-registry.json`, `_research/source-lists/` |
| REQ-WS-017 | 중요한 원천값, 설정값, 주장, 리뷰 신호, 가정, 계획 제약은 출처와 접근일을 추적하고, 모든 중요한 계획 단계는 근거와 연결해야 한다. | UR-2026-05-31-041 | must | baseline | agent-platform/_history | `plan-from-research`, `complete-coding-research`, `evaluate-work` 결과 확인 | `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets` |
| REQ-WS-018 | 웹 검색은 사람이 실제로 검색하듯 세계 기술 블로그, 한국 빅테크 기술 블로그, 인도 기술 소스, 논문 검색 원천, 한국 로컬 리뷰 채널을 폭넓게 사용해야 한다. | UR-2026-05-31-042, 043 | must | baseline | agent-platform/_research | source discovery registry와 source list 확인 | `agent-platform/configs/research/source-discovery-registry.json`, `_research/source-lists/enterprise-high-quality-sites.ko.md` |
| REQ-WS-019 | 한국 사용자 리뷰나 로컬 판단이 필요한 조사에서는 Naver Map, Kakao Map, Naver Blog/Search, 공식 페이지를 우선 확인하고 후보 페이지 품질을 평가해야 한다. | UR-2026-05-31-044 | must | baseline | `_tools`/`_research` | Korean local review tool tests와 source list 확인 | `_tools/korean-local-review/`, `_research/source-lists/korean-local-review-sources.ko.md` |
| REQ-WS-020 | 작업 성격에 따라 `quick`, `standard`, `ship_first`, `research`, `governance` 모드를 선택하고, 모드별로 필수 산출물과 지연 개선을 다르게 관리해야 한다. | UR-2026-05-31-045 | must | baseline | `_ops`/`agent-platform` | work mode registry, evaluator tests, workflow review 확인 | `agent-platform/configs/workflows/work-mode-registry.json`, `_ops/workflows/02-select-work-mode.md`, `_ops/backlog/deferred-improvements.ko.md` |
| REQ-WS-021 | 코딩 조사는 기술 스택별 공식 문서/표준, 버전 제약, high-signal 이슈/토론 출처와 커뮤니티 신호 해석을 기록해야 한다. | UR-2026-05-31-046 | must | baseline | agent-platform/projects | `complete-coding-research` 결과와 stack/discussion fields 확인 | `agent-platform/src/agent_platform/planning/coding_research.py`, `agent-platform/configs/research/coding-research-profile.json`, `agent-platform/docs/coding-research-agent.ko.md` |
| REQ-WS-022 | 코딩 조사는 유지보수 가능한 언어/런타임 선택, 아키텍처 이론과 실무자 의견의 분리 비교, 폴더 구조 후보와 폴더 의미를 기록해야 한다. | UR-2026-06-01-001 | must | baseline | agent-platform/projects | `complete-coding-research` 결과와 language/architecture/folder fields 확인 | `agent-platform/src/agent_platform/planning/coding_research.py`, `agent-platform/configs/research/coding-research-profile.json`, `_docs/policies/architecture-first-coding-policy.ko.md` |
| REQ-WS-023 | 속도가 문제되거나 작업이 독립 lane으로 나뉠 수 있으면 병렬 실행 전 의존성, touch paths, 충돌 제어, coordination target, merge/rollback 전략을 검증해야 한다. | UR-2026-06-01-002 | must | baseline | agent-platform/_ops | `plan-parallel-work` 결과와 coordination board 확인 | `agent-platform/src/agent_platform/planning/parallel_work.py`, `agent-platform/configs/planning/parallel-work-template.json`, `_ops/workflows/52-parallel-work-planning.md` |
| REQ-WS-024 | 여러 조사 lane을 병렬 실행할 때는 모든 조사 lane을 기다리는 merge gate를 두고, contradiction/accepted evidence를 합성한 뒤 downstream 구현을 release해야 한다. | UR-2026-06-01-003 | must | baseline | agent-platform/_ops | `plan-parallel-work` merge_gates 결과와 테스트 확인 | `agent-platform/src/agent_platform/planning/parallel_work.py`, `agent-platform/configs/planning/parallel-work-template.json`, `agent-platform/docs/parallel-work-planner-agent.ko.md` |
| REQ-WS-025 | 플랫폼은 Slack, Discord, Microsoft Teams 알림을 설정 파일로 켜고 끌 수 있어야 하며, 실제 토큰이나 웹훅 URL은 사용자가 환경변수로 주입해야 한다. | UR-2026-06-01-007 | must | baseline | agent-platform | notification config 검증, dry-run, 단위 테스트 확인 | `agent-platform/configs/integrations/notification-channels.json`, `agent-platform/src/agent_platform/integrations/notifications.py` |
| REQ-WS-026 | 루트 폴더 구조는 등록된 프로젝트, 예약 운영 폴더, 로컬 전용 폴더, 생성 산출물로 분류되어야 하며, 구조 변경 후 deterministic audit를 통과해야 한다. | UR-2026-06-01-009 | must | baseline | workspace/_ops/_tools | `structure-audit` 결과와 root structure policy 확인 | `_ops/projects/root-structure-policy.json`, `_tools/structure-audit/`, `_docs/governance/repository-structure-governance.ko.md` |
| REQ-WS-027 | 등록된 프로젝트의 durable top-level folder는 프로젝트 등록부에 설명되어야 하며, generated output pattern은 `.gitignore`와 함께 검증되어야 한다. | UR-2026-06-01-010 | must | baseline | workspace/_ops/_tools | `structure-audit` project inventory와 generated output ignore 검증 확인 | `_ops/projects/registry.json`, `_ops/projects/root-structure-policy.json`, `_tools/structure-audit/` |
| REQ-WS-028 | 이 저장소의 AI assistant 운영 원칙은 Codex 전용으로 고정하지 않고 Claude Code, Cursor, Antigravity, 또는 사용자가 선호하는 도구에서도 사용할 수 있는 tool-agnostic principle과 thin runtime adapter 구조로 관리해야 한다. | UR-2026-06-01-011 | must | baseline | workspace/_docs/_ops/_templates | runtime adapter registry, structure audit, config contract, memory bootstrap 확인 | `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md`, `_ops/assistant-runtimes/adapter-registry.json`, `_templates/assistant-operating-principles/` |
| REQ-WS-029 | 마케팅, 소비자 인사이트, 시장 규모, 브랜드/GTM, 책/이론, 설문, 정량 수치 근거 조사는 `marketing-evidence-profile.json`을 사용해 책/학술, 설문 방법론, 공개 통계, 시장 리포트, 플랫폼 행동 데이터의 evidence lane을 분리하고, 모든 숫자 근거의 값/단위/base/지역/기간/모집단/방법론/표본/스폰서/비교 가능성을 기록해야 한다. | UR-2026-06-01-012 | must | baseline | agent-platform/_research | marketing evidence profile, source registry, source discovery registry, memory bootstrap, source list, config contract 확인 | `agent-platform/configs/research/marketing-evidence-profile.json`, `_research/source-lists/marketing-evidence-sources.ko.md` |
| REQ-WS-030 | 프로젝트 스펙이 애매하거나 현재 소스/테스트/산출물과 다를 경우, 구현 전에 비교 근거를 기록하고 `update_spec`, `update_source`, `ask_user`, `defer` 중 하나로 분류해야 한다. `ask_user` 이슈는 안정적인 질문 ID, 선택지, 답변 형식, 결정 영향을 포함한 `clarification_needed` 알림으로 사용자에게 질문하고, 답변이 기록되기 전까지 해당 스펙이나 소스를 변경하지 않아야 한다. | UR-2026-06-01-013 | must | baseline | agent-platform/_ops/projects | `reconcile-spec` 결과, 알림 dry-run, 단위 테스트, config contract, memory bootstrap 확인 | `agent-platform/src/agent_platform/planning/spec_reconciliation.py`, `agent-platform/configs/planning/spec-reconciliation-template.json`, `_ops/workflows/38-spec-source-reconciliation.md` |
| REQ-WS-031 | `_docs/`는 `instructions`, `policies`, `operating-models`, `governance` 카테고리로 관리해야 하며, 새 문서가 루트에 흩어지거나 필수 문서가 누락되지 않도록 `_docs/registry.json`과 `docs-audit`로 root 허용 파일, category placement, 필수 문서, 한영 companion을 검증해야 한다. | UR-2026-06-01-014 | must | baseline | workspace/_docs/_tools | docs-audit, config contract, memory bootstrap, link/path 검증 | `_docs/registry.json`, `_docs/README.ko.md`, `_tools/docs-audit/` |
| REQ-WS-032 | 전체 저장소 navigation과 health check는 `_ops/projects/root-structure-policy.json`, `_ops/projects/registry.json`, `_docs/registry.json` 같은 source-of-truth를 사용해야 하며, root folder class/source와 핵심 감사/테스트를 한 곳에서 확인할 수 있어야 한다. | UR-2026-06-01-016 | must | baseline | workspace/_ops/_tools | workspace-index map 확인, workspace-health 실행, tool tests 확인 | `_tools/workspace-index/`, `_tools/workspace-health/`, `_ops/maps/repository-map.md` |
| REQ-WS-033 | 저장소 운영 CLI는 유지보수를 위해 사람용 출력과 자동화용 JSON 출력을 분리하고, 필요한 검사 범위만 실행할 수 있는 category filter를 제공해야 한다. | UR-2026-06-01-017 | must | baseline | workspace/_tools | workspace-health category/json 실행과 JSON parse 확인 | `_tools/workspace-health/` |
| REQ-WS-034 | 저장소 운영 도구의 소스가 커지면 단일 스크립트에 CLI, 도메인 모델, 체크 정의, 실행, 직렬화를 섞지 말고 책임별 모듈로 분리해야 하며 기존 명령 호환성은 보존해야 한다. | UR-2026-06-01-018 | must | baseline | workspace/_tools | workspace-health 단위 테스트, legacy entrypoint, JSON/category 실행, 전체 health check 확인 | `_tools/workspace-health/`, `_specs/workspace-platform/2026-06-01-workspace-health-source-refactor/` |

## 변경 관리

- 요구사항 변경은 `_requirements/changes/`에 남긴다.
- 요구사항 검토는 `_requirements/reviews/`에 남긴다.
- 구현 전에는 관련 요구사항 ID를 계획/작업 요약/평가 입력에 연결한다.
- 2026-06-01에 REQ-WS-022를 추가해 언어 선택, 이론/실무 아키텍처 비교, 폴더 의미 기록을 구현 준비 조건으로 승격했다.
- 2026-06-01에 REQ-WS-023을 추가해 병렬 작업 계획과 충돌 방지 검사를 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-024를 추가해 병렬 조사 fan-out/fan-in과 merge gate release 기준을 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-025를 추가해 플랫폼 공통 알림 on/off와 환경변수 기반 secret 주입을 공통 기능으로 승격했다.
- 2026-06-01에 REQ-WS-026을 추가해 루트 폴더 분류, local-only 예외, 생성 산출물 위치, deterministic structure audit를 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-027을 추가해 프로젝트 내부 top-level folder inventory와 generated output ignore 검증을 structure audit 범위에 포함했다.
- 2026-06-01에 REQ-WS-028을 추가해 Codex, Claude Code, Cursor, Antigravity, 기타 AI assistant가 공유할 수 있는 tool-agnostic 운영 원칙과 thin runtime adapter 구조를 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-029를 추가해 마케터식 자료조사, 이론/책 근거, 설문 방법론, 공식 통계, 시장 리포트, 플랫폼 행동 데이터, 정량 수치 출처 추적을 공통 리서치 구조로 승격했다.
- 2026-06-01에 REQ-WS-030을 추가해 스펙 애매함과 스펙/소스 불일치를 구현 전에 근거 기반으로 분류하고, 필요한 경우 사용자 답변 가능한 `clarification_needed` 알림으로 되돌리는 구조를 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-031을 추가해 `_docs/`를 종류별 카테고리로 나누고 registry와 docs-audit로 문서 누락을 막는 구조를 공통 운영 구조로 승격했다.
- 2026-06-01에 REQ-WS-032를 추가해 repository map이 root structure policy/project registry를 직접 사용하고, workspace health check가 핵심 감사와 테스트를 한 명령으로 묶도록 승격했다.
- 2026-06-01에 REQ-WS-033을 추가해 workspace health 같은 운영 CLI가 사람용 출력, JSON 출력, category filter를 제공하도록 승격했다.
- 2026-06-01에 REQ-WS-034를 추가해 운영 도구가 커질 때 책임별 Python package 구조로 분리하고 기존 스크립트 명령은 보존하도록 승격했다.
- 구현 전에는 관련 스펙 산출물을 `_specs/` 또는 프로젝트 `specs/`에 연결한다.
- 소스 코드 구현 전에는 관련 아키텍처 reference, architecture options, decision notes를 코딩 조사 기록에 연결한다.
- 대기업/고신뢰 출처를 조사 시작점으로 쓰면 `enterprise-source-registry.json`과 `_research/source-lists/`를 갱신하거나 참조한다.
- 원천값과 계획 근거는 `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`로 추적한다.
- 넓은 검색 원천은 `source-discovery-registry.json`을 확인하고, 한국 로컬 리뷰는 `_tools/korean-local-review/`로 점수화한다.
- 작업 시작 후 `work-mode-registry.json`으로 작업 모드를 선택하고, 평가 입력의 필수 target은 선택한 모드를 따른다.
- `ship_first`에서 뒤로 뺀 비차단 개선은 `_ops/backlog/deferred-improvements.ko.md` 또는 프로젝트별 동등 백로그에 남긴다.
- 코딩 조사에서 Java/Spring Boot, C, React, Next.js 등 주요 기술별 공식 문서/표준, 버전 제약, 이슈/토론 출처, 커뮤니티 신호 해석을 누락하지 않는다.
- 스킬 작업이 있으면 `_skills/` 원본, 검증 결과, 개선 아이디어를 연결한다.
- 구현 후에는 요청-결과 추적표와 요구사항의 관련 산출물을 갱신한다.

## 현재 검토 결과

- 기준선은 2026-05-31 현재 workspace/platform 공통 요구사항으로 사용 가능하다.
- 프로젝트별 제품 요구사항이 생기면 해당 프로젝트의 `docs/requirements/`에 별도 기준선을 만든다.
