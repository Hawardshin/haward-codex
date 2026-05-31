# Operations Index

## What Is Where

| Path | Role |
| --- | --- |
| `_ops/` | 운영 허브, 프롬프트 라우터, 워크플로, 저장소 맵 |
| `_ops/projects/` | 루트 프로젝트 등록부와 경계 관리 |
| `_research/` | 인터넷 조사와 외부 레퍼런스 중 재사용 가능한 내용 |
| `_docs/` | 장기 운영 규칙, 의사결정, 컨텍스트 관리 |
| `_philosophy/` | 에이전트와 플랫폼 운영의 근본 철학 |
| `_requirements/` | 공통 요구사항 기준선, 변경 기록, 검토 기록 |
| `_specs/` | 공통 spec-driven 산출물, 구현 계획, 작업 목록, 검증, traceability |
| `_history/` | 날짜별 작업 히스토리와 압축된 맥락 |
| `_history/context-archives/` | 긴 컨텍스트를 문서 기반으로 재개하기 위한 압축 아카이브 패킷 |
| `_history/user-requests/` | 사용자가 요청한 내용의 의미 요약과 반영 위치 |
| `_history/request-traces/` | 요청이 실제 결과, 산출물, 평가, 커밋으로 이어진 흐름 |
| `_history/work-summaries/` | 나중에 빠르게 읽는 날짜별 작업 요약과 HTML 인덱스 |
| `_history/web-searches/` | 모든 지시/프롬프트 실행의 웹 검색과 공개 판단 요약 |
| `_history/installations/` | 실제 설치/업그레이드/제거 상세 감사 기록 |
| `_history/plans/` | 에이전트 계획 과정 기록 |
| `_skills/` | git으로 추적하는 커스텀 Codex 스킬 원본 |
| `_templates/` | 새 프로젝트, HTML 산출물, Python 에이전트 템플릿 |
| `_tools/` | 반복 작업을 줄이는 로컬 도구 |
| `agent-platform/` | 개인 에이전트 구축 플랫폼 중심 프로젝트 |
| `_ops/installations/` | 설치 레지스트리와 설치 감사 규칙 |
| `_ops/backlog/` | `ship_first`와 빠른 작업에서 미룬 공통 비차단 개선 목록 |

## Navigation

