# 출처 수집 정책 리서치

## 조사 목적

웹 검색 시 공신력 높은 자료, 외국 기술 블로그, 조사 아티클, 논문, LinkedIn/커뮤니티 신호 등을 폭넓게 모으는 운영 기준의 근거를 정리한다.

## 접근일

- 2026-05-31

## 출처

| Source | URL | Notes |
| --- | --- | --- |
| Harvard Guide to Using Sources: Evaluating Web Sources | https://usingsources.fas.harvard.edu/evaluating-web-sources-0 | 웹 출처의 신뢰성, 권위, 정확성, corroboration, 최신성 평가 기준 |
| Google Search Central: E-E-A-T update | https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t | experience, expertise, authoritativeness, trustworthiness 관점 |
| Google Search Central: Creating helpful, reliable, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | sourcing, expertise, author/site background, trust 판단 질문 |
| Guidelines for including grey literature and conducting multivocal literature reviews in software engineering | https://arxiv.org/abs/1707.02553 | 소프트웨어 공학에서 논문 외 블로그, white paper, 웹페이지를 함께 검토하는 MLR 근거 |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | 최신 정보와 출처 링크 검토 필요성 |

## 핵심 요약

- 웹 출처는 누구나 만들 수 있으므로 권위, 정확성, 최신성, 다른 출처와의 corroboration을 확인해야 한다.
- Google의 E-E-A-T 관점은 경험, 전문성, 권위, 신뢰성을 함께 보도록 한다.
- 소프트웨어 분야에서는 formal literature만으로 현업 상태를 파악하기 어렵기 때문에 grey literature와 multivocal literature review가 유용하다.
- 기술 블로그, white paper, 웹페이지는 현업 맥락을 주지만 품질 평가가 필요하다.
- 좋아요, 공유, 댓글, stars, LinkedIn 반응은 adoption이나 관심도 신호일 수 있지만 사실성의 직접 근거는 아니다.

## 도출한 인사이트

- 검색은 "공식 문서만 보기"가 아니라 formal literature와 grey literature를 함께 수집해야 한다.
- 출처는 유형별로 역할을 나눠 기록해야 한다: 사실 확인, 방법론, 구현 상태, 현업 적용, 인기도, 반대 신호.
- 외국 기술 블로그와 실무 사례는 최신 practice를 찾는 데 중요하다.
- 소셜 반응과 좋아요 수는 무엇을 더 조사할지 고르는 discovery signal로 쓰는 것이 적절하다.

## 계획 영향

- `_docs/source-collection-policy.*.md`를 추가한다.
- web-first intake와 research-insight planning 워크플로에 broad source bundle 기준을 반영한다.
- persistent instructions와 workspace rules에 출처 수집 기준을 추가한다.

## 신뢰도 판단

- Harvard/Google 공식 자료와 소프트웨어 공학 MLR 논문을 함께 확인했으므로 출처 평가와 grey literature 포함 원칙의 근거는 충분하다.
- LinkedIn/좋아요 같은 소셜 신호의 정량적 신뢰도는 플랫폼별 편향이 있으므로 약한 신호로만 취급한다.

## 불확실성 및 반대 신호

- 많은 출처를 모으는 것이 항상 더 좋은 결론을 보장하지 않는다. 출처 품질과 독립성이 더 중요하다.
- 소셜 인기도는 마케팅, 네트워크 효과, 특정 커뮤니티 편향을 반영할 수 있다.
- 일부 좋은 자료는 paywall이나 폐쇄 커뮤니티 뒤에 있을 수 있다.

## 적용 가능성

- 리서치, 기술 선택, 아키텍처 계획, 오픈소스 평가, 시장/사례 조사에 적용한다.
- 단순 로컬 파일 수정에는 가벼운 web-first intake만 적용하고 full source bundle은 요구하지 않는다.

## 관련 작업

- `_docs/policies/source-collection-policy.ko.md`
- `_ops/workflows/05-web-first-intake.md`
- `_ops/workflows/55-research-insight-planning.md`

## 다음 확인 사항

- 반복적으로 출처 품질을 점수화해야 하면 `agent-platform`에 source-quality evaluator를 추가한다.
