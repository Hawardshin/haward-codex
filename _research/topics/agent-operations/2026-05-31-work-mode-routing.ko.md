# 작업 모드 라우팅 리서치 노트

## 요약

작은 작업과 긴급 작업에 전체 요구사항/스펙/히스토리 루프를 매번 강제하면 운영 비용이 커진다. 외부 참고와 현재 저장소 구조를 비교한 결과, 전체 루프를 삭제하기보다 작업 모드별로 blocking target을 다르게 두는 방식이 적합하다.

## 핵심 참고

| 출처 | 적용 |
| --- | --- |
| Google Engineering Practices - Small CLs | 작은 변경은 검토와 품질 판단이 쉬우므로 `quick` 모드의 근거가 된다. |
| GitHub Docs - GitHub Flow | 작은 독립 변경, commit/push 흐름, 빠른 feedback이 `quick`/`ship_first`와 맞는다. |
| Atlassian Technical Debt | 빠른 선택으로 생긴 미래 개선은 숨기지 말고 백로그로 관리해야 한다. |
| Thoughtworks Evolutionary Architecture | 운영 구조도 fitness function처럼 실제 사용 피드백으로 조정해야 한다. |

## 적용 결정

- 기본은 `standard`로 유지해 기존 안전성을 깨지 않는다.
- `governance`는 evaluator, memory, source registry, durable rules처럼 영향 범위가 큰 작업에 사용한다.
- `quick`은 작은 문서/오타/낮은 위험 작업에서 전체 target 누락을 비차단 개선으로 둔다.
- `ship_first`는 먼저 구현하고 검증한 뒤, 미룬 개선을 `_ops/backlog/deferred-improvements.ko.md`에 남긴다.
- `research`는 요구사항/스펙보다 출처, 원천값, 계획 근거를 우선한다.

## 다음 검토

- `DI-2026-05-31-001`: 실제 작업 사례를 모아 `quick`과 `ship_first` 기준이 너무 느슨하거나 엄격한지 재검토한다.
