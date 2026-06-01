# Web Search Record: Source Discovery Expansion

## Request

Collect more source origins across global technology blogs, Korean big-tech engineering blogs, Indian technology sources and famous people/blogs, and paper-discovery sources for finding well-known papers.

## Work Mode

- `governance`

## Search Date

- 2026-06-01

## Queries

- `official engineering blogs Google Meta Netflix Uber Airbnb Stripe Cloudflare Shopify GitHub engineering blog`
- `Korean big tech engineering blog Naver D2 Kakao Toss Woowa LINE Coupang Kurly Daangn`
- `India engineering blogs Razorpay Zerodha Swiggy Flipkart PhonePe CRED Meesho tech blog`
- `paper discovery sources Semantic Scholar Papers with Code DBLP OpenAlex ACM IEEE USENIX NeurIPS ICML ICLR ACL Anthology`
- `Swiggy Bytes engineering blog official`
- `Gaurav Sen official system design YouTube channel gkcs`

## Main Sources Checked

### Global Technology Blogs

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

### Korean Technology Blogs

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

### Indian Technology and People Sources

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

### Paper Discovery Sources

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

## Weak or Caution Sources

- SEO list pages, arbitrary Medium tags, and third-party influencer ranking pages are discovery signals only.
- Reddit, LinkedIn reactions, YouTube views, Hugging Face upvotes, and GitHub stars are adoption/discovery signals, not factual proof.
- Individual blogs and creator materials need author identity, date, conflicts, and primary-source corroboration.
- Swiggy Bytes direct domain access was unstable, so the Medium list and search results are treated as discovery signals only.

## Plan Impact

- Expand global, Korean, India, India people, and paper-discovery groups in `source-discovery-registry.json`.
- Add only broadly reusable global engineering seeds to `enterprise-source-registry.json`.
- Separate graph indexes, publisher/venue indexes, preprints, paper-to-code, and community/adoption signals for paper discovery.
- Lower the evidence role for individual, YouTube, and community signals to reduce hallucination risk.

## Uncertainty

- Some sources are Medium, YouTube, or dynamically rendered pages and must be reopened at exact article level before citation.
- Paper source access may depend on institutional or account access.
- Regional sources are strong for regional/market context but should not be generalized to every project without fit checks.
