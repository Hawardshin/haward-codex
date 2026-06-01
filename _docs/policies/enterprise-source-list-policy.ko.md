# 대기업/고신뢰 사이트 목록 관리 정책

## 목적

대기업 엔지니어링 블로그, 공식 연구소, architecture center, 높은 수준의 독립 자료는 일반 출처 taxonomy와 분리해서 관리한다. 검색할 때 매번 같은 고품질 출처를 다시 찾느라 시간을 쓰지 않게 하고, 동시에 목록 자체를 사실 근거로 오해하지 않게 한다.

## 관리 위치

- 기계가 읽는 목록: `agent-platform/configs/research/enterprise-source-registry.json`
- 사람이 읽는 요약: `_research/source-lists/enterprise-high-quality-sites.ko.md`
- 관련 출처 정책: `_docs/policies/source-collection-policy.ko.md`

## 운영 규칙

- 새 조사나 코딩 작업에서 대기업/고신뢰 출처가 필요하면 먼저 `enterprise-source-registry.json`을 확인한다.
- 목록은 "좋은 시작점"이지 "증명"이 아니다. 실제 답변/계획/구현에 쓰기 전에는 해당 페이지를 다시 열고 최신성을 확인한다.
- 공식 문서, 공식 연구소, 공식 engineering blog, architecture center를 우선한다.
- SEO성 목록, aggregator, 커뮤니티 추천은 discovery 신호로만 사용하고 목록에 바로 승격하지 않는다.
- 사이트를 추가할 때는 `use_for`, `caveats`, `last_checked`, `quality_tier`를 함께 적는다.
- 오래되었거나 마케팅성이 강해진 출처는 demote하거나 제거한다.

## 분류

- `architecture_center`: AWS, Azure, Google Cloud 같은 reference architecture와 architecture framework
- `enterprise_engineering`: Meta, Netflix, Uber, Stripe, GitHub, Cloudflare 같은 대규모 실전 엔지니어링 블로그
- `research_lab`: Google Research, DeepMind, Microsoft Research, OpenAI, Anthropic 같은 공식 연구소
- `high_signal_independent`: Martin Fowler, ACM Queue, Thoughtworks, InfoQ처럼 높은 수준의 맥락을 주는 자료

## 검증 기준

- 출처가 공식 또는 명확한 발행 주체를 갖는가?
- 기술적 깊이가 있고 실제 구조/운영/검증 이야기가 있는가?
- 현재 작업과 관련 있는가?
- 날짜와 최신성이 충분한가?
- 벤더/도메인/스케일 편향을 이해하고 있는가?

## 주의

대기업 출처는 수준이 높지만, 규모와 조직 조건이 다르다. 작은 프로젝트에 그대로 가져오면 복잡도만 늘 수 있으므로 항상 현재 프로젝트 범위와 운영 비용에 맞춰 축소 적용한다.
