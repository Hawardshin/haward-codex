# Spec: Positive Vision Agent

## 배경

사용자는 “어떻게든 해내라고 긍정적인 비전을 제시하는 전문가”를 요청했다. 이 요구는 앞으로 어려운 작업에서 사기와 가능성을 유지하되, 사실과 품질을 희생하지 않는 에이전트가 필요하다는 뜻으로 해석한다.

## 요구사항

- `positive-vision-agent`를 agent-platform의 reusable domain agent로 추가한다.
- 에이전트는 긍정적 비전, agency, pathways, if-then 실행계획, reality check를 포함해야 한다.
- 에이전트는 근거 없는 성공 보장, 위험 은폐, 검증 생략을 금지해야 한다.
- 에이전트는 `timekeeper-agent`, `parallel-work-planner-agent`, `spec-reconciliation-agent`, `omission-guard-agent`, `hallucination-guard-agent`, `work-evaluator-agent`와 연결되어야 한다.
- 한/영 문서, 요구사항, 스펙, 히스토리, 평가 파일이 남아야 한다.

## 비범위

- 독립 실행형 UI나 런타임 구현은 이번 범위가 아니다.
- 실제 알림, 음성, 멘토링 인터페이스는 이번 범위가 아니다.

## 수용 기준

- `inspect-agent`가 통과한다.
- `list-agents`에 `positive-vision-agent`가 나온다.
- orchestration check가 통과한다.
- 관련 문서와 평가가 생성된다.
