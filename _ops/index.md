# Operations Index

## What Is Where

| Path | Role |
| --- | --- |
| `_ops/` | 운영 허브, 프롬프트 라우터, 워크플로, 저장소 맵 |
| `_ops/assistant-runtimes/` | Codex, Claude Code, Cursor, Antigravity 등 runtime adapter 레지스트리 |
| `_ops/naming/` | 프로젝트, 도구, 스킬, 문서, 스펙, 히스토리, 설정, 소스 이름 규칙 |
| `_ops/projects/` | 루트 프로젝트 등록부와 경계 관리 |
| `_research/` | 인터넷 조사와 외부 레퍼런스 중 재사용 가능한 내용 |
| `_docs/` | 장기 운영 규칙, 의사결정, 컨텍스트 관리의 카테고리형 문서 루트 |
| `_docs/instructions/` | 지속 지시와 기본 workspace rule |
| `_docs/policies/` | 실행 정책 |
| `_docs/operating-models/` | 플랫폼/컨텍스트/assistant 운영 모델 |
| `_docs/governance/` | 구조와 capability 관리 기준 |
| `_philosophy/` | 에이전트와 플랫폼 운영의 근본 철학 |
| `_requirements/` | 공통 요구사항 기준선, 변경 기록, 검토 기록 |
| `_specs/` | 공통 spec-driven 산출물, 구현 계획, 작업 목록, 검증, traceability |
| `_history/` | 날짜별 작업 히스토리와 압축된 맥락 |
| `_history/context-archives/` | 긴 컨텍스트를 문서 기반으로 재개하기 위한 압축 아카이브 패킷 |
| `_history/user-requests/` | 사용자가 요청한 내용의 의미 요약과 반영 위치 |
| `_history/request-traces/` | 요청이 실제 결과, 산출물, 평가, 커밋으로 이어진 흐름 |
| `_history/work-summaries/` | 나중에 빠르게 읽는 날짜별 작업 요약과 HTML 인덱스 |
| `_history/web-searches/` | 모든 지시/프롬프트 실행의 웹 검색과 공개 판단 요약 |
| `_history/work-timings/` | 작업별 phase 소요시간과 병목 후보 |
| `_history/installations/` | 실제 설치/업그레이드/제거 상세 감사 기록 |
| `_history/plans/` | 에이전트 계획 과정 기록 |
| `_skills/` | git으로 추적하는 커스텀 Codex 스킬 원본 |
| `_templates/` | 새 프로젝트, HTML 산출물, Python 에이전트, assistant operating principle 템플릿 |
| `_tools/` | 반복 작업을 줄이는 로컬 도구 |
| `agent-platform/` | 개인 에이전트 구축 플랫폼 중심 프로젝트 |
| `_ops/installations/` | 설치 레지스트리와 설치 감사 규칙 |
| `_ops/backlog/` | `ship_first`와 빠른 작업에서 미룬 공통 비차단 개선 목록 |

## Navigation

