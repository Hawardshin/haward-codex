# 작업 평가: Capability Idea Evaluation Gate

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요청 ID: `UR-2026-06-02-029`
- 관련 요구사항: `REQ-WS-070`

## 완료 내용

- capability promotion 흐름을 “아이디어 생성 → 아이디어 평가 → 선택/보류/기각 기록 → 선택된 아이디어만 후보화” 구조로 강화했다.
- `capability-promotion-registry.json`에 아이디어 생성 규칙, 평가 루브릭, 평가 결과, 후보 계약 필드를 추가했다.
- `capability-promotion-agent.json`, 정책 문서, workflow, prompt, agent 문서, README, persistent instructions에 같은 원칙을 반영했다.
- 요구사항 baseline, 변경 기록, 리뷰 기록, spec/plan/validation, web search, provenance, plan evidence, request trace, work summary, timing record를 연결했다.

## 근거

- AWS Prescriptive Guidance의 evaluator / reflect-refine loop.
- Google Cloud Gemini Enterprise의 idea generation agent 문서.
- Stage-Gate식 아이디어 선별/단계화 관점.
- Anthropic의 evaluator-optimizer 및 agent workflow 설계 관점.
- 기존 `capability-promotion-agent`와 registry의 bounded promotion 원칙.

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

- `workspace-monitor`에서 생성된 개선 아이디어와 점수를 시각적으로 비교하는 UI를 추가할 수 있다.
- 작은 governance refinement의 평가 입력/보고서 초안을 자동 생성하는 도구를 만들 수 있다.

## 판단

사용자의 핵심 의도는 “플랫폼이 아이디어를 내고, 그 아이디어를 평가받은 뒤 실행해야 한다”는 것이다. 이번 변경은 자동 개선을 허용하되, 무작정 기능을 늘리는 대신 반복 감소, 시간 절감, 유지보수 비용, 근거 강도, 위험 적합성, 가장 작은 자산 선택 여부를 기준으로 평가하고 기록하도록 만들었다.