- 작업을 시작할 때: [_ops/workflows/00-start-here.md](workflows/00-start-here.md)
- 모든 지시의 첫 웹 검색: [_ops/workflows/05-web-first-intake.md](workflows/05-web-first-intake.md), [_docs/web-first-work-policy.ko.md](../_docs/web-first-work-policy.ko.md)
- 프롬프트 공통 웹 검색 계약: [_ops/prompts/README.ko.md](prompts/README.ko.md), [_history/web-searches/README.ko.md](../_history/web-searches/README.ko.md)
- 새 세션의 AI 메모리 부트스트랩: [_ops/workflows/01-memory-bootstrap.md](workflows/01-memory-bootstrap.md), [agent-platform/configs/memory/bootstrap-manifest.json](../agent-platform/configs/memory/bootstrap-manifest.json)
- 작업 모드와 전체 루프 강도를 고를 때: [_ops/workflows/02-select-work-mode.md](workflows/02-select-work-mode.md), [_ops/prompts/02-select-work-mode.md](prompts/02-select-work-mode.md), [work-mode-registry.json](../agent-platform/configs/workflows/work-mode-registry.json)
- 지연 개선 백로그를 볼 때: [_ops/backlog/deferred-improvements.ko.md](backlog/deferred-improvements.ko.md)
- 공유 설정 파일 자기 설명 기준: [_docs/self-documenting-config-policy.ko.md](../_docs/self-documenting-config-policy.ko.md), `agent-platform`의 `check-config-contract`
- 출처 수집 기준을 볼 때: [_docs/source-collection-policy.ko.md](../_docs/source-collection-policy.ko.md)
- 핵심 조사 에이전트 프로필을 볼 때: [agent-platform/configs/research/research-agent-profile.json](../agent-platform/configs/research/research-agent-profile.json)
- 많은 출처 묶음을 정리할 때: [_tools/source-collector/README.ko.md](../_tools/source-collector/README.ko.md)
- 더 넓은 검색 원천을 고를 때: [source-discovery-registry.json](../agent-platform/configs/research/source-discovery-registry.json)
- 한국 사용자 리뷰/로컬 조사 소스를 볼 때: [_research/source-lists/korean-local-review-sources.ko.md](../_research/source-lists/korean-local-review-sources.ko.md), [_tools/korean-local-review/README.ko.md](../_tools/korean-local-review/README.ko.md)
- 프롬프트를 고를 때: [_ops/prompts/00-router.md](prompts/00-router.md)
- 속도 개선을 위해 작업을 병렬 lane으로 나눌 때: [_ops/workflows/52-parallel-work-planning.md](workflows/52-parallel-work-planning.md), [_ops/prompts/82-parallel-work-planning.md](prompts/82-parallel-work-planning.md), [parallel-work-planner-agent](../agent-platform/docs/parallel-work-planner-agent.ko.md)
- 운영 철학을 볼 때: [_philosophy/agent-operating-philosophy.ko.md](../_philosophy/agent-operating-philosophy.ko.md)
- 프로젝트 경계를 확인할 때: [_ops/projects/index.ko.md](projects/index.ko.md), [_docs/project-boundary-policy.ko.md](../_docs/project-boundary-policy.ko.md)
- 웹 검색 기반 인사이트로 계획할 때: [_ops/workflows/55-research-insight-planning.md](workflows/55-research-insight-planning.md)
- 코딩 조사 결과를 구현으로 넘기기 전에: [_ops/workflows/56-coding-research.md](workflows/56-coding-research.md), [agent-platform/docs/coding-research-agent.ko.md](../agent-platform/docs/coding-research-agent.ko.md)
- 코딩 조사 출처 설정을 확인할 때: [agent-platform/configs/research/README.ko.md](../agent-platform/configs/research/README.ko.md)
- 소스코드 작성 전 아키텍처 후보 비교 기준을 볼 때: [_docs/architecture-first-coding-policy.ko.md](../_docs/architecture-first-coding-policy.ko.md), [agent-platform/configs/research/coding-research-profile.json](../agent-platform/configs/research/coding-research-profile.json)
- 대기업/고신뢰 사이트 목록을 볼 때: [_docs/enterprise-source-list-policy.ko.md](../_docs/enterprise-source-list-policy.ko.md), [enterprise-source-registry.json](../agent-platform/configs/research/enterprise-source-registry.json), [_research/source-lists/enterprise-high-quality-sites.ko.md](../_research/source-lists/enterprise-high-quality-sites.ko.md)
- 최종 사실 주장을 검증할 때: [_ops/workflows/70-hallucination-prevention.md](workflows/70-hallucination-prevention.md), [_docs/hallucination-prevention-policy.ko.md](../_docs/hallucination-prevention-policy.ko.md)
- 계획 과정을 볼 때: [_history/plans/README.ko.md](../_history/plans/README.ko.md)
- 컨텍스트가 길어져 재개 패킷이 필요할 때: [_docs/context-archive-policy.ko.md](../_docs/context-archive-policy.ko.md), [_history/context-archives/README.ko.md](../_history/context-archives/README.ko.md), [_ops/workflows/45-context-archive.md](workflows/45-context-archive.md)
- 사용자 요청 요약을 볼 때: [_history/user-requests/README.ko.md](../_history/user-requests/README.ko.md), [_docs/user-request-summary-policy.ko.md](../_docs/user-request-summary-policy.ko.md)
- 요구사항 기준선을 볼 때: [_requirements/README.ko.md](../_requirements/README.ko.md), [_requirements/baselines/2026-05-31-workspace-platform.ko.md](../_requirements/baselines/2026-05-31-workspace-platform.ko.md)
- 요구사항을 정의/검토/변경할 때: [_ops/workflows/35-requirements-lifecycle.md](workflows/35-requirements-lifecycle.md), [_ops/prompts/35-manage-requirements.md](prompts/35-manage-requirements.md), [agent-platform/docs/requirements-manager-agent.ko.md](../agent-platform/docs/requirements-manager-agent.ko.md)
- spec-driven 산출물을 볼 때: [_specs/README.ko.md](../_specs/README.ko.md), [_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md](../_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md)
- 요구사항을 스펙/계획/작업/검증으로 바꿀 때: [_ops/workflows/36-spec-driven-development.md](workflows/36-spec-driven-development.md), [_ops/prompts/36-manage-spec.md](prompts/36-manage-spec.md), [agent-platform/docs/spec-driven-planner-agent.ko.md](../agent-platform/docs/spec-driven-planner-agent.ko.md)
- 커스텀 스킬을 만들거나 검증/개선할 때: [_docs/skill-lifecycle-policy.ko.md](../_docs/skill-lifecycle-policy.ko.md), [_ops/workflows/37-skill-lifecycle.md](workflows/37-skill-lifecycle.md), [_ops/prompts/37-manage-skill.md](prompts/37-manage-skill.md), [agent-platform/docs/skill-lifecycle-agent.ko.md](../agent-platform/docs/skill-lifecycle-agent.ko.md)
- 요청이 어떤 결과로 이어졌는지 볼 때: [_history/request-traces/README.ko.md](../_history/request-traces/README.ko.md), [_docs/request-traceability-policy.ko.md](../_docs/request-traceability-policy.ko.md)
- 완료된 작업을 빠르게 볼 때: [_history/work-summaries/README.ko.md](../_history/work-summaries/README.ko.md), [_history/work-summaries/index.html](../_history/work-summaries/index.html)
- 진행 중인 에이전트/병렬 작업을 볼 때: [_ops/coordination/board.ko.md](coordination/board.ko.md), [_ops/coordination/board.html](coordination/board.html)
- 재사용 가능한 조사 내용을 볼 때: [_research/index.ko.md](../_research/index.ko.md)
- 겹치는 운영 구조와 source of truth를 확인할 때: [_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md](../_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md)
- 저장소 구조를 볼 때: [_ops/maps/repository-map.md](maps/repository-map.md)
- 프롬프트 목록을 볼 때: [_ops/maps/prompt-map.md](maps/prompt-map.md)
- 반복 작업을 줄일 때: [_docs/capability-governance.md](../_docs/capability-governance.md)
- 오픈소스 설치 기준을 볼 때: [_docs/open-source-installation-policy.ko.md](../_docs/open-source-installation-policy.ko.md), [_docs/open-source-installation-policy.en.md](../_docs/open-source-installation-policy.en.md)
- 설치 기록을 확인할 때: [_ops/installations/README.ko.md](installations/README.ko.md), [_ops/installations/registry.json](installations/registry.json), [_history/installations/README.ko.md](../_history/installations/README.ko.md)
- 지속 지시를 확인할 때: [_docs/persistent-instructions.md](../_docs/persistent-instructions.md)
- 검색 기반 계획 정책을 확인할 때: [_docs/search-insight-planning-policy.ko.md](../_docs/search-insight-planning-policy.ko.md), [_docs/search-insight-planning-policy.en.md](../_docs/search-insight-planning-policy.en.md)
- 문서 언어 정책을 확인할 때: [_docs/documentation-language-policy.ko.md](../_docs/documentation-language-policy.ko.md), [_docs/documentation-language-policy.en.md](../_docs/documentation-language-policy.en.md)

