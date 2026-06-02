# 작업 평가: 금지형 지시 변환

## 요청

- “AI는 금지를 이해하지 못한다.”

## 결과

- `REQ-WS-078`을 추가했다.
- 금지형 지시를 positive target behavior, allowed actions, replacement action, examples, verification/enforcement gate로 변환하는 `prohibition_rewrite_contract`를 추가했다.
- 철학 원칙 16 “금지는 행동 목표가 아니다”를 추가하고, philosophy traceability에 실행/검증 target을 연결했다.
- persistent instructions, memory bootstrap, workflow, prompt, 운영 모델 문서, 히스토리, 스펙에 반영했다.

## 근거와 검증

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-prohibition-to-positive-constraints.ko.md`
- 누락 점검: `coverage_ready`
- 근거 점검: `ready_to_publish`
- 전체 health: `passed`, 25 checks, 0 failed
- evaluator: `ready_to_close`
- `git diff --check`: clean

## 평가

- 초기 지시와 결과는 정렬되어 있다.
- “AI가 어떤 금지도 절대 이해하지 못한다”는 과도한 표현 대신, “금지형 지시만으로 안정적 제어를 기대하지 말고 긍정 행동 계약과 구조적 검증으로 바꾼다”는 실행 가능한 원칙으로 정리했다.
- 남은 개선 후보: prompt/workflow linter를 추가해 금지형 예시가 positive target behavior, replacement action, verification gate 없이 남는 것을 자동 탐지할 수 있다.
