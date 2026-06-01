# 요구사항 변경: 비정형 데이터 정형화

## 요청

AI가 잘하는 것 중 하나는 비정형 데이터를 정형화하는 것이라는 사용자 지시.

## 변경

- `REQ-WS-054`를 추가한다.
- 비정형/반정형 입력을 요구사항, 스펙, 태스크, evidence item, 표, JSON, 평가 입력으로 바꾸는 공통 capability로 정의한다.
- 정형화 결과에는 schema, source provenance, null/ambiguity handling, validation note가 있어야 한다.

## 적용 위치

- `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- `_docs/policies/unstructured-data-structuring-policy.ko.md`
- `_ops/workflows/67-structure-unstructured-data.md`
- `_ops/prompts/98-structure-unstructured-data.md`
- `_philosophy/agent-operating-philosophy.ko.md`

## 검토 기준

- self-documenting config contract
- memory bootstrap
- docs/naming/structure audit
- grounding/evaluation
