# 요구사항 검토: 작업 시간과 병목 기록

## 검토 대상

- `REQ-WS-039`

## 적합성

- 사용자 의도와 일치한다. 단순 총 소요시간이 아니라 phase별 시간을 기록해야 병목을 찾을 수 있다.
- 기존 병렬 작업/작업 모드 구조와 충돌하지 않는다. 시간 기록은 mode를 대체하지 않고 관찰성 target으로 추가된다.
- false precision 위험은 `measurement_quality=partial`과 `measurement=not_measured`로 완화한다.

## 결정

- 승인.
- `standard`, `research`, `governance`에서는 timing target을 blocking close-out target으로 둔다.
- `quick`과 `ship_first`에서는 누락을 비차단으로 두되, 의미 있는 작업이면 가능한 한 남긴다.

## 검증 기준

- timing record schema를 도구로 검사한다.
- coordination board와 Workspace Monitor에서 timing summary가 보여야 한다.
- work-evaluator가 `timing_summary_targets`를 인식해야 한다.
