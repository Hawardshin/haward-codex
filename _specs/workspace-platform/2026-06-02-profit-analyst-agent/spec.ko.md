# Spec: Profit Analyst Agent

## 배경

사용자는 “이득 즉 돈적으로 전문가”를 요청했다. 이 요구는 앞으로 플랫폼이 프로젝트와 작업을 돈, 이익, ROI, 비용, 가격, 기회비용 관점에서도 판단할 수 있어야 한다는 뜻으로 해석한다.

## 요구사항

- `profit-analyst-agent`를 agent-platform의 reusable domain agent로 추가한다.
- 에이전트는 수익 드라이버, 비용 드라이버, ROI, NPV, payback, break-even, unit economics, pricing, opportunity cost, scenario/sensitivity를 다룰 수 있어야 한다.
- 숫자는 사용자 제공값, 외부 출처값, 추정값, 가정값을 구분해야 한다.
- 개인 투자, 대출, 세무, 법률, 회계, 규제 금융 조언은 최종 조언처럼 말하지 않고 전문가 검토 또는 human checkpoint 대상으로 둬야 한다.
- 돈이 된다는 이유로 안전, 법, 개인정보, 사용자 신뢰, 품질 검증을 우회하지 않아야 한다.
- 한/영 문서, 요구사항, 스펙, 히스토리, 평가 파일이 남아야 한다.

## 비범위

- 독립 financial modeling runtime, spreadsheet model, 세무 계산기, 투자 추천 엔진은 이번 범위가 아니다.
- 실제 회계/세무/법률/투자 자문은 이번 범위가 아니다.

## 수용 기준

- `inspect-agent`가 통과한다.
- `list-agents`에 `profit-analyst-agent`가 나온다.
- orchestration check가 통과한다.
- 관련 문서와 평가가 생성된다.
