# Principle Guardian Agent 조사 노트

## 결론

`principle-guardian-agent`는 원칙을 설명하는 역할이 아니라, 원칙이 침식될 때 멈추고 재작업을 요구하는 governance agent로 두는 것이 맞다.

## 근거 요약

- NIST AI RMF는 신뢰할 수 있는 AI를 위해 governance, risk mapping, measurement, management가 필요하다는 틀을 제공한다.
- ISO/IEC 42001은 AI management system을 정책, 목표, 프로세스, 지속 개선 체계로 다룬다.
- OECD AI Principles는 책임성, 투명성, 안전성, robustness 같은 책임 있는 AI 원칙을 강조한다.
- High Reliability Organization 원칙은 실패 가능성에 민감하고, 지나친 단순화를 경계하며, 운영 현실을 계속 관찰하는 태도를 제공한다.

## 에이전트 설계 원칙

- 원칙은 구호가 아니라 close-out gate다.
- 빠름, 돈, 낙관, 편의는 원칙을 우회하는 이유가 될 수 없다.
- 원칙 충돌은 숨기지 않고 source와 decision reason을 남긴다.
- 예외는 허용된 예외만 문서화하고, 가능하면 reversible path를 선택한다.
- 모든 meaningful work는 필요한 수준의 evidence, source provenance, validation, evaluation을 남긴다.

## 소스

- https://www.nist.gov/itl/ai-risk-management-framework
- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- https://www.oecd.org/en/topics/ai-principles.html
- https://www.iso.org/standard/42001
- https://www.wolterskluwer.com/en/expert-insights/what-are-high-reliability-organizations-hro
