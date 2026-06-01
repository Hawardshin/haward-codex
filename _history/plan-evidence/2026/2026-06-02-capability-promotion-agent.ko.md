# Plan Evidence: Capability Promotion Agent

| 계획 단계 | 근거 |
| --- | --- |
| 새 에이전트 이름을 `capability-promotion-agent`로 정한다 | 블랙박스라는 표현은 사용자 경험을 설명하지만, 실제 시스템은 감사 가능해야 하므로 기능 승격이라는 역할 이름이 더 유지보수 가능하다. |
| 레지스트리를 `configs/orchestration/`에 둔다 | 기능 승격은 agent, prompt, workflow, tool, skill, project feature를 모두 넘나드는 orchestration 계약이다. |
| 가장 작은 자산을 먼저 검토한다 | 기존 capability governance와 Anthropic의 단순 workflow 우선 관점에 부합한다. |
| 고위험 변경은 human checkpoint로 보낸다 | NIST AI RMF와 기존 human decision inbox/human arbitration 구조에 부합한다. |
| memory bootstrap에 warm anchor로 추가한다 | 다음 세션에서 이 durable rule을 잊지 않아야 한다. |
