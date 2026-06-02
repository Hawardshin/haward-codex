# 요구사항 검토: Large Scope Decomposition

- 날짜: 2026-06-02
- 검토 대상: `REQ-WS-073`
- 상태: 승인

## 검토

- 사용자 요청은 병렬 처리 자체가 아니라, 너무 큰 범위와 너무 많은 파일을 먼저 줄이는 운영 구조를 요구한다.
- 기존 병렬 작업 요구사항 `REQ-WS-023`, `REQ-WS-024`와 겹치지 않도록 이 요구사항은 병렬 계획보다 앞선 pre-gate로 둔다.
- 모든 파일을 읽지 않는 것은 누락이 아니라 의도적인 sampling/verification 전략이어야 하므로 제외 기준과 검증 계획을 요구한다.

## 수용 기준

- 큰 범위 profile이 자기 설명 설정 계약을 만족해야 한다.
- 에이전트 spec이 `inspect-agent`로 읽혀야 한다.
- persistent instructions, workflow, prompt router, memory bootstrap에서 발견 가능해야 한다.
- 요구사항, 스펙, 기록, 평가가 연결되어야 한다.
