# Philosophy Alignment Workflow

## Purpose

철학 원칙이 문서에만 머무르지 않고 요구사항, 정책, 워크플로, 설정, 도구, 평가에 반영되는지 확인한다.

## Use When

- `_philosophy/`를 추가하거나 수정한다.
- 사용자가 장기 세계관, 운영 철학, 원칙, 판단 기준을 지시한다.
- 새 정책/워크플로/도구가 기존 철학을 구현한다고 주장한다.
- 철학과 실제 운영 구조 사이의 누락이나 모순을 점검한다.

## Sequence

1. 웹 검색 기록을 남긴다. 철학/거버넌스 작업도 외부 기준과 반대 사례를 먼저 확인한다.
2. `_philosophy/agent-operating-philosophy.ko.md`와 `_philosophy/platform-concept-review.ko.md`를 읽는다.
3. `agent-platform/configs/governance/philosophy-traceability.json`을 열어 원칙별 source, execution target, validation target을 확인한다.
4. 새 원칙이면 요구사항 기준선에 추가하고 `required_principle_ids`에 stable id를 추가한다.
5. 기존 원칙 변경이면 어떤 실행 대상이 바뀌어야 하는지 요구사항/정책/워크플로/프롬프트/설정/도구 단위로 분류한다.
6. 실행 대상이 없으면 먼저 가장 작은 대상 하나를 만든다: 정책, 워크플로, 프롬프트, config, CLI check, audit, evaluator target 중 하나.
7. `check-philosophy-trace`가 통과하도록 매핑을 갱신한다.
8. docs registry, memory bootstrap, prompt router, start workflow, workspace-health에 필요한 연결을 반영한다.
9. 관련 요구사항, 스펙, 검증, traceability, request trace, work summary, evaluation을 남긴다.
10. close-out 전에 `check-config-contract`, `check-philosophy-trace`, `check-memory-bootstrap`, `docs-audit`, `workspace-health` 중 영향 범위에 맞는 검증을 실행한다.

## Acceptance

- 모든 required philosophy principle id가 매핑되어 있다.
- 각 원칙은 철학 원문, 실행 대상, 검증 대상에 연결되어 있다.
- 실행 대상 path는 실제로 존재한다.
- memory bootstrap 또는 operations navigation에서 철학 alignment 구조를 찾을 수 있다.
- 최종 평가 입력에 philosophy trace target과 검증 결과가 포함되어 있다.
