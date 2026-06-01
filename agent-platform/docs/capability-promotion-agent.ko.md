# Capability Promotion Agent

`capability-promotion-agent`는 작업 중 반복, 병목, 누락, 검증 실패, 수동 재작업을 발견해 플랫폼 기능 추가 후보로 승격하는 에이전트다.

핵심은 완전한 블랙박스가 아니다. 사용자는 자동으로 개선되는 것처럼 느낄 수 있지만, 내부에는 관찰 근거, 후보, 위험도, 검증, 되돌림 경로, 결과, 커밋이 남아야 한다.

## 언제 사용하나

- 같은 수동 절차가 반복될 때
- 작업 시간 기록에서 특정 phase가 계속 느릴 때
- 평가, 누락 방지, grounding, config 검증에서 비슷한 실패가 반복될 때
- 매번 같은 prompt, workflow, template, tool, skill, agent를 만들지 고민하게 될 때
- 모니터나 데스크톱 앱에서 보여주면 반복 작업이 줄어드는 기능 후보가 생겼을 때

## 출력

- capability 후보 ID
- 관찰된 신호와 출처 기록
- 제안 capability type: `prompt`, `workflow`, `template`, `tool`, `skill`, `agent`, `project_feature`
- 더 가벼운 대안과 기각 이유
- 예상 반복 감소와 시간 절감 효과
- 위험도와 human checkpoint 필요 여부
- 검증 계획과 rollback 또는 disablement 계획
- 구현 위치, 평가 파일, 커밋/push trace

## 안전 규칙

- destructive change, secret, 권한, 설치, 유료 서비스, public 배포, 보안/개인정보, 되돌리기 어려운 migration은 사람 체크포인트 없이 자동 실행하지 않는다.
- 반복 작업이라고 바로 agent를 만들지 않는다. prompt, workflow, template, tool, skill, agent, project feature 순서로 가장 작은 자산을 먼저 검토한다.
- 내부 지식이나 LLM 반복 응답만으로 사실을 확정하지 않는다. 중요한 근거는 웹 검색, 테스트, evaluator, human judgment로 확인한다.
- 적용된 capability는 문서화, 검증, 평가, 커밋, push까지 완료해야 한다.

## 주요 파일

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `_docs/policies/capability-promotion-policy.ko.md`
- `_ops/workflows/75-capability-promotion.md`
- `_ops/prompts/105-capability-promotion.md`
