# Plan Evidence: Human Process Capability Promotion

## 계획 결정

| 계획 단계 | 근거 | 반영 |
| --- | --- | --- |
| `governance` 모드 선택 | durable rule, requirement, registry, prompt, workflow가 바뀐다. | mode selection record 생성 |
| 새 에이전트 대신 기존 capability promotion 보강 | 이전 `REQ-WS-070`과 바로 이어지는 요청이다. | registry, agent spec, policy, workflow, prompt 수정 |
| `human_process_model` 추가 | NIST/IDEO 자료가 작업/맥락/목표/평가/선택 구조를 강조한다. | registry top-level section, required records, candidate contract 추가 |
| generated idea를 human process step에 연결 | 사용자가 “직접 사람이 하는 것처럼”이라고 요청했다. | idea field `human_process_step_addressed` 추가 |
| human checkpoint 유지 | HITL 자료와 기존 human arbitration/decision inbox 원칙과 맞는다. | 고위험 자동 실행 금지 규칙 유지 |

## 검증 계획

- JSON parse
- `inspect-agent`
- `check-config-contract`
- `check-omissions`
- `check-grounding`
- `evaluate-work`
- workspace index, task board, workspace health

