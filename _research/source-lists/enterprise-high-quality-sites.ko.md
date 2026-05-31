# 대기업/고신뢰 사이트 목록

## 목적

반복 조사에서 먼저 확인할 대기업 엔지니어링, 공식 연구소, architecture center, 고신뢰 독립 자료의 시작점이다. 상세 목록과 caveat는 `agent-platform/configs/research/enterprise-source-registry.json`에서 관리한다.

더 넓은 검색 원천, 한국 빅테크/리뷰 채널, 인도 기술 소스, 논문 검색 원천은 `agent-platform/configs/research/source-discovery-registry.json`에서 함께 관리한다.

## 우선 확인 사이트

| 분류 | 사이트 | URL |
| --- | --- | --- |
| Architecture center | AWS Architecture Center | https://aws.amazon.com/architecture/ |
| Architecture blog | AWS Architecture Blog | https://aws.amazon.com/blogs/architecture/ |
| Architecture center | Azure Architecture Center | https://learn.microsoft.com/azure/architecture/ |
| Architecture framework | Google Cloud Architecture Framework | https://cloud.google.com/architecture/framework |
| Enterprise engineering | Meta Engineering | https://engineering.fb.com/ |
| Enterprise engineering | Netflix TechBlog | https://netflixtechblog.com/ |
| Enterprise engineering | Uber Engineering | https://www.uber.com/blog/engineering/ |
| Enterprise engineering | Stripe Engineering | https://stripe.com/blog/engineering |
| Enterprise engineering | GitHub Engineering | https://github.blog/engineering/ |
| Enterprise engineering | Cloudflare Blog | https://blog.cloudflare.com/ |
| Enterprise engineering | Shopify Engineering | https://shopify.engineering/ |
| Enterprise engineering | Airbnb Engineering | https://medium.com/airbnb-engineering |
| Enterprise engineering | LinkedIn Engineering | https://www.linkedin.com/blog/engineering |
| Enterprise engineering | Dropbox Tech | https://dropbox.tech/ |
| Enterprise engineering | Slack Engineering | https://slack.engineering/ |
| Enterprise engineering | Spotify Engineering | https://engineering.atspotify.com/ |
| Enterprise engineering | Etsy Code as Craft | https://www.etsy.com/codeascraft |
| Enterprise engineering | Databricks Engineering | https://www.databricks.com/blog/category/engineering |
| Research lab | Google Research Blog | https://research.google/blog/ |
| Research lab | Google DeepMind Blog | https://deepmind.google/discover/blog/ |
| Research lab | Microsoft Research Blog | https://www.microsoft.com/en-us/research/blog/ |
| Research lab | OpenAI Research | https://openai.com/science/ |
| Research lab | Anthropic Research | https://www.anthropic.com/research |
| Research lab | Apple Machine Learning Research | https://machinelearning.apple.com/ |
| Research lab | Amazon Science | https://www.amazon.science/ |
| Technical vendor | NVIDIA Technical Blog | https://developer.nvidia.com/blog/ |
| High-signal independent | Martin Fowler | https://martinfowler.com/ |
| High-signal independent | Thoughtworks Insights | https://www.thoughtworks.com/insights |
| High-signal independent | ACM Queue | https://queue.acm.org/ |
| High-signal industry media | InfoQ Architecture | https://www.infoq.com/architecture-design/ |

## 확장 검색 원천

| 분류 | 사이트 | URL |
| --- | --- | --- |
| Global engineering | Canva Engineering | https://www.canva.dev/blog/engineering/ |
| Global engineering | Figma Engineering | https://www.figma.com/blog/engineering/ |
| Global engineering | Pinterest Engineering | https://medium.com/pinterest-engineering |
| Global engineering | DoorDash Engineering | https://careersatdoordash.com/blog/category/engineering/ |
| Korea tech blog | NAVER D2 | https://d2.naver.com/home |
| Korea tech blog | Kakao Tech | https://tech.kakao.com/ |
| Korea tech blog | KakaoBank Tech Blog | https://tech.kakaobank.com/ |
| Korea tech blog | LINE Engineering | https://engineering.linecorp.com/ko/ |
| Korea tech blog | Coupang Engineering Blog | https://medium.com/coupang-engineering/latest |
| Korea tech blog | Toss Tech | https://toss.tech/ |
| Korea tech blog | Woowa Tech Blog | https://techblog.woowahan.com/ |
| Korea tech blog | Kurly Tech Blog | https://helloworld.kurly.com/ |
| Korea tech blog | DEVOCEAN | https://devocean.sk.com/ |
| India tech | Razorpay Blog | https://razorpay.com/blog/ |
| India tech | Zerodha Tech Blog | https://zerodha.tech/blog/ |
| India tech | Zerodha Open Source | https://zerodha.com/open-source/ |
| India expert/context | Arpit Bhayani | https://arpitbhayani.me/ |
| Paper search | OpenAlex Works | https://docs.openalex.org/api-entities/works |
| Paper search | Semantic Scholar API | https://www.semanticscholar.org/product/api |
| Paper search | arXiv API | https://info.arxiv.org/help/api/index.html |
| Paper-to-code | Papers with Code | https://paperswithcode.com/ |
| Paper graph | Connected Papers | https://www.connectedpapers.com/index.html |
| Korean local review | Naver Map | https://map.naver.com/ |
| Korean local review | Kakao Map | https://map.kakao.com/ |
| Korean local search API | NAVER Search API | https://developers.naver.com/products/service-api/search/search.md |
| Korean local search API | Kakao Local API | https://developers.kakao.com/docs/ko/local/dev-guide |

## 사용 규칙

- 이 목록은 검색 시작점이다. 특정 claim은 원문 페이지를 다시 확인한 뒤 사용한다.
- 대기업 사례는 현재 프로젝트 규모에 맞춰 축소 적용한다.
- 한국 사용자 리뷰/로컬 정보는 Naver Map, Kakao Map, Naver Blog/Search를 우선 확인하고, 공식 페이지와 교차 검증한다.
- 논문 기반 근거는 Semantic Scholar/OpenAlex/arXiv/Papers with Code를 조합해 유명도, 최신성, 코드/데이터 유무를 확인한다.
- 새로운 고품질 사이트를 발견하면 JSON registry와 이 요약을 함께 갱신한다.
