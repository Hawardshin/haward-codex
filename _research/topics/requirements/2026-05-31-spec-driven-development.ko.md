# Spec-Driven 개발 구조

## 질문

요구사항 관리 구조를 spec-driven 방식과 유사하게 운영하려면 어떤 산출물과 평가 기준이 필요한가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | 오픈소스 | 2026-05-31 | specification, plan, tasks, implementation, clarify/analyze/checklist 단계 구조를 참고했다. |
| [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/) | 공식 문서 | 2026-05-31 | requirements-first/design-first 흐름, requirements → design → tasks 구조, testable requirements를 참고했다. |
| [IBM: Spec-Driven Development](https://www.ibm.com/think/topics/spec-driven-development) | 기술 해설 | 2026-05-31 | spec-first, spec-anchored, spec-as-source 구분을 참고했다. |
| [ReqToCode](https://arxiv.org/abs/2603.13999) | 논문 | 2026-05-31 | 요구사항과 구현/테스트 traceability를 구조적으로 검증하는 방향을 참고했다. |

## 인사이트

- 이 저장소에는 완전 자동 spec-as-source보다 spec-anchored 방식이 적합하다.
- 공통 workspace 스펙은 `_specs/`, 프로젝트별 스펙은 프로젝트 내부 `specs/`에 둔다.
- 종료 평가는 `requirements_targets`뿐 아니라 `spec_targets`도 확인해야 한다.
- 최소 산출물은 `spec`, `plan`, `tasks`, `validation`, `traceability`이다.

## 적용

- `_specs/`를 추가했다.
- `spec-driven-planner-agent`를 추가했다.
- `work-evaluator-agent`에 `spec_targets`를 추가했다.
