# 리서치 노트: 원천 데이터 조사 소스 확장

## 요약

이번 확장은 검색을 단순 웹 검색 하나로 끝내지 않기 위한 seed set 보강이다. 글로벌 대기업/제품 기술 블로그, 한국 빅테크와 제품 기술 블로그, 인도 제품 회사와 기술 인물/creator source, 논문 탐색 원천을 분리해 등록했다.

## 핵심 결정

- 글로벌 공통 재사용성이 높은 engineering source는 `enterprise-source-registry.json`에도 추가했다.
- 한국/인도/개인/논문 source origin은 `source-discovery-registry.json`을 source-of-truth로 둔다.
- 개인 블로그, 유튜브, Reddit/LinkedIn/upvote/star signal은 adoption/discovery/context로만 사용한다.
- 논문은 최소한 graph index, publisher/venue index, preprint/publisher page, code/adoption signal 중 복수 채널을 조합한다.

## 대표 추가 출처

- 글로벌: Shopify, Slack, Databricks, Discord, Vercel, Datadog, Sentry, Canva, Figma, DoorDash
- 한국: LY Corporation, Daangn, Devsisters, RIDI 추가 및 기존 NAVER D2/Kakao/Toss/Woowa/Kurly/LINE/Coupang/KakaoBank와 연결
- 인도: Razorpay Engineering, Zerodha, Flipkart, PhonePe, CRED, Meesho, Zomato, Arpit Bhayani, Kailash Nadh, Gaurav Sen
- 논문: DBLP, ACM, IEEE, USENIX, NeurIPS, PMLR, ICLR OpenReview, ACL Anthology, Crossref, ResearchRabbit, Litmaps, Hugging Face Papers

## 사용 시 주의

- 출처 목록은 검색 시작점이지 사실 증명이 아니다.
- 특정 claim은 exact article/paper page를 다시 열고 접근일과 추출 메모를 남긴다.
- 지역 출처는 시장/사용자/운영 환경 적합성을 기록한 뒤 계획 근거로 사용한다.
- 논문 유명도는 citation, venue, code, benchmark, 재현성, 반박/후속 논문을 함께 본다.