- 작업을 시작할 때: [_ops/workflows/00-start-here.md](workflows/00-start-here.md)
- 모든 지시의 첫 웹 검색: [_ops/workflows/05-web-first-intake.md](workflows/05-web-first-intake.md), [_docs/policies/web-first-work-policy.ko.md](../_docs/policies/web-first-work-policy.ko.md)
- 프롬프트 공통 웹 검색 계약: [_ops/prompts/README.ko.md](prompts/README.ko.md), [_history/web-searches/README.ko.md](../_history/web-searches/README.ko.md)
- 새 세션의 AI 메모리 부트스트랩: [_ops/workflows/01-memory-bootstrap.md](workflows/01-memory-bootstrap.md), [agent-platform/configs/memory/bootstrap-manifest.json](../agent-platform/configs/memory/bootstrap-manifest.json)
- 작업 모드와 전체 루프 강도를 고르고 prompt-only가 아니라 강제되는 mode gate를 확인할 때: [_ops/workflows/02-select-work-mode.md](workflows/02-select-work-mode.md), [_ops/prompts/02-select-work-mode.md](prompts/02-select-work-mode.md), [work-mode-registry.json](../agent-platform/configs/workflows/work-mode-registry.json), [_docs/policies/work-mode-enforcement-policy.ko.md](../_docs/policies/work-mode-enforcement-policy.ko.md)
- 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 UI/운영 화면에서 나눌 때: [_ops/workflows/73-view-mode-selection.md](workflows/73-view-mode-selection.md), [_ops/prompts/103-view-mode-selection.md](prompts/103-view-mode-selection.md), [view-mode-registry.json](../agent-platform/configs/access/view-mode-registry.json), [_docs/policies/view-mode-policy.ko.md](../_docs/policies/view-mode-policy.ko.md)
- 설치 대상을 사용자용 사용 환경과 개발자용 개선 환경으로 나눌 때: [_ops/workflows/62-select-install-mode.md](workflows/62-select-install-mode.md), [_ops/prompts/92-select-install-mode.md](prompts/92-select-install-mode.md), [install-mode-registry.json](../agent-platform/configs/installations/install-mode-registry.json)
- 플랫폼을 사용자가 설치하는 desktop/end-user software로 제품화하거나 Tauri/Electron/MSIX/DMG/signing/notarization/update/uninstall을 검토할 때: [_ops/workflows/63-installable-software-productization.md](workflows/63-installable-software-productization.md), [_ops/prompts/93-installable-software-productization.md](prompts/93-installable-software-productization.md), [desktop-distribution-registry.json](../platform-desktop-app/configs/desktop-distribution-registry.json)
- 설치형 desktop app의 사용자 플로우, 첫 실행 온보딩, workspace chooser, task timeline, decision inbox, 설정/복구 흐름을 설계할 때: [_ops/workflows/74-desktop-user-flow-design.md](workflows/74-desktop-user-flow-design.md), [_ops/prompts/104-desktop-user-flow-design.md](prompts/104-desktop-user-flow-design.md), [user-flow-registry.json](../platform-desktop-app/configs/user-flow-registry.json), [user-flow-map.html](../platform-desktop-app/artifacts/user-flow-map.html)
- Rust, Go, Tauri, Wails, Electron, Python, TypeScript/Next.js 같은 런타임/언어 선택을 조사하고 설계할 때: [_ops/workflows/64-runtime-language-research-design.md](workflows/64-runtime-language-research-design.md), [_ops/prompts/94-runtime-language-research-design.md](prompts/94-runtime-language-research-design.md), [language-decision-registry.json](../agent-platform/configs/runtime/language-decision-registry.json)
- 설치형 플랫폼이나 프로젝트가 외부 CLI를 사용하되 특정 CLI에 종속되지 않는 adapter 경계를 설계할 때: [_ops/workflows/66-cli-adapter-integration.md](workflows/66-cli-adapter-integration.md), [_ops/prompts/97-cli-adapter-integration.md](prompts/97-cli-adapter-integration.md), [cli-adapter-registry.json](../agent-platform/configs/integrations/cli-adapter-registry.json)
- 하나의 동작이 여러 CLI 프로세스를 실행하거나 stdout/stderr/stdin pipe, fan-out/fan-in merge, desktop/monitor/local daemon 기반 CLI orchestration을 설계할 때: [_ops/workflows/71-cli-pipeline-orchestration.md](workflows/71-cli-pipeline-orchestration.md), [_ops/prompts/101-cli-pipeline-orchestration.md](prompts/101-cli-pipeline-orchestration.md), [cli-pipeline-template.json](../agent-platform/configs/integrations/cli-pipeline-template.json), [cli-pipeline-agent](../agent-platform/docs/cli-pipeline-agent.ko.md)
- 여러 에이전트를 쉽게 만들거나, agent spec을 등록/변경하거나, supervisor/router/pipeline/fan-out/handoff 오케스트레이션을 설계할 때: [_ops/workflows/72-agent-creation-orchestration.md](workflows/72-agent-creation-orchestration.md), [_ops/prompts/102-agent-creation-orchestration.md](prompts/102-agent-creation-orchestration.md), [agent-orchestration-registry.json](../agent-platform/configs/orchestration/agent-orchestration-registry.json), [agent-orchestration-platform](../agent-platform/docs/agent-orchestration-platform.ko.md)
- 작업 중 반복, 병목, 누락, 검증 실패, 수동 재작업을 감지해 기능 추가 후보로 자동 승격할 때: [_ops/workflows/75-capability-promotion.md](workflows/75-capability-promotion.md), [_ops/prompts/105-capability-promotion.md](prompts/105-capability-promotion.md), [capability-promotion-registry.json](../agent-platform/configs/orchestration/capability-promotion-registry.json), [capability-promotion-agent](../agent-platform/docs/capability-promotion-agent.ko.md)
- 비정형 입력을 요구사항, 스펙, 태스크, evidence item, 표, JSON 같은 정형 기록으로 바꿀 때: [_ops/workflows/67-structure-unstructured-data.md](workflows/67-structure-unstructured-data.md), [_ops/prompts/98-structure-unstructured-data.md](prompts/98-structure-unstructured-data.md), [unstructured-data-structuring-profile.json](../agent-platform/configs/usage/unstructured-data-structuring-profile.json)
- 작업을 닫기 전에 빠뜨린 지시/요구사항/산출물/검증이 없는지 확인할 때: [_ops/workflows/68-omission-prevention.md](workflows/68-omission-prevention.md), [_ops/prompts/99-omission-prevention.md](prompts/99-omission-prevention.md), [_docs/policies/omission-prevention-policy.ko.md](../_docs/policies/omission-prevention-policy.ko.md), [omission-guard-agent](../agent-platform/docs/omission-guard-agent.ko.md)
- 장시간 실행, 브라우저 자동화, worker, cache, stream, 대용량 처리, 외부 CLI 등에서 메모리/리소스 누수 위험을 확인할 때: [_ops/workflows/69-resource-leak-prevention.md](workflows/69-resource-leak-prevention.md), [_ops/prompts/100-resource-leak-prevention.md](prompts/100-resource-leak-prevention.md), [_docs/policies/resource-leak-prevention-policy.ko.md](../_docs/policies/resource-leak-prevention-policy.ko.md), [resource-guard-agent](../agent-platform/docs/resource-guard-agent.ko.md)
- 지연 개선 백로그를 볼 때: [_ops/backlog/deferred-improvements.ko.md](backlog/deferred-improvements.ko.md)
- 플랫폼 설명을 볼 때: [README.md](../README.md), [_docs/operating-models/platform-identity-operating-model.ko.md](../_docs/operating-models/platform-identity-operating-model.ko.md), [agent-platform/README.md](../agent-platform/README.md)
- `_docs` 카테고리와 누락 방지 규칙을 볼 때: [_docs/README.ko.md](../_docs/README.ko.md), [_docs/registry.json](../_docs/registry.json), [_tools/docs-audit/README.ko.md](../_tools/docs-audit/README.ko.md)
- 이름 구조와 네이밍 규칙을 볼 때: [_docs/governance/naming-governance.ko.md](../_docs/governance/naming-governance.ko.md), [_ops/naming/naming-policy.json](naming/naming-policy.json), [_tools/naming-audit/README.ko.md](../_tools/naming-audit/README.ko.md)
- 공유 설정 파일 자기 설명 기준: [_docs/policies/self-documenting-config-policy.ko.md](../_docs/policies/self-documenting-config-policy.ko.md), `agent-platform`의 `check-config-contract`
- 도구 독립형 AI assistant 운영 원칙: [_docs/operating-models/tool-agnostic-agent-operating-model.ko.md](../_docs/operating-models/tool-agnostic-agent-operating-model.ko.md), [_ops/assistant-runtimes/adapter-registry.json](assistant-runtimes/adapter-registry.json), [_templates/assistant-operating-principles/README.ko.md](../_templates/assistant-operating-principles/README.ko.md)
- 출처 수집 기준을 볼 때: [_docs/policies/source-collection-policy.ko.md](../_docs/policies/source-collection-policy.ko.md)
- 핵심 조사 에이전트 프로필을 볼 때: [agent-platform/configs/research/research-agent-profile.json](../agent-platform/configs/research/research-agent-profile.json)
- 사람이 실제로 검색하듯 query ladder/source lane/snowballing을 사용할 때: [_ops/workflows/54-human-like-source-discovery.md](workflows/54-human-like-source-discovery.md), [_ops/prompts/84-human-like-source-discovery.md](prompts/84-human-like-source-discovery.md), [human-search-profile.json](../agent-platform/configs/research/human-search-profile.json)
- AI를 잘 쓰는 사람과 못 쓰는 사람의 차이를 진단하거나, 질문/지시가 모호/편향/유도형/검증 불가이거나, 역질문을 제한된 budget 안에서 해야 하거나, 질문 답변 대기 중 전체 작업을 멈추지 않고 `blocked_decision`/`unblocked_work`를 나눠야 하거나, 약한/비추론 모델에 2-pass 전략이 필요한지 판단할 때: [_docs/operating-models/ai-usage-gap-operating-model.ko.md](../_docs/operating-models/ai-usage-gap-operating-model.ko.md), [_ops/workflows/59-bridge-ai-usage-gap.md](workflows/59-bridge-ai-usage-gap.md), [_ops/prompts/89-bridge-ai-usage-gap.md](prompts/89-bridge-ai-usage-gap.md), [ai-usage-gap-profile.json](../agent-platform/configs/usage/ai-usage-gap-profile.json)
- 사람의 답변/승인/선호 결정을 한 곳에 모으고, 답변 도착 시 현재 작업을 checkpoint한 뒤 interrupt/resume 해야 할 때: [_ops/coordination/human-decision-inbox.ko.md](coordination/human-decision-inbox.ko.md), [_ops/workflows/61-human-decision-inbox.md](workflows/61-human-decision-inbox.md), [_ops/prompts/91-human-decision-inbox.md](prompts/91-human-decision-inbox.md), [human-decision-inbox.json](coordination/human-decision-inbox.json)
- 많은 출처 묶음이나 query plan을 정리할 때: [_tools/source-collector/README.ko.md](../_tools/source-collector/README.ko.md)
- 더 넓은 검색 원천을 고를 때: [source-discovery-registry.json](../agent-platform/configs/research/source-discovery-registry.json)
- 한국 사용자 리뷰/로컬 조사 소스를 볼 때: [_research/source-lists/korean-local-review-sources.ko.md](../_research/source-lists/korean-local-review-sources.ko.md), [_tools/korean-local-review/README.ko.md](../_tools/korean-local-review/README.ko.md)
- 프롬프트를 고를 때: [_ops/prompts/00-router.md](prompts/00-router.md)
- 속도 개선을 위해 작업을 병렬 lane으로 나눌 때: [_ops/workflows/52-parallel-work-planning.md](workflows/52-parallel-work-planning.md), [_ops/prompts/82-parallel-work-planning.md](prompts/82-parallel-work-planning.md), [parallel-work-planner-agent](../agent-platform/docs/parallel-work-planner-agent.ko.md)
- 운영 철학과 컨셉 재검토를 볼 때: [_philosophy/agent-operating-philosophy.ko.md](../_philosophy/agent-operating-philosophy.ko.md), [_philosophy/platform-concept-review.ko.md](../_philosophy/platform-concept-review.ko.md)
- 프로젝트 경계를 확인할 때: [_ops/projects/index.ko.md](projects/index.ko.md), [_docs/policies/project-boundary-policy.ko.md](../_docs/policies/project-boundary-policy.ko.md)
- 새 코딩 프로젝트를 기술별 구조로 준비할 때: [_ops/workflows/27-bootstrap-coding-project.md](workflows/27-bootstrap-coding-project.md), [_ops/prompts/27-bootstrap-coding-project.md](prompts/27-bootstrap-coding-project.md), [_tools/coding-project-bootstrap/README.ko.md](../_tools/coding-project-bootstrap/README.ko.md)
- root folder class와 local-only 규칙을 확인할 때: [_ops/projects/root-structure-policy.json](projects/root-structure-policy.json), [_tools/structure-audit/README.ko.md](../_tools/structure-audit/README.ko.md)
- 웹 검색 기반 인사이트로 계획할 때: [_ops/workflows/55-research-insight-planning.md](workflows/55-research-insight-planning.md)
- 코딩 조사 결과를 구현으로 넘기기 전에: [_ops/workflows/56-coding-research.md](workflows/56-coding-research.md), [agent-platform/docs/coding-research-agent.ko.md](../agent-platform/docs/coding-research-agent.ko.md)
- 딥리서치나 긴 보고서형 조사를 수행할 때: [_ops/workflows/57-deep-research.md](workflows/57-deep-research.md), [agent-platform/docs/deep-research-agent.ko.md](../agent-platform/docs/deep-research-agent.ko.md)
- 코딩 조사 출처 설정을 확인할 때: [agent-platform/configs/research/README.ko.md](../agent-platform/configs/research/README.ko.md)
- 소스코드 작성 전 아키텍처 후보 비교 기준을 볼 때: [_docs/policies/architecture-first-coding-policy.ko.md](../_docs/policies/architecture-first-coding-policy.ko.md), [agent-platform/configs/research/coding-research-profile.json](../agent-platform/configs/research/coding-research-profile.json)
- 대기업/고신뢰 사이트 목록을 볼 때: [_docs/policies/enterprise-source-list-policy.ko.md](../_docs/policies/enterprise-source-list-policy.ko.md), [enterprise-source-registry.json](../agent-platform/configs/research/enterprise-source-registry.json), [_research/source-lists/enterprise-high-quality-sites.ko.md](../_research/source-lists/enterprise-high-quality-sites.ko.md)
- 최종 사실 주장을 검증할 때: [_ops/workflows/70-hallucination-prevention.md](workflows/70-hallucination-prevention.md), [_docs/policies/hallucination-prevention-policy.ko.md](../_docs/policies/hallucination-prevention-policy.ko.md)
- 계획 과정을 볼 때: [_history/plans/README.ko.md](../_history/plans/README.ko.md)
- 컨텍스트가 길어져 재개 패킷이 필요할 때: [_docs/policies/context-archive-policy.ko.md](../_docs/policies/context-archive-policy.ko.md), [_history/context-archives/README.ko.md](../_history/context-archives/README.ko.md), [_ops/workflows/45-context-archive.md](workflows/45-context-archive.md)
- 사용자 요청 요약을 볼 때: [_history/user-requests/README.ko.md](../_history/user-requests/README.ko.md), [_docs/policies/user-request-summary-policy.ko.md](../_docs/policies/user-request-summary-policy.ko.md)
- 요구사항 기준선을 볼 때: [_requirements/README.ko.md](../_requirements/README.ko.md), [_requirements/baselines/2026-05-31-workspace-platform.ko.md](../_requirements/baselines/2026-05-31-workspace-platform.ko.md)
- 요구사항을 정의/검토/변경할 때: [_ops/workflows/35-requirements-lifecycle.md](workflows/35-requirements-lifecycle.md), [_ops/prompts/35-manage-requirements.md](prompts/35-manage-requirements.md), [agent-platform/docs/requirements-manager-agent.ko.md](../agent-platform/docs/requirements-manager-agent.ko.md)
- spec-driven 산출물을 볼 때: [_specs/README.ko.md](../_specs/README.ko.md), [_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md](../_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md)
- 요구사항을 스펙/계획/작업/검증으로 바꿀 때: [_ops/workflows/36-spec-driven-development.md](workflows/36-spec-driven-development.md), [_ops/prompts/36-manage-spec.md](prompts/36-manage-spec.md), [agent-platform/docs/spec-driven-planner-agent.ko.md](../agent-platform/docs/spec-driven-planner-agent.ko.md)
- 스펙이 애매하거나 현재 소스/테스트/산출물과 다를 때: [_ops/workflows/38-spec-source-reconciliation.md](workflows/38-spec-source-reconciliation.md), [_ops/prompts/38-reconcile-spec-source.md](prompts/38-reconcile-spec-source.md), [agent-platform/docs/spec-reconciliation-agent.ko.md](../agent-platform/docs/spec-reconciliation-agent.ko.md)
- 커스텀 스킬을 만들거나 검증/개선할 때: [_docs/policies/skill-lifecycle-policy.ko.md](../_docs/policies/skill-lifecycle-policy.ko.md), [_ops/workflows/37-skill-lifecycle.md](workflows/37-skill-lifecycle.md), [_ops/prompts/37-manage-skill.md](prompts/37-manage-skill.md), [agent-platform/docs/skill-lifecycle-agent.ko.md](../agent-platform/docs/skill-lifecycle-agent.ko.md)
- 요청이 어떤 결과로 이어졌는지 볼 때: [_history/request-traces/README.ko.md](../_history/request-traces/README.ko.md), [_docs/policies/request-traceability-policy.ko.md](../_docs/policies/request-traceability-policy.ko.md)
- 완료된 작업을 빠르게 볼 때: [_history/work-summaries/README.ko.md](../_history/work-summaries/README.ko.md), [_history/work-summaries/index.html](../_history/work-summaries/index.html)
- 진행 중인 에이전트/병렬 작업을 볼 때: [_ops/coordination/board.ko.md](coordination/board.ko.md), [_ops/coordination/board.html](coordination/board.html)
- 작업별 병목과 소요시간을 볼 때: [_history/work-timings/README.ko.md](../_history/work-timings/README.ko.md), [_tools/work-timer/README.ko.md](../_tools/work-timer/README.ko.md)
- 재사용 가능한 조사 내용을 볼 때: [_research/index.ko.md](../_research/index.ko.md)
- 겹치는 운영 구조와 source of truth를 확인할 때: [_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md](../_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md)
- 저장소 구조를 볼 때: [_ops/maps/repository-map.md](maps/repository-map.md)
- 전체 health check를 한 번에 실행하거나 category/JSON 출력을 쓸 때: [_tools/workspace-health/README.ko.md](../_tools/workspace-health/README.ko.md)
- 프롬프트 목록을 볼 때: [_ops/maps/prompt-map.md](maps/prompt-map.md)
- 반복 작업을 줄일 때: [_docs/governance/capability-governance.md](../_docs/governance/capability-governance.md)
- 오픈소스 설치 기준을 볼 때: [_docs/policies/open-source-installation-policy.ko.md](../_docs/policies/open-source-installation-policy.ko.md), [_docs/policies/open-source-installation-policy.en.md](../_docs/policies/open-source-installation-policy.en.md)
- 사용자용/개발자용 설치 모드 기준을 볼 때: [_docs/policies/install-mode-policy.ko.md](../_docs/policies/install-mode-policy.ko.md), [_docs/policies/install-mode-policy.en.md](../_docs/policies/install-mode-policy.en.md)
- 설치 기록을 확인할 때: [_ops/installations/README.ko.md](installations/README.ko.md), [_ops/installations/registry.json](installations/registry.json), [_history/installations/README.ko.md](../_history/installations/README.ko.md)
- 지속 지시를 확인할 때: [_docs/instructions/persistent-instructions.md](../_docs/instructions/persistent-instructions.md)
- 검색 기반 계획 정책을 확인할 때: [_docs/policies/search-insight-planning-policy.ko.md](../_docs/policies/search-insight-planning-policy.ko.md), [_docs/policies/search-insight-planning-policy.en.md](../_docs/policies/search-insight-planning-policy.en.md)
- 문서 언어 정책을 확인할 때: [_docs/policies/documentation-language-policy.ko.md](../_docs/policies/documentation-language-policy.ko.md), [_docs/policies/documentation-language-policy.en.md](../_docs/policies/documentation-language-policy.en.md)

