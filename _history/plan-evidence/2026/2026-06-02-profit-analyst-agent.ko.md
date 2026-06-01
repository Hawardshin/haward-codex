# Plan Evidence: Profit Analyst Agent

## 요구 해석

사용자는 “이득 즉 돈적으로 전문가”를 요청했다. 이는 돈 관점에서 프로젝트, 기능, 제품, 의사결정을 평가하는 reusable domain agent로 해석했다.

## 결정

- agent name: `profit-analyst-agent`
- boundary: `agent-platform` 공통 에이전트
- work mode: `governance`
- output: profit decision brief

## 근거 기반 설계

- OMB A-94 → cost-benefit, NPV, present value, uncertainty
- SBA break-even → fixed/variable cost, contribution margin, break-even
- HBS value-based strategy → customer value와 value capture
- SaaS performance guide → CAC, LTV, churn, gross margin, payback
- ICAEW/FCA → financial model review, scenario/sensitivity, model credibility

## 다른 선택지

- `money-expert-agent`: 사용자 표현과 가깝지만 너무 비공식적이고 범위가 넓어 제외했다.
- `financial-advisor-agent`: 개인 투자/세무/규제 조언으로 오해될 수 있어 제외했다.
- `profit-analyst-agent`: 수익성, 비용편익, 단위경제성, 가격 판단을 포괄하면서도 규제 금융 조언과 구분되어 선택했다.

## 예상 검증

- agent spec이 `inspect-agent`로 읽혀야 한다.
- `list-agents`에 포함되어야 한다.
- orchestration registry check가 깨지지 않아야 한다.
- docs, requirements, specs, history, evaluation이 연결되어야 한다.
