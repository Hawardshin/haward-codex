# 계획: 원천 데이터 조사 소스 확장

1. 웹 검색으로 글로벌 엔지니어링 블로그, 한국 기술 블로그, 인도 기술 블로그/전문가, 논문 탐색 원천 후보를 확인한다.
2. 기존 source registry와 source list를 읽어 중복과 source-of-truth를 확인한다.
3. `source-discovery-registry.json`에 실제 검색 origin을 추가하고 evidence role을 분리한다.
4. `enterprise-source-registry.json`에는 공통 재사용성이 큰 글로벌 고신뢰 engineering source만 추가한다.
5. 한영 source list와 research config README를 갱신한다.
6. JSON/config/docs/grounding/evaluation 검증을 실행하고 히스토리와 timing record를 남긴다.

## 근거

- Kakao Tech, NAVER D2, Toss Tech, Woowa, Kurly, Daangn, Devsisters 등 한국 출처는 한국 사용자와 한국 기술 맥락에서 우선 검색 origin이 된다.
- Razorpay, Zerodha, Flipkart, PhonePe, CRED, Meesho, Zomato, Arpit Bhayani, Kailash Nadh 등 인도 출처는 인도 제품/핀테크/커머스/시스템 디자인 맥락에서 discovery signal을 넓힌다.
- OpenAlex, Semantic Scholar, DBLP, ACM, IEEE, USENIX, NeurIPS, PMLR, OpenReview, ACL Anthology, Crossref, ResearchRabbit, Litmaps, Hugging Face Papers는 논문 발견/검증 역할이 서로 다르므로 한 종류만 쓰지 않는다.
