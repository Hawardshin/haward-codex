# 2026-06-02 고품질 데이터 축적 웹 검색 기록

- 작업: 플랫폼 철학에 “고품질 데이터 축적” 정체성 반영
- 작업 모드: `governance`

## 검색 쿼리

- `data quality dimensions accuracy completeness consistency timeliness provenance official guidance`
- `NIST AI data quality provenance documentation trustworthy AI official`
- `ISO IEC data quality model accuracy completeness consistency timeliness provenance`
- `Google data quality best practices data governance documentation`

## 확인한 출처

| 출처 | 확인 내용 | 반영 |
| --- | --- | --- |
| NIST Trustworthy and Responsible AI | AI 신뢰성의 구성 요소로 validity/reliability, accountability/transparency, privacy 등을 다룬다. | 고품질 데이터가 AI 결과 신뢰성과 연결된다는 보조 근거 |
| NIST AI RMF AIRC | 정확성 측정은 현실적인 test set과 방법론 문서화가 필요하고, training data provenance가 transparency/accountability를 돕는다고 설명한다. | provenance와 검증 방법을 데이터 품질 기준에 포함 |
| Canada.ca Guidance on Data Quality | 데이터 품질을 access, accuracy, coherence, completeness, consistency, interpretability, relevance, reliability, timeliness 차원으로 설명한다. | 정확성, 완전성, 일관성, 적시성, 관련성 기준 반영 |
| ISO/IEC 5259-2 개요 | AI analytics/ML data quality에서 accuracy, completeness, consistency, timeliness 같은 항목을 다룬다. | 고품질 데이터 기준의 용어 정합성 보조 |

## 계획 영향

- “자료를 많이 쌓는다”가 아니라 “출처와 검증이 붙은 고품질 데이터 자산을 축적한다”로 표현을 정리한다.
- 고품질 데이터의 최소 조건을 provenance, accuracy, completeness, consistency, timeliness, relevance, revalidation으로 둔다.

## 불확실성

- ISO/IEC 표준 전문은 유료/제한 접근이므로 공개 개요 수준만 참고했다.
- 각 데이터 품질 차원의 구체 측정 기준은 향후 별도 데이터 품질 정책 또는 도구에서 더 구체화해야 한다.
