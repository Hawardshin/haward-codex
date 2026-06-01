# AI 사용 격차와 간극 해소

## 요약

AI를 잘 쓰는 사람과 못 쓰는 사람의 차이는 단순히 프롬프트 문장력이 아니다. 외부 연구와 실무 리포트 기준으로 보면 핵심 차이는 작업 적합성 판단, 맥락/성공 기준 제공, 반복 실험, 검증, 결과 자산화, 적절한 신뢰 조절에 있다.

## 약한 사용 패턴

- 모호한 요청: 목표, 독자, 제약, 성공 기준이 빠져 있다.
- 단발성 사용: 한 번 답을 받고 그대로 쓰거나 바로 포기한다.
- 작업 적합성 오판: AI가 약한 영역에서도 검증 없이 맡긴다.
- 검증 부재: 출처, 테스트, 반례, 인간 검토 없이 결과를 사용한다.
- 맥락 손실: 좋은 프롬프트와 결정이 채팅에만 남는다.
- 도구화 회피: 반복 가능한 일을 계속 수작업으로 한다.
- 숨은 사용: 공유된 기준 없이 개인적으로만 AI를 쓴다.

## 강한 사용 패턴

- 목표, 독자, 입력 자료, 제약, 성공 기준을 먼저 준다.
- AI를 탐색자, 초안 작성자, 비평가, 변환기, 검증 보조자로 쓴다.
- 계획, 근거 수집, 구현, 검증, 평가로 나누어 진행한다.
- 웹 검색, 공식 문서, 테스트, evaluator, 인간 판단을 함께 쓴다.
- AI의 capability frontier가 고르지 않다고 보고 task-fit을 먼저 판단한다.
- 반복되는 좋은 패턴을 저장소 자산으로 승격한다.

## 플랫폼 반영

- `agent-platform/configs/usage/ai-usage-gap-profile.json`을 추가한다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`로 반복 사용한다.
- memory bootstrap에 warm anchor로 등록해 다음 세션도 잊지 않게 한다.
- 운영 모델 문서에서 AI 사용 격차를 개인 탓이 아니라 시스템 설계 문제로 설명한다.

## 적용 원칙

- 모호한 요청은 goal/context/constraints/examples/criteria로 보강한다.
- 위험이 낮으면 합리적 가정을 두고 진행한다.
- 위험하거나 사용자 선호가 중요한 모호함은 `clarification_needed`로 되돌린다.
- 좋은 AI 사용 패턴은 prompt/workflow/template/tool/skill/config 중 가장 작은 자산으로 남긴다.

## 주요 출처

- Harvard Business School, BCG: https://www.hbs.edu/faculty/Pages/item.aspx?num=64700
- BCG: https://www.bcg.com/publications/2023/how-people-create-and-destroy-value-with-gen-ai
- Microsoft Work Trend Index 2026: https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- Microsoft Work Trend Index 2024: https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part
- Gallup AI Indicator: https://www.gallup.com/699797/indicator-artificial-intelligence.aspx
- OECD AI skills gap: https://www.oecd.org/en/publications/bridging-the-ai-skills-gap_66d0702e-en.html
- UNESCO AI competency framework: https://www.unesco.org/en/articles/ai-competency-framework-students?hub=750
- Microsoft Appropriate Reliance: https://www.microsoft.com/en-us/research/articles/appropriate-reliance-research-initiative
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- IBM Research: https://research.ibm.com/publications/building-appropriate-mental-models-what-users-know-and-want-to-know-about-an-agentic-ai-chatbot
