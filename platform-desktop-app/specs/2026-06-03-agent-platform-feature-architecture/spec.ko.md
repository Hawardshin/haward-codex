# 에이전트 플랫폼 기능 아키텍처 스펙

## 목표

- 설치형 데스크톱 앱의 제품 정체성을 모니터링 대시보드가 아니라 에이전트 역량 플랫폼으로 고정한다.
- 현재 shell, source review, runtime data, decision inbox, history, requirements, monitoring 조각을 명명된 제품 기능 레이어로 재구성한다.
- 고객용 snapshot에서도 제품 기능 구조는 보이되 내부 source path와 검증 세부는 제거한다.
- 기본 네비게이션은 작업/생성/개발/학습 섹션을 전면에 두고 운영/모니터링/문서/거버넌스 섹션은 Operator Center로 분리한다.

## 기능 레이어

| ID | 역할 | 요약 |
| --- | --- | --- |
| `agent_orchestration` | primary | task pipe, process graph, lane, decision inbox, merge gate를 묶는 실행 조율 기능 |
| `agent_work_environment` | primary | app-selected workspace, runtime data, task-run store, support bundle, accumulated data 기능 |
| `agent_development_environment` | primary | source review, multi-file editor, diff, templates, requirements/spec/validation workbench |
| `agent_factory` | primary | 반복 작업을 prompt/workflow/template/tool/skill/agent/feature로 승격하는 기능 |
| `learning_improvement_loop` | primary | intent map, history, timings, evaluations, evidence를 학습 루프로 축적하는 기능 |
| `observability_monitoring` | supporting | 구조, 문서, 히스토리, source inventory, readiness를 보는 보조 관측 기능 |

## 요구

- `platform-desktop-app/configs/product-feature-registry.json`가 primary/supporting feature source of truth가 되어야 한다.
- Workspace snapshot은 `productFeatureArchitecture`를 포함해야 한다.
- Overview 첫 화면은 feature architecture를 먼저 보여야 한다.
- user view와 customer snapshot은 `overview`, `desktop`, `agents`, `source`, `intent`를 기본 작업 섹션으로 써야 한다.
- `projects`, `history`, `structure`, `documents`, `requirements`는 기본 작업 네비게이션이 아니라 Operator Center에서 열려야 한다.
- readiness/test는 monitoring이 primary product로 되돌아가는 경우 실패해야 한다.

## 비범위

- 새 agent runtime framework 설치.
- public signing/notarization.
- `renderer/workspace-monitor` package rename.
