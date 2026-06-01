# Profit Analyst Agent 조사 노트

## 결론

`profit-analyst-agent`는 “돈이 되는가”를 단일 점수로 판단하는 역할이 아니라, 수익·비용·시간·위험·기회비용을 구조화해 의사결정자가 돈 관점의 trade-off를 볼 수 있게 하는 역할로 두는 것이 맞다.

## 근거 요약

- OMB A-94는 benefit-cost analysis에서 비용과 편익을 공통 단위로 비교하고, 시간에 걸친 비용/편익은 present value로 할인해야 한다는 틀을 제공한다.
- SBA의 break-even guidance는 fixed cost, variable cost, contribution margin, break-even point를 가격·매출 목표·누락 비용 확인에 쓰도록 설명한다.
- HBS value-based strategy는 가격이 단순 원가가 아니라 고객이 느끼는 가치와 회사가 포착하는 가치의 배분 문제임을 보여준다.
- SaaS/구독형 사업은 revenue growth만으로 충분하지 않고 CAC, LTV, churn, gross margin, payback 같은 unit economics가 필요하다.
- financial model은 base case만으로는 부족하고 sensitivity와 scenario로 key driver가 결과를 얼마나 흔드는지 확인해야 한다.

## 에이전트 설계 원칙

- 숫자는 출처와 가정을 분리한다.
- ROI 하나보다 decision context, time horizon, cash timing, uncertainty를 함께 본다.
- 예상 수익보다 먼저 누락 비용, 변수 비용, 수수료, 세금, 운영 부담을 찾는다.
- 가격 판단은 cost-plus뿐 아니라 customer value와 willingness to pay를 함께 본다.
- 고위험 재무 판단은 교육적 분석으로 제한하고 professional review를 요구한다.

## 적용 예시

- 새 기능 개발: 예상 매출 증가, 개발/운영 비용, 시간, 리스크, opportunity cost 비교
- 마케팅 캠페인: CAC, conversion, gross margin, payback, LTV:CAC 비교
- 구독 도구 도입: 월 비용, 절약 시간, hourly value, 대체안, break-even 확인
- 가격 변경: churn risk, conversion, margin, customer value, sensitivity 비교

## 소스

- https://www.whitehouse.gov/wp-content/uploads/2023/11/CircularA-94.pdf
- https://www.transportation.gov/regulations/omb-circular-94
- https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point
- https://online.hbs.edu/blog/post/value-based-strategy
- https://www.hbs.edu/faculty/Pages/item.aspx?num=42546
- https://assets.kpmg.com/content/dam/kpmg/pdf/2016/07/transforming-your-SAAS-business-a-strategic-guide-for-optimizing-business-performance.pdf
- https://www.icaew.com/-/media/corporate/files/technical/technology/excel/2019-webinars/305---1911358-financial-modelling-code.ashx
- https://www.fca.org.uk/publication/corporate/cfrf-guide-2022-scenario-analysis-banking-guide.pdf
