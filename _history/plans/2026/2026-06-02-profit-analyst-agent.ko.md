# 작업 계획: Profit Analyst Agent

## 목표

“이득 즉 돈적으로 전문가”를 플랫폼의 재사용 가능한 에이전트로 추가한다.

## 단계

1. 웹 검색으로 cost-benefit, ROI, break-even, unit economics, pricing, scenario/sensitivity 관련 근거를 확인한다.
2. 기존 에이전트 구조와 요구사항 번호를 확인한다.
3. `REQ-WS-066`으로 durable requirement를 추가한다.
4. `profit-analyst-agent` 설정과 한/영 문서를 작성한다.
5. 스펙, 계획, 태스크, 검증, 추적성 문서를 추가한다.
6. 히스토리, 요청 요약, request trace, timing, evaluation을 작성한다.
7. agent inspect/list/orchestration, 테스트, docs/map/monitor 검증을 수행한다.
8. 평가 후 커밋하고 push한다.

## 합격 기준

- `agent-platform/configs/agents/profit-analyst-agent.json`이 존재하고 inspect 가능하다.
- 한/영 문서가 존재한다.
- 요구사항과 스펙이 연결된다.
- 돈 판단이 단일 ROI 숫자나 근거 없는 투자 조언으로 정의되지 않는다.
- 검증과 평가가 통과한다.
