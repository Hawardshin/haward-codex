# 플랫폼 컨셉 재검토

## 검토 일자

- 2026-06-01

## 현재 컨셉 요약

이 저장소는 단일 앱이 아니라 개인 에이전트 구축 플랫폼과 여러 관심사별 프로젝트를 장기적으로 운영하는 monorepo다. 핵심 방향은 다음과 같다.

- 사용자의 지시를 요구사항 후보로 보고, 요구사항/스펙/계획/검증/평가/히스토리로 이어간다.
- AI의 확률적 추정을 웹 검색, 지식 검증, grounding, 평가, 재작업으로 보강한다.
- 반복되는 작업은 문서, 템플릿, 도구, 스킬, 워크플로, 에이전트로 승격한다.
- 공통 운영 지식은 `_docs`, `_ops`, `_requirements`, `_specs`, `_history`, `_research`, `_tools`, `_skills`, `_philosophy`에 두고, 관심사별 구현은 루트 프로젝트 안에 둔다.
- 프로젝트가 늘어날수록 구조, 이름, history, coordination, dashboard가 다음 작업의 인터페이스가 된다.

## 잘 반영된 축

| 축 | 현재 구현 |
| --- | --- |
| 웹 우선 조사 | `_ops/workflows/05-web-first-intake.md`, `_history/web-searches/` |
| 메모리 부트스트랩 | `agent-platform/configs/memory/bootstrap-manifest.json` |
| 요구사항 기반 운영 | `_requirements/`, `_ops/workflows/35-requirements-lifecycle.md` |
| spec-driven 실행 | `_specs/`, `_ops/workflows/36-spec-driven-development.md` |
| 평가와 재작업 | `_ops/workflows/40-evaluate-and-rework.md`, `work-evaluator-agent` |
| 지식 의심과 grounding | `knowledge-skeptic-agent`, `hallucination-guard-agent` |
| 프로젝트 경계 | `_ops/projects/registry.json`, `_ops/projects/root-structure-policy.json` |
| 컨텍스트 압축 | `_history/context-archives/`, context archive policy |
| 병렬 작업 | `parallel-work-planner-agent`, `_ops/coordination/` |
| 사용성/관측 | `workspace-monitor/`, `_tools/workspace-health/` |
| 이름과 구조 | `_tools/structure-audit/`, `_tools/naming-audit/` |

## 발견한 누락과 보강

| 누락 | 영향 | 이번 보강 |
| --- | --- | --- |
| 철학 문서가 memory bootstrap의 직접 anchor가 아니었다 | 미래 세션이 운영 철학을 건너뛸 수 있음 | `agent_operating_philosophy` anchor 추가 |
| 인간의 최종 권한과 자율성 경계가 철학에 약하게 표현됐다 | 에이전트가 사용자 판단이 필요한 결정을 실행 규칙만으로 처리할 위험 | 철학 원칙 10, 11 추가 |
| 보안/프라이버시가 정책에는 있지만 철학에는 약했다 | secret, private state, 공개 전환을 단순 실행 세부사항으로 볼 위험 | 철학 원칙 12 추가 |
| 운영 비용과 agentic technical debt 관점이 명시적이지 않았다 | full loop 과잉 또는 임시 처리 누적을 설계 문제로 보기 어려움 | 철학 원칙 13 추가 |

## 남은 개선 후보

- 실제 사용자 승인 단계가 필요한 작업을 더 세밀하게 분류하는 autonomy level registry.
- 비용, 시간, 토큰, 도구 호출량을 추적하는 lightweight operations metrics.
- 공개 배포 전 private data review checklist.
- 기존 durable path를 rename할 때 쓰는 migration template.

## 판단

컨셉 자체는 일관적이다. 부족했던 부분은 “에이전트가 똑똑하게 일하는 방법”보다 “에이전트가 어디까지 자율적으로 일해도 되는가, 어떻게 멈추고 되돌릴 수 있는가” 쪽이었다. 이번 보강으로 철학 문서가 운영 규칙과 더 잘 연결된다.
