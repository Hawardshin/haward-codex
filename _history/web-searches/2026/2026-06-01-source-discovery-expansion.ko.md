# 웹 검색 기록: 원천 데이터 조사 소스 확장

## 요청

세계 기술 블로그, 한국 빅테크 기술 블로그, 인도 기술 출처와 유명한 사람들의 블로그, 유명 논문을 찾는 검색 원천을 더 많이 모으기.

## 작업 모드

- `governance`

## 검색 시각

- 2026-06-01

## 검색 쿼리

- `official engineering blogs Google Meta Netflix Uber Airbnb Stripe Cloudflare Shopify GitHub engineering blog`
- `Korean big tech engineering blog Naver D2 Kakao Toss Woowa LINE Coupang Kurly Daangn`
- `India engineering blogs Razorpay Zerodha Swiggy Flipkart PhonePe CRED Meesho tech blog`
- `paper discovery sources Semantic Scholar Papers with Code DBLP OpenAlex ACM IEEE USENIX NeurIPS ICML ICLR ACL Anthology`
- `Swiggy Bytes engineering blog official`
- `Gaurav Sen official system design YouTube channel gkcs`

## 확인한 주요 출처

### 글로벌 기술 블로그

- Meta Engineering: https://engineering.fb.com/
- Uber Engineering: https://www.uber.com/en-US/blog/engineering/
- Cloudflare Blog: https://blog.cloudflare.com/
- GitHub Engineering: https://github.blog/engineering/
- Shopify Engineering: https://shopify.engineering/
- Slack Engineering: https://slack.engineering/
- Databricks Engineering: https://www.databricks.com/blog/category/engineering
- Discord Engineering: https://discord.com/category/engineering
- Vercel Blog: https://vercel.com/blog
- Datadog Engineering: https://www.datadoghq.com/blog/engineering/
- Sentry Engineering: https://blog.sentry.io/engineering/
- Canva Engineering: https://www.canva.dev/blog/engineering/
- Figma Engineering: https://www.figma.com/blog/engineering/
- DoorDash Engineering: https://careersatdoordash.com/blog/category/engineering/
- Awesome Engineering Blogs: https://github.com/crispgm/awesome-engineering-blogs

### 한국 기술 블로그

- NAVER D2: https://d2.naver.com/home
- Kakao Tech: https://tech.kakao.com/
- Toss Tech: https://toss.tech/
- Woowa Tech Blog: https://techblog.woowahan.com/
- LINE Engineering: https://engineering.linecorp.com/ko/blog
- Coupang Engineering Blog: https://medium.com/coupang-engineering
- Kurly Tech Blog: https://helloworld.kurly.com/
- Daangn Tech Blog: https://medium.com/daangn
- Devsisters DEVTECH: https://tech.devsisters.com/
- KakaoBank Tech Blog: https://tech.kakaobank.com/
- RIDI Tech Blog: https://ridicorp.com/story-category/tech-blog/

### 인도 기술 출처와 사람 출처

- Razorpay Engineering: https://engineering.razorpay.com/
- Zerodha Tech Blog: https://zerodha.tech/
- Zerodha Kailash Nadh author page: https://zerodha.tech/authors/knadh/
- Flipkart Tech Blog: https://blog.flipkart.tech/
- PhonePe Tech Blog: https://tech.phonepe.com/
- CRED Engineering: https://engineering.cred.club/
- Meesho Tech Blog: https://www.meesho.io/blog
- Zomato Technology Blog: https://www.zomato.com/blog/category/technology/
- Arpit Bhayani blogs: https://arpitbhayani.me/blogs/
- Swiggy Bytes discovery: https://swiggybytes.medium.com/list/def17f9cfb7f
- Gaurav Sen channel: https://www.youtube.com/@gkcs

### 논문 탐색 원천

- Semantic Scholar: https://www.semanticscholar.org/
- Semantic Scholar API: https://www.semanticscholar.org/product/api
- OpenAlex Works: https://docs.openalex.org/api-entities/works
- arXiv: https://arxiv.org/
- DBLP: https://dblp.org/
- ACM Digital Library: https://www.acm.org/publications/digital-library
- IEEE Xplore: https://ieeexplore.ieee.org/Xplore/home.jsp
- USENIX Proceedings: https://www.usenix.org/publications/proceedings
- NeurIPS Proceedings: https://proceedings.neurips.cc/
- PMLR: https://proceedings.mlr.press/
- ICLR OpenReview: https://openreview.net/group?id=ICLR.cc
- ACL Anthology: https://aclanthology.org/
- Crossref: https://crossref.org/
- Connected Papers: https://www.connectedpapers.com/
- ResearchRabbit: https://www.researchrabbit.ai/
- Litmaps: https://www.litmaps.com/
- Hugging Face Papers: https://huggingface.co/papers

## 약한 출처 또는 주의할 출처

- SEO성 목록, 임의 Medium 태그, third-party influencer rank 페이지는 exact source를 찾기 위한 discovery signal로만 본다.
- Reddit, LinkedIn 반응, YouTube 구독/조회, Hugging Face upvote, GitHub stars는 adoption/discovery signal이지 사실 증명이 아니다.
- 개인 블로그와 creator 자료는 author identity, 날짜, 이해관계, primary source 교차 확인이 필요하다.
- Swiggy Bytes는 현재 공식 도메인 직접 접근이 불안정해 Medium 리스트와 검색 결과를 discovery signal로만 다룬다.

## 계획 영향

- `source-discovery-registry.json`에 global, Korean, India, India people, paper discovery source group을 확장한다.
- `enterprise-source-registry.json`에는 공통 재사용성이 큰 글로벌 engineering seed만 추가한다.
- 논문 탐색은 graph index, publisher/venue index, preprint, paper-to-code, community/adoption signal을 분리한다.
- 개인/유튜브/커뮤니티 신호는 source role을 낮춰 hallucination risk를 줄인다.

## 불확실성

- 일부 사이트는 Medium, YouTube, 동적 페이지 기반이므로 정확한 글 단위 인용 전에 다시 열어야 한다.
- 논문 원천의 접근권한은 기관/계정에 따라 다를 수 있다.
- 지역 출처는 해당 지역/시장 맥락에 강하지만 모든 프로젝트에 그대로 일반화하지 않는다.