## Update Rule

새 폴더, 새 프롬프트, 새 워크플로, 새 운영 규칙을 추가하면 다음을 함께 확인한다.

- 관련 문서가 업데이트됐는가
- `_docs`를 바꿨다면 `_docs/registry.json` category와 `python3 _tools/docs-audit/src/docs_audit.py --check` 결과가 맞는가
- durable name, naming policy, naming governance가 바뀌면 `python3 _tools/naming-audit/src/naming_audit.py --check`를 통과했는가
- `_history/YYYY/YYYY-MM-DD.md`에 맥락이 남았는가
- `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`에 빠른 요약이 남았는가
- `_history/web-searches/YYYY/`에 공개 검색 판단 기록이 남았는가
- 선택한 `work_mode`가 evaluator input과 계획/요약에 반영됐는가
- UI, dashboard, monitor, admin surface의 audience가 바뀌었다면 `view_mode`가 선택됐고 `check-view-modes`를 통과했는가
- `quick`이 아닌 작업이면 `mode_selection_record_targets`가 남았고, 모드 정책 변경 시 `check-work-modes`를 통과했는가
- `quick`이 아닌 작업이면 `omission_check_targets`가 남아 필수 지시/요구사항/산출물/검증 coverage가 확인됐는가
- 메모리/리소스 누수 위험이 있는 작업이면 `resource_risk_occurred=true`와 `resource_check_targets`가 남았는가
- multi-process CLI orchestration 작업이면 `cli_pipeline_occurred=true`와 `cli_pipeline_targets`가 남았는가
- reusable agent 생성 또는 multi-agent orchestration 계약 변경이면 `check-agent-orchestration`을 통과했는가
- bounded black-box capability promotion이 발생했다면 관찰 근거, 기존 자산 확인, 기각한 더 가벼운 대안, 위험도, 검증, rollback/disablement, 평가, 커밋/push trace가 남았는가
- 작업별 timing record가 `_history/work-timings/YYYY/`에 남고 `timing_summary_targets`에 연결됐는가
- `ship_first`에서 미룬 비차단 개선이 `_ops/backlog/` 또는 프로젝트별 백로그에 남았는가
- 컨텍스트 아카이빙이 발생했다면 `_history/context-archives/YYYY/`에 재개 패킷이 남았는가
- 사용자 요청 요약이 `_history/user-requests/YYYY/`에 남았는가
- 요구사항 기준선, 변경, 검토 기록이 `_requirements/` 또는 해당 프로젝트의 `docs/requirements/`에 남았는가
- spec-driven 산출물이 `_specs/` 또는 해당 프로젝트의 `specs/`에 남았는가
- 스펙이 애매하거나 소스/테스트/산출물과 달랐다면 `reconcile-spec` 결과와 `clarification_needed` 질문/답변 기록이 남았는가
- 소스코드 작업이면 코딩 조사에 architecture reference, 최소 2개 architecture option, decision notes가 남았는가
- 병렬 작업이면 `plan-parallel-work` 결과, dependency, touch_paths, merge_gates, conflict controls, coordination targets, merge strategy가 남았는가
- root folder, project registry, reserved folder, runtime adapter folder, local-only rule이 바뀌면 `python3 _tools/structure-audit/src/structure_audit.py --check`를 통과했는가
- 전체 감사/테스트 상태가 필요하면 `python3 _tools/workspace-health/src/workspace_health.py`를 실행했는가. 필요한 경우 `--category`나 `--json`으로 범위와 출력 형식을 명시했는가
- 중요한 원천값과 계획 단계가 `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`로 연결됐는가
- 스킬 작업이 있었다면 `_skills/` 원본, 검증 결과, 개선 아이디어가 남았는가
- 요청-결과 추적표가 `_history/request-traces/YYYY/`에 남았는가
- 설치가 발생했다면 `_history/installations/YYYY/`와 `_ops/installations/registry.json`이 갱신됐는가
- `_ops/maps/`가 현재 구조를 반영하는가
