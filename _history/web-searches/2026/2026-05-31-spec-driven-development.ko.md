# 2026-05-31 웹 검색 기록: Spec-Driven 개발 구조

## 사용자 지시 요약

사용자는 요구사항 관리 구조를 spec-driven 방식과 유사하게 만들어야 한다고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `spec driven development workflow requirements specification tasks implementation validation best practices`
  - `GitHub Spec Kit spec driven development specifications plan tasks constitution`
  - `AWS Kiro spec driven development requirements design tasks workflow`
  - `requirements specification driven development traceability implementation validation best practices`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | 오픈소스 | 2026-05-31 | constitution, specify, plan, tasks, implement, clarify/analyze/checklist 같은 spec-driven 단계와 산출물 구조를 참고했다. |
| [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/) | 제품 공식 문서 | 2026-05-31 | Requirements-First와 Design-First 흐름, requirements → design → tasks 구조, EARS식 testable requirement를 참고했다. |
| [IBM: Spec-Driven Development](https://www.ibm.com/think/topics/spec-driven-development) | 기술 해설 | 2026-05-31 | spec-first, spec-anchored, spec-as-source 스펙트럼과 자동 테스트를 통한 spec/code 동기화 관점을 참고했다. |
| [ReqToCode paper](https://arxiv.org/abs/2603.13999) | 논문 | 2026-05-31 | 요구사항과 코드/테스트 사이의 bidirectional traceability를 구조 속성으로 두는 방향을 참고했다. |

## 제외하거나 보조로만 본 출처

- Reddit과 일반 블로그는 실무 신호로만 보고, 정책 근거는 오픈소스/공식 문서/논문을 우선했다.
- 특정 도구 설치는 이번 범위에서 제외했다. 저장소 문서 기반 구조를 먼저 만든다.

## 계획에 반영한 인사이트

- 요구사항만으로는 spec-driven이 부족하다. `spec`, `plan`, `tasks`, `validation`, `traceability`를 별도 산출물로 둔다.
- 현재 수준은 IBM의 분류로 보면 "spec-anchored"에 가깝다. 스펙은 코드 생성의 완전 자동 source가 아니라 구현과 평가의 기준이다.
- Kiro식 requirements/design/tasks 흐름과 Spec Kit식 specify/plan/tasks/implement 흐름을 혼합해 이 저장소에 맞는 경량 구조를 만든다.

## 남은 불확실성

- 외부 도구를 설치하지 않았으므로 자동 생성/검증은 아직 없다. 스펙 수가 늘어나면 `_tools/`에 spec coverage checker를 만들 수 있다.

## 연결

- 스펙: `_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md`
- 정책: `_docs/policies/spec-driven-development-policy.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-spec-driven-development.ko.md`
