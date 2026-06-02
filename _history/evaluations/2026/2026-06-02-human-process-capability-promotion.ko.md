# 작업 평가: Human Process Capability Promotion

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요청 ID: `UR-2026-06-02-030`
- 관련 요구사항: `REQ-WS-070`

## 완료 내용

- capability promotion에 `human_process_model` 게이트를 추가했다.
- 자동 개선 아이디어를 만들기 전에 유능한 사람이 직접 수행하는 목표, 맥락, 출처, 가정, 선택지 비교, 결정, 실행 메모, 검증, 인수인계, 리뷰를 먼저 모델링하도록 했다.
- `capability-promotion-registry.json`, `capability-promotion-agent.json`, 정책, governance 문서, workflow, prompt, README, 철학 문서, persistent instructions, 요구사항, 스펙을 갱신했다.
- 검색 기록, source provenance, plan evidence, 요청 추적, 작업 요약, timing, omission/grounding/evaluator 기록을 남겼다.

## 근거

- NIST Human Centered Design: 사람의 작업, 맥락, 요구, 평가를 먼저 이해하는 관점.
- NIST AI Use Taxonomy: 인간 목표와 결과 중심으로 AI 사용 task를 분해하는 관점.
- IDEO Design Thinking Process: framing, inspiration, synthesis, ideation, testing 흐름.
- 기존 `REQ-WS-070`: bounded black-box capability promotion과 idea evaluation gate.

## 검증

- `json.tool`: 관련 JSON 통과
- `inspect-agent`: 통과
- `check-config-contract`: capability registry 및 core config 통과
- `check-omissions`: 통과
- `check-grounding`: 통과
- `unittest`: 150개 통과
- `docs-audit`: 통과
- `naming-audit`: 통과
- `workspace-health`: 20개 통과
- `git diff --check`: 통과
- `evaluate-work`: `ready_to_close`

## 남은 개선 아이디어

- `workspace-monitor`에서 `human_process_model`과 generated idea score를 나란히 보는 UI를 추가할 수 있다.
- capability promotion package가 `human_process_model`과 `human_process_artifacts`를 포함하는지 검사하는 helper command를 만들 수 있다.

## 판단

사용자의 “직접 사람이 하는 것처럼”은 사람이 실제로 남기는 작업 절차와 흔적을 자동화 전에 모델링하라는 요구로 해석하는 것이 맞다. 이번 변경은 자동 개선을 더 사람다운 말투로 만드는 것이 아니라, 사람의 직접 작업 절차를 먼저 구조화하고 그중 반복되는 부분만 아이디어화하도록 만든다.

