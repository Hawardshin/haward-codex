# 2026-05-31 계획 기록: Spec-Driven 개발 구조

## 초기 지시 요약

사용자는 요구사항 관리 구조가 spec-driven 방식과 유사해야 한다고 지시했다.

## 조사

- 웹 검색을 먼저 수행했다.
- GitHub Spec Kit, Kiro Feature Specs, IBM spec-driven development, ReqToCode 논문을 확인했다.
- 이 저장소에는 완전 자동 spec-as-source보다 spec-anchored 문서 기반 구조가 적합하다고 판단했다.

## 계획

1. `_specs/` 공통 스펙 계층을 추가한다.
2. 이번 변경 자체를 spec, plan, tasks, validation, traceability로 기록한다.
3. spec-driven 정책, 프롬프트, 워크플로, 템플릿을 추가한다.
4. `spec-driven-planner-agent`를 추가한다.
5. `work-evaluator-agent`가 `spec_targets` 누락을 blocking gap으로 보게 한다.
6. 요구사항 기준선에 `REQ-WS-013`을 추가하고 변경/검토 기록을 남긴다.
7. 운영 문서, 메모리 부트스트랩, 히스토리, 리서치, 조율 보드, 맵을 갱신한다.

## 공개 판단

요구사항 관리만으로는 spec-driven이라고 보기 어렵다. 스펙이 구현 가능한 acceptance criteria와 계획, 작업 목록, 검증, traceability로 나뉘어야 AI가 단일 프롬프트 추측으로 구현하지 않고 명시적 기준에 맞춰 작업할 수 있다.

## 완료 기준

- `_specs/`와 이번 작업의 스펙 산출물이 존재한다.
- 평가 입력이 `spec_targets`를 요구한다.
- 테스트와 평가가 통과한다.
- 커밋 후 push한다.
