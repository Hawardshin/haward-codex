# 웹 검색 기록: Profit Analyst Agent

- 날짜: 2026-06-02
- 요청 요약: “이득 즉 돈적으로 전문가”를 플랫폼 에이전트로 추가한다.
- 작업 모드: `governance`

## 검색 쿼리

- `cost benefit analysis guide official ROI net present value payback period`
- `unit economics contribution margin customer acquisition cost lifetime value startup official guide`
- `pricing strategy value based pricing research business Harvard Business Review`
- `financial model sensitivity analysis scenario analysis best practices`
- `OMB Circular A-94 benefit cost analysis net present value official`
- `SBA break even analysis pricing profit margin official`

## 확인한 소스

- OMB Circular A-94 PDF: https://www.whitehouse.gov/wp-content/uploads/2023/11/CircularA-94.pdf
- U.S. Department of Transportation OMB A-94 page: https://www.transportation.gov/regulations/omb-circular-94
- U.S. SBA break-even point guidance: https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point
- Harvard Business School value-based strategy overview: https://online.hbs.edu/blog/post/value-based-strategy
- Harvard Business School pricing/shared value record: https://www.hbs.edu/faculty/Pages/item.aspx?num=42546
- KPMG SaaS performance guide: https://assets.kpmg.com/content/dam/kpmg/pdf/2016/07/transforming-your-SAAS-business-a-strategic-guide-for-optimizing-business-performance.pdf
- ICAEW financial modelling code: https://www.icaew.com/-/media/corporate/files/technical/technology/excel/2019-webinars/305---1911358-financial-modelling-code.ashx
- FCA scenario analysis guide: https://www.fca.org.uk/publication/corporate/cfrf-guide-2022-scenario-analysis-banking-guide.pdf

## 약한 소스와 처리

- Reddit, Wikipedia, SEO성 블로그, 계산기 페이지는 실무 감각이나 discovery signal로만 볼 수 있고, 이번 정책의 factual basis로는 쓰지 않았다.
- 민감도 분석 관련 상업 블로그는 검색 결과에 있었지만, 에이전트 정책에는 professional body, official guidance, university/business-school source를 우선했다.

## 계획에 준 영향

- 돈 판단은 ROI 하나로 끝내지 않고 cost-benefit, NPV, payback, break-even, unit economics, pricing value, opportunity cost, scenario/sensitivity를 선택적으로 포함하게 했다.
- 숫자는 source, formula, date, currency, tax/fee inclusion, assumptions를 분리해야 한다.
- 개인 투자, 세무, 법률, 회계, 규제 금융 판단은 전문 자격 검토 또는 human checkpoint가 필요한 고위험 영역으로 분리했다.
- 돈이 된다는 이유로 안전, 법, 개인정보, 사용자 신뢰, 품질을 우회하지 못하도록 했다.

## 불확실성

- 벤치마크, 가격, 세율, 환율, 플랫폼 수수료, 시장 데이터는 시간에 따라 변하므로 실제 판단 시 재검색과 최신 출처가 필요하다.
- 이번 작업은 독립 financial modeling runtime이 아니라 reusable agent spec과 운영 문서 추가다.
