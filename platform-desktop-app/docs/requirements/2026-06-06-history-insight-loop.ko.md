# 히스토리 인사이트 루프 요구사항

## 배경

사용자는 지금까지의 히스토리를 보고 쓸 수 있는 인사이트, 추론 과정, 다양한 반복 과정에서 뽑아낼 수 있는 것을 플랫폼에 적용해 달라고 요청했다. 기존 플랫폼은 히스토리 문서를 수집하고 intent map, product feature architecture, reference advantage transfer를 표시하지만, 내부 반복 실행 과정 자체를 “다음 플랫폼 행동”으로 변환하는 전용 snapshot/UI 레이어는 없었다.

## 요구사항

| ID | 요구사항 | 우선순위 | 판정 기준 |
| --- | --- | --- | --- |
| REQ-HIL-001 | 플랫폼은 `_history`, specs, requirements 등 반복 실행 기록에서 재사용 가능한 process insight를 추출해야 한다. | must | `collectHistoryInsightLoop`가 history-like documents를 rule 기반으로 클러스터링한다. |
| REQ-HIL-002 | 추출 결과는 추론 단계, 반복 과정, inference, platform application, evidence path를 포함해야 한다. | must | snapshot의 `historyInsightLoop`에 `inferenceStages`와 `signalGroups`가 있다. |
| REQ-HIL-003 | 제품 구조 UI는 히스토리 인사이트를 실행 가능한 플랫폼 섹션으로 연결해야 한다. | must | `ProductFeatureArchitecturePanel`에 `history-insight-board`가 있고 card click이 target section으로 이동한다. |
| REQ-HIL-004 | customer snapshot은 내부 히스토리 상세와 evidence path를 제거해야 한다. | must | `sanitizeHistoryInsightLoopForCustomer`가 signal groups와 inference stages를 비운다. |
| REQ-HIL-005 | 구현 후 test/check/package build를 자동 실행해야 한다. | must | validation record에 workspace-monitor test/check, platform test, internal package build 결과가 남는다. |

## 범위 제외

- LLM을 호출해 히스토리를 재요약하는 기능은 이번 범위가 아니다.
- 사용자가 직접 insight rule을 편집하는 UI는 후속 기능이다.
- 내부 히스토리 전문을 customer bundle에 노출하지 않는다.
