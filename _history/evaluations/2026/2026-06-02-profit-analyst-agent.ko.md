# 작업 평가: Profit Analyst Agent

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- blocking gap: 없음

## 요청 대비 결과

사용자의 요청은 “이득 즉 돈적으로 전문가”였다. 이번 작업은 이를 `profit-analyst-agent`라는 재사용 도메인 에이전트로 추가했다.

Profit Analyst는 단순히 “돈이 된다/안 된다”를 말하는 역할이 아니다. revenue/cost driver, ROI, NPV, payback, break-even, unit economics, pricing, opportunity cost, scenario/sensitivity, source provenance를 함께 보고, 숫자의 출처와 가정을 분리한다.

개인 투자, 대출, 세무, 법률, 회계, 규제 금융 판단은 최종 조언처럼 말하지 않고 전문가 검토 또는 human checkpoint 대상으로 분리했다. 돈이 된다는 이유로 안전, 법, 개인정보, 사용자 신뢰, 품질 검증을 우회하지 않도록 정책을 명시했다.

## 주요 산출물

- `agent-platform/configs/agents/profit-analyst-agent.json`
- `agent-platform/docs/profit-analyst-agent.ko.md`
- `agent-platform/docs/profit-analyst-agent.en.md`
- `_requirements/baselines/2026-05-31-workspace-platform.ko.md`의 `REQ-WS-066`
- `_specs/workspace-platform/2026-06-02-profit-analyst-agent/`
- `_research/topics/profit-analysis/2026-06-02-profit-analyst-agent.ko.md`
- `_history/web-searches/2026/2026-06-02-profit-analyst-agent.ko.md`
- `_history/work-timings/2026/2026-06-02-profit-analyst-agent.json`

## 검증

- `inspect-agent`: 통과
- `list-agents`: `profit-analyst-agent` 포함
- `check-agent-orchestration`: `ready`
- `work-timer check`: `ready`
- `agent-platform` unit tests: 150 tests OK
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `docs-audit`: `docs_ready`
- `workspace-index`, `task-board`: 갱신 완료
- `naming-audit`: `clean`
- `structure-audit`: `clean`; `presentation-agent`의 기존 generated output 경고는 이번 작업과 무관
- `workspace-health`: 18 checks passed
- `workspace-monitor`: collect/test/check/build 통과
- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## 참고한 근거

- OMB Circular A-94: https://www.whitehouse.gov/wp-content/uploads/2023/11/CircularA-94.pdf
- DOT OMB A-94 page: https://www.transportation.gov/regulations/omb-circular-94
- U.S. SBA break-even point guidance: https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point
- HBS value-based strategy: https://online.hbs.edu/blog/post/value-based-strategy
- HBS pricing/shared value record: https://www.hbs.edu/faculty/Pages/item.aspx?num=42546
- KPMG SaaS performance guide: https://assets.kpmg.com/content/dam/kpmg/pdf/2016/07/transforming-your-SAAS-business-a-strategic-guide-for-optimizing-business-performance.pdf
- ICAEW financial modelling code: https://www.icaew.com/-/media/corporate/files/technical/technology/excel/2019-webinars/305---1911358-financial-modelling-code.ashx
- FCA scenario analysis guide: https://www.fca.org.uk/publication/corporate/cfrf-guide-2022-scenario-analysis-banking-guide.pdf

## 남은 개선 후보

- 실제 사용이 2회 이상 쌓이면 계산식이 포함된 profit decision brief 템플릿을 만든다.
- 반복적인 숫자 모델링이 실제 프로젝트에서 필요해지면 spreadsheet 또는 HTML calculator artifact를 검토한다.
