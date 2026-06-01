# 웹 검색 기록: Human Arbitration Agent

## 요청

사용자는 “둘 다 맞는 말을 하는 경우에는 사람이 판단하는 구조”가 필요하다고 했다.

## 검색 일시

- 2026-06-02

## 검색어

- `NIST AI Risk Management Framework human oversight accountability official`
- `OECD AI Principles human oversight accountability official`
- `EUR-Lex Regulation (EU) 2024/1689 Article 14 human oversight official`
- `ISO IEC 42001 AI management system official human oversight`

## 확인한 출처

| 출처 | 유형 | 사용한 이유 |
| --- | --- | --- |
| NIST AI Risk Management Framework | 공식 프레임워크 | AI risk governance와 accountability가 agent decision gate 설계에 맞다. |
| NIST AI RMF 1.0 | 공식 문서 | risk management를 조직적 프로세스로 다루는 근거로 사용했다. |
| OECD AI Principles | 국제 정책 원칙 | human agency, oversight, accountability를 명시한다. |
| ISO/IEC 42001 | 공식 표준 소개 | AI management system을 정책, 목표, 프로세스 체계로 다루는 근거로 사용했다. |
| EUR-Lex Regulation (EU) 2024/1689 | 공식 법령 원문 | high-risk AI의 human oversight 개념을 확인했다. |

## 제외한 약한 출처

- SEO성 ISO 42001 해설 글은 공식 ISO 문서가 있어 보조로도 사용하지 않았다.
- Reddit discussion은 adoption signal로는 의미가 있을 수 있지만 이번 규칙의 핵심 근거로는 쓰지 않았다.

## 계획에 반영한 점

- 사람 판단은 “검색 부족”과 구분해야 한다. 사실이 불확실하면 먼저 조사, grounding, knowledge skepticism으로 돌린다.
- 사실이 충분히 확인됐지만 가치판단, 위험감수성, 전략, 책임소재가 남으면 human arbitration으로 넘긴다.
- 인간에게 넘길 때는 모호한 “어떻게 할까요?”가 아니라 option, evidence, trade-off, recommended default, blocked/unblocked work, resume action을 포함한 작은 decision packet으로 만든다.

## 남은 불확실성

- 실제 조직이나 제품에서 어떤 선택을 사람이 해야 하는지는 사용자 권한, 위험감수성, 프로젝트 맥락에 따라 달라진다.
- 이 작업은 런타임 중재 엔진이 아니라 설정, 문서, 요구사항, 평가 구조를 먼저 만든다.

## 출처 URL

- https://www.nist.gov/itl/ai-risk-management-framework
- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- https://www.oecd.org/en/topics/ai-principles.html
- https://www.iso.org/standard/42001
- https://eur-lex.europa.eu/eli/reg/2024/1689/oj
