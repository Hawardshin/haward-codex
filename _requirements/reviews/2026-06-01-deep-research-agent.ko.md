# 요구사항 검토: 딥리서치 에이전트

## 검토 대상

- `REQ-WS-040`

## 적합성

- 사용자 의도와 일치한다. 사용자는 단순 검색 요약이 아니라 특정 상황에서 깊게 조사하고 긴 보고서를 작성하는 에이전트를 원했다.
- 기존 `research-insight-planner-agent`와 역할이 겹칠 수 있으므로, 새 에이전트는 계획 수립이 아니라 deep research package와 report readiness를 검증하는 역할로 분리한다.
- citation hallucination 위험을 줄이기 위해 citation audit와 unsupported/weak claim 기록을 필수로 둔다.

## 결정

- 승인.
- `deep-research-agent`는 공통 agent-platform 기능으로 둔다.
- 초기 구현은 실제 crawler가 아니라 문서 기반 조사 패키지 readiness checker로 시작한다. 이후 실제 검색 API나 브라우저/파일 검색 연동은 별도 확장으로 둔다.

## 검증 기준

- deep research 단계가 빠지면 `more_research_required`가 되어야 한다.
- 검색 채널, 출처 유형, iteration, evidence item, citation audit, report outline/target 누락을 gap으로 잡아야 한다.
- 내부 지식 베이스를 근거로 쓰면 `knowledge_validation_status=ready_to_reference`가 필요해야 한다.

