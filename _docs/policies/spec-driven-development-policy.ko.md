# Spec-Driven 개발 정책

## 목적

사용자 요청과 요구사항을 바로 구현하지 않고, 명시적인 스펙, 구현 계획, 작업 목록, 검증 기록, traceability를 통해 구현한다.

## 원칙

- 요구사항은 "무엇이 필요한가"를 정의한다.
- 스펙은 "무엇을 만들고 어떤 조건을 만족해야 하는가"를 정의한다.
- 계획은 "어떻게 구현하고 검증할 것인가"를 정의한다.
- 작업 목록은 "어떤 순서로 실행할 것인가"를 정의한다.
- 검증 기록은 "스펙과 구현이 맞는가"를 확인한다.
- traceability는 요청, 요구사항, 스펙, 작업, 파일, 평가, 커밋을 연결한다.
- 활성 스펙이 애매하거나 현재 소스/테스트/산출물과 다르면 구현 전 `_ops/workflows/38-spec-source-reconciliation.md`를 실행해 `update_spec`, `update_source`, `ask_user`, `defer`로 분류한다.
- `ask_user`로 분류한 이슈는 `clarification_needed` 알림으로 질문하고, 사용자 답변이 기록될 때까지 관련 스펙이나 소스를 수정하지 않는다. 단, 해당 답변과 무관한 조사, 대안 비교, 테스트, 문서화는 `unblocked_work`로 계속 진행할 수 있다.

## 적용 조건

다음 작업은 spec-driven 산출물을 만들거나 갱신한다.

- 새 기능, 새 에이전트, 새 도구, 새 프로젝트
- 운영 규칙이나 평가 루프 변경
- 사용자 요구사항 변경
- 구조, 데이터 흐름, API, UI, 테스트 전략 변경
- 여러 파일이나 여러 단계가 얽힌 작업

작은 오탈자, 단순 링크 수정, 명백한 단일 줄 수정은 기존 스펙에 trace만 남길 수 있다.

## 필수 산출물

- `spec.*.md`
- `plan.*.md`
- `tasks.*.md`
- `validation.*.md`
- `traceability.*.md`

## 경로

- 공통 workspace/platform 스펙: `_specs/<scope>/YYYY-MM-DD-<slug>/`
- 프로젝트 전용 스펙: `project-name/specs/YYYY-MM-DD-<slug>/`

## 평가 규칙

의미 있는 작업의 평가 입력에는 `spec_targets`를 포함한다. 누락되면 blocking gap이다.

## 관련 파일

- [_specs/README.ko.md](../../_specs/README.ko.md)
- [_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md](../../_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md)
- [_templates/spec-driven/spec.ko.md](../../_templates/spec-driven/spec.ko.md)
- [_ops/workflows/36-spec-driven-development.md](../../_ops/workflows/36-spec-driven-development.md)
- [_ops/workflows/38-spec-source-reconciliation.md](../../_ops/workflows/38-spec-source-reconciliation.md)
- [agent-platform/docs/spec-driven-planner-agent.ko.md](../../agent-platform/docs/spec-driven-planner-agent.ko.md)
- [agent-platform/docs/spec-reconciliation-agent.ko.md](../../agent-platform/docs/spec-reconciliation-agent.ko.md)
