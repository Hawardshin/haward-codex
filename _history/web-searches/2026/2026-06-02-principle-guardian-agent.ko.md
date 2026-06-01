# 웹 검색 기록: Principle Guardian Agent

- 날짜: 2026-06-02
- 요청 요약: “다들 강력하게 원칙을 고수한다”를 플랫폼 운영 규칙과 에이전트로 반영한다.
- 작업 모드: `governance`

## 검색 쿼리

- `NIST AI Risk Management Framework govern map measure manage official`
- `OECD AI Principles accountability transparency robustness official`
- `ISO IEC 42001 AI management system governance principles official`
- `high reliability organization principles preoccupation with failure reluctance to simplify operations`

## 확인한 소스

- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF 1.0 publication: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- OECD AI Principles: https://www.oecd.org/en/topics/ai-principles.html
- ISO/IEC 42001:2023 official page: https://www.iso.org/standard/42001
- High Reliability Organizations overview: https://www.wolterskluwer.com/en/expert-insights/what-are-high-reliability-organizations-hro

## 약한 소스와 처리

- 위키와 상업 컨설팅 요약은 검색 결과에 있었지만 정책의 factual basis로 쓰지 않았다.
- HRO 관련 일반 요약은 원칙의 보조 설명으로만 쓰고, 플랫폼 정책은 repository-local durable instructions와 NIST/OECD/ISO 같은 고신뢰 출처에 맞췄다.

## 계획에 준 영향

- “원칙 고수”는 동기 문구가 아니라 governance, risk management, accountability, documented process, continuous improvement의 실행 계약으로 정의했다.
- 새 역할은 모든 에이전트 위에 군림하는 별도 런타임이 아니라, 원칙 충돌·shortcut·close-out 전 점검에 쓰는 `principle-guardian-agent`로 두었다.
- 빠름, 돈, 낙관, 편의가 원칙과 충돌하면 원칙을 우선하고 compliant alternative를 요구하도록 설계했다.

## 불확실성

- ISO/IEC 42001 전문은 유료 표준이므로 공개 페이지의 범위 안에서만 요약했다.
- 실제 원칙 충돌은 작업 맥락별로 다르므로 human decision inbox와 reversible path를 남겼다.