## Update Rule

새 폴더, 새 프롬프트, 새 워크플로, 새 운영 규칙을 추가하면 다음을 함께 확인한다.

- 관련 문서가 업데이트됐는가
- `_history/YYYY/YYYY-MM-DD.md`에 맥락이 남았는가
- `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`에 빠른 요약이 남았는가
- `_history/web-searches/YYYY/`에 공개 검색 판단 기록이 남았는가
- 선택한 `work_mode`가 evaluator input과 계획/요약에 반영됐는가
- `ship_first`에서 미룬 비차단 개선이 `_ops/backlog/` 또는 프로젝트별 백로그에 남았는가
- 컨텍스트 아카이빙이 발생했다면 `_history/context-archives/YYYY/`에 재개 패킷이 남았는가
- 사용자 요청 요약이 `_history/user-requests/YYYY/`에 남았는가
- 요구사항 기준선, 변경, 검토 기록이 `_requirements/` 또는 해당 프로젝트의 `docs/requirements/`에 남았는가
- spec-driven 산출물이 `_specs/` 또는 해당 프로젝트의 `specs/`에 남았는가
- 소스코드 작업이면 코딩 조사에 architecture reference, 최소 2개 architecture option, decision notes가 남았는가
- 병렬 작업이면 `plan-parallel-work` 결과, dependency, touch_paths, merge_gates, conflict controls, coordination targets, merge strategy가 남았는가
- 중요한 원천값과 계획 단계가 `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`로 연결됐는가
- 스킬 작업이 있었다면 `_skills/` 원본, 검증 결과, 개선 아이디어가 남았는가
- 요청-결과 추적표가 `_history/request-traces/YYYY/`에 남았는가
- 설치가 발생했다면 `_history/installations/YYYY/`와 `_ops/installations/registry.json`이 갱신됐는가
- `_ops/maps/`가 현재 구조를 반영하는가
