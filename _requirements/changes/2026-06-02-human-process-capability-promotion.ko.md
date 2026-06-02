# 요구사항 변경: Human Process Capability Promotion

## 변경 대상

- `REQ-WS-070`

## 변경 이유

사용자가 capability promotion이 아이디어를 내고 평가받는 것을 넘어서, “직접 사람이 하는 것처럼” 동작해야 한다고 요청했다.

## 변경 내용

- 자동 기능 후보는 아이디어 생성 전에 `human_process_model`을 기록해야 한다.
- `human_process_model`은 목표, 맥락, 출처, 가정, 선택지 비교, 결정, 실행 메모, 검증, 인수인계, 리뷰를 포함한다.
- 생성된 개선 아이디어는 사용자 문구만이 아니라 구체적인 human process step을 줄이거나 안정화해야 한다.
- registry, agent spec, policy, workflow, prompt, persistent instructions, 철학 문서, 스펙에 반영한다.

## 검증

- `check-config-contract`
- `inspect-agent`
- `check-omissions`
- `check-grounding`
- `evaluate-work`

