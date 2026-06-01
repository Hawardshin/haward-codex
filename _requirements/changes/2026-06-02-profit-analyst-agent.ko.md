# 요구사항 변경: Profit Analyst Agent

## 변경

`REQ-WS-066`을 추가한다.

플랫폼은 작업, 프로젝트, 제품, 기능, 가격, 외주, 자동화, 인프라 비용을 돈과 이득 관점에서 판단하는 `profit-analyst-agent`를 제공해야 한다.

## 이유

사용자는 “이득 즉 돈적으로 전문가”를 요청했다. 플랫폼은 사용자의 반복 작업을 줄이는 것뿐 아니라, 어떤 작업이 실제 금전적 가치가 있는지 판단할 수 있어야 한다.

## 수용 기준

- 에이전트 설정과 문서가 존재한다.
- 출력 계약에 수익/비용 드라이버, ROI/NPV/payback/break-even/unit economics, scenario/sensitivity, source provenance가 포함된다.
- 정책에 고위험 금융 조언 제한, 전문가 검토, human checkpoint, 비금전 제약이 포함된다.
- 검증과 평가가 통과한다.
