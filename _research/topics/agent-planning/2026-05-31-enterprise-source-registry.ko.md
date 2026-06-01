# 리서치 노트: 대기업/고신뢰 출처 registry

## 요약

대기업 엔지니어링 블로그, 공식 연구소, architecture center, 고신뢰 독립 자료는 일반 출처 taxonomy와 분리된 seed registry로 관리한다. 이 목록은 검색 시작점을 제공하지만, 특정 claim의 증거는 아니다.

## 주요 출처

- Meta Engineering: https://engineering.fb.com/
- Stripe Engineering: https://stripe.com/blog/engineering
- GitHub Engineering: https://github.blog/engineering/
- Cloudflare Blog: https://blog.cloudflare.com/
- Netflix TechBlog: https://netflixtechblog.com/
- Uber Engineering: https://www.uber.com/blog/engineering/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- AWS Architecture Blog: https://aws.amazon.com/blogs/architecture/
- Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Google Cloud Architecture Framework: https://cloud.google.com/architecture/framework
- Google Research Blog: https://research.google/blog/
- OpenAI Research: https://openai.com/science/
- Anthropic Research: https://www.anthropic.com/research

## 결정

- 별도 기계 판독 registry: `agent-platform/configs/research/enterprise-source-registry.json`
- 사람용 요약 목록: `_research/source-lists/enterprise-high-quality-sites.ko.md`
- 관리 정책: `_docs/policies/enterprise-source-list-policy.ko.md`

## 적용

리서치나 코딩 조사에서 대기업/고신뢰 출처를 seed로 쓰면 `research_profile_paths` 또는 `reference_config_paths`에 `enterprise-source-registry.json`을 기록한다.

## 주의

대기업 사례는 기술 수준이 높지만, 규모와 조직 조건이 다르다. 원칙은 참고하되 구조와 복잡도는 현재 프로젝트에 맞춰 줄여야 한다.
